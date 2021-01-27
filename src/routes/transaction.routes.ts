import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {

    //1. Obter a lista de todas as transações
    const transactions = transactionsRepository.all();
    
    //2. Obter o saldo da conta
    const balance = transactionsRepository.getBalance();
    
    //3. Montar o objeto de retorno no formato solicitado
    const lstTransactions = {
      transactions,
      balance
    }

    return response.json(lstTransactions);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    //lendo os valores title, value e type do corpo da requisição
    const { title, value, type } = request.body;

    //instanciando o serviço de aplicação necessário
    const createTransactionService = 
      new CreateTransactionService(transactionsRepository);

    //Executando a chamada ao serviço
    const transaction = createTransactionService.execute({ title, value, type });

    return response.json(transaction);
    
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
