import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async create(createTransactionDto: CreateTransactionDto, userId: number) {
    await this.prisma.transaction.create({
      data: {
        amount: createTransactionDto.amount,
        type: createTransactionDto.type,
        description: createTransactionDto.description,
        date: createTransactionDto.date,
        category: createTransactionDto.category,
        userId: userId,
      },
    });
    return 'Transaction created successfully';
  }

  async findAll(page: number = 1, total: number = 10) {
    const transactions = await this.prisma.transaction.findMany({
      skip: (page - 1) * total,
      take: total,
      orderBy: {
        date: 'desc',
      },
    });

    return transactions;
  }

  async findOne(id: number) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
    });
    return transaction;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    await this.prisma.transaction.update({
      where: { id },
      data: updateTransactionDto,
    });
    return 'Transaction updated successfully';
  }

  async remove(id: number) {
    await this.prisma.transaction.delete({ where: { id } });
    return 'Transaction deleted successfully';
  }
}
