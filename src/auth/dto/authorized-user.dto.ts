import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthorizedUserResultDto {
  @IsNotEmpty()
  accessToken: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  username: string;
}

export class AuthorizedUserDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'John Doe' })
  fullName?: string;

  @ApiProperty({ example: 'johndoe' })
  username?: string;

  @ApiProperty({ example: 'user' })
  role: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
