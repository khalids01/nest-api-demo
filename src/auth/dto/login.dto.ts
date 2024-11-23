import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export class LoginDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'user@example.com', required: true })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: '12345678', required: true })
  @MinLength(8)
  password: string;
}

export class LoginUserOkResponseDto {
  @ApiProperty({
    example:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  @IsNotEmpty()
  accessToken: string;

  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    example: 'johndoe',
  })
  @IsNotEmpty()
  username: string;
}

export class LoginUserErrorDto {
  @ApiProperty({
    example: 'User not found',
  })
  @IsNotEmpty()
  message: string;
}
