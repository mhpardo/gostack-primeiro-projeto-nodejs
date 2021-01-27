import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {

  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    //retornar todas as transações (transactions array - BD)
    return this.transactions;
  }

  public getBalance(): Balance {

    //efetuando a soma cumulativa por meio da função reduce() do array
    const balance = this.transactions.reduce(
      (accumulator: Balance, transaction: Transaction) => {
      switch (transaction.type) {
        case "income":
          accumulator.income += transaction.value;
          break;
        case "outcome":
          accumulator.outcome += transaction.value;
          break;
        default:
          break;
      } 
      accumulator.total = accumulator.income -  accumulator.outcome;
      return accumulator;
    }, {
      //formato de retorno do objeto balance (acumulator conf)
      income: 0,
      outcome: 0,
      total: 0
    });
    
    //calculando o total de saldo na conta
    balance.total = balance.income - balance.outcome;

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {

    //criando um novo objeto - transaction (protótipo)
    const transaction = new Transaction({ title, value, type });

    //adicionando novo registro de transaction no BD (array)
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
