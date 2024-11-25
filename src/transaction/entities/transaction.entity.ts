import { ApiProperty } from '@nestjs/swagger';

export class Transaction {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Salary' })
  amount: number;

  @ApiProperty({ example: 'income' })
  category: string;

  @ApiProperty({ example: "'income' | 'expense'" })
  type: string;

  @ApiProperty({ example: 'This is Salary' })
  description: string;

  @ApiProperty({ example: '2023-08-23T00:00:00.000Z' })
  date: Date;

  @ApiProperty({ example: '1' })
  userId: number;

  @ApiProperty({ example: '2023-08-23T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2023-08-23T00:00:00.000Z' })
  updatedAt: Date;
}
