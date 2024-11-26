import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async findAll(page: number = 1, limit: number = 10) {
    const paginate: { skip: number; take: number } | {} =
      Number(page) && Number(limit)
        ? {
            skip: (Number(page) - 1) * Number(limit),
            take: Number(limit),
          }
        : {};

    const transactions = await this.prisma.transaction.findMany({
      ...paginate,
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
    if (!transaction) {
      throw new HttpException(
        `Bad Request. No transaction found with id: ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return transaction;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const findTransaction = await this.findOne(id);
    if (!findTransaction) {
      throw new HttpException(
        `Bad Request. No transaction found with id: ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const transaction = await this.prisma.transaction.update({
      where: { id },
      data: updateTransactionDto,
    });

    if (!transaction) {
      throw new HttpException(
        `Error!. Transaction could not be updated with id: ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return 'Transaction updated successfully';
  }

  async remove(id: number) {
    const findTransaction = await this.findOne(id);
    if (!findTransaction) {
      throw new HttpException(
        `Bad Request. No transaction found with id: ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.prisma.transaction.delete({ where: { id } });
    return 'Transaction deleted successfully';
  }
}
