import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Transaction } from './entities/transaction.entity';

@Controller('transaction')
@UseGuards(JwtAuthGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiOkResponse({ description: 'Transaction successfully created' })
  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto, @Request() req) {
    return this.transactionService.create(createTransactionDto, req.user.id);
  }

  @ApiOperation({ summary: 'Retrieve all transactions' })
  @ApiOkResponse({
    description: 'List of transactions',
    isArray: true,
    type: Transaction,
  })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiQuery({ name: 'total', required: false, type: 'number' })
  @Get()
  findAll(@Query() page: number, @Query() total: number) {
    return this.transactionService.findAll(page, total);
  }

  @ApiOperation({ summary: 'Retrieve a transaction by ID' })
  @ApiOkResponse({ description: 'Transaction details' })
  @ApiNotFoundResponse({ description: 'Transaction not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a transaction by ID' })
  @ApiOkResponse({ description: 'Transaction successfully updated' })
  @ApiNotFoundResponse({ description: 'Transaction not found' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(+id, updateTransactionDto);
  }

  @ApiOperation({ summary: 'Remove a transaction by ID' })
  @ApiOkResponse({ description: 'Transaction successfully removed' })
  @ApiNotFoundResponse({ description: 'Transaction not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
}
