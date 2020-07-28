// import AppError from '../errors/AppError';

import { getCustomRepository, getRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';

import Transaction from '../models/Transaction';
import Category from '../models/Category';

interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}
class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    // funcionalidade de adicionar ao banco de dados essa informação
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoryRepository = getRepository(Category);

    // verificar se a categoria ja existe
    let transactionCategory = await categoryRepository.findOne({
      // ta com let pq se ela nao existir eu vou sobrescrever
      where: {
        title: category,
      },
    });
    // existe? buscar ela do banco de dados e usar o id que foi retornado
    if (!transactionCategory) {
      // nao existe? eu crio
      transactionCategory = categoryRepository.create({
        title: category,
      });

      await categoryRepository.save(transactionCategory);
    }

    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category: transactionCategory,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
