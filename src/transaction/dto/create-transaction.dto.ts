import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsString,
  IsDateString,
} from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'Transaction type',
    example: 'income',
    enum: ['income', 'expense'],
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(['income', 'expense'])
  type: 'income' | 'expense';

  @ApiProperty({
    description: 'Transaction amount',
    example: 100,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Transaction category',
    example: 'food',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({
    description: 'Transaction date',
    example: '2024-11-26T14:30:00Z',
    required: true,
  })
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty({
    description: 'Description',
    example: 'Lunch',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
