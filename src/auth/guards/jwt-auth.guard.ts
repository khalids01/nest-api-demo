import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  CanActivate,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    // Add user to request
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    const token = authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }

    try {
      const payload = this.jwtService.verify(token);
      request.user = payload;
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
