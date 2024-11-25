import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthorizedUserDto } from './dto/authorized-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  private async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const result = { ...user };
      delete result.password;
      return result;
    }
    return null;
  }

  async signup(signupDto: SignupDto): Promise<AuthorizedUserDto> {
    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: signupDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(signupDto.password, 10);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        ...signupDto,
        password: hashedPassword,
      },
    });

    const result = { ...user };
    delete result.password;
    return result;
  }

  async login(loginDto: LoginDto): Promise<AuthorizedUserDto> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // Generate JWT token
    const payload = { id: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return {
      ...user,
      accessToken,
    };
  }

  async logout(userId: number): Promise<void> {
    // Delete all sessions for the user
    await this.prisma.session.deleteMany({
      where: { userId },
    });
  }

  async me(userId: number): Promise<AuthorizedUserDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const result = { ...user };
    delete result.password;
    return result;
  }
}
