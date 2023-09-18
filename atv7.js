class ContaBancaria {
  constructor(agencia, numero, tipo, saldo) {
    this.agencia = agencia;
    this.numero = numero;
    this.tipo = tipo;
    this._saldo = saldo;
  }

  get saldo() {
    return this._saldo;
  }

  set saldo(novoSaldo) {
    this._saldo = novoSaldo;
  }

  sacar(valor) {
    if (valor <= this._saldo) {
      this._saldo -= valor;
      console.log(`Saque de R$ ${valor} realizado com sucesso.`);
    } else {
      console.log('Saldo insuficiente.');
    }
  }

  depositar(valor) {
    if (valor > 0) {
      this._saldo += valor;
      console.log(`Depósito de R$ ${valor} realizado com sucesso.`);
    } else {
      console.log('Valor de depósito inválido.');
    }
  }
}

class ContaCorrente extends ContaBancaria {
  constructor(agencia, numero, saldo = 0, cartaoCredito) {
    super(agencia, numero, 'conta corrente', saldo);
    this.cartaoCredito = cartaoCredito;
  }

  get cartaoCredito() {
    return this._cartaoCredito;
  }

  set cartaoCredito(novoCartaoCredito) {
    this._cartaoCredito = novoCartaoCredito;
  }
}

class ContaPoupanca extends ContaBancaria {
  constructor(agencia, numero, saldo = 0) {
    super(agencia, numero, 'conta poupança', saldo);
  }
}

class ContaUniversitaria extends ContaBancaria {
  constructor(agencia, numero, saldo = 0) {
    super(agencia, numero, 'conta universitária', saldo);
  }

  sacar(valor) {
    if (valor <= 500 && valor <= this._saldo) {
      this._saldo -= valor;
      console.log(`Saque de R$ ${valor} realizado com sucesso.`);
    } else {
      console.log('Saque não permitido. O valor deve ser menor ou igual a R$ 500 e o saldo suficiente.');
    }
  }
}

function criarConta() {
  const tipoConta = prompt('Digite o tipo de conta (Corrente/Poupanca/Universitaria):').toLowerCase();
  const agencia = prompt('Digite o número da agência:');
  const numero = prompt('Digite o número da conta:');
  const saldoInicial = parseFloat(prompt('Digite o saldo inicial:'));
  let conta;

  switch (tipoConta) {
    case 'corrente':
      const cartaoCredito = parseFloat(prompt('Digite o limite do cartão de crédito:'));
      conta = new ContaCorrente(agencia, numero, saldoInicial, cartaoCredito);
      break;
    case 'poupanca':
      conta = new ContaPoupanca(agencia, numero, saldoInicial);
      break;
    case 'universitaria':
      conta = new ContaUniversitaria(agencia, numero, saldoInicial);
      break;
    default:
      console.log('Tipo de conta inválido.');
      return;
  }

  console.log('Conta criada com sucesso!');
  operarConta(conta);
}

function operarConta(conta) {
  while (true) {
    const operacao = prompt('Escolha a operação (Saque/Deposito/Exibir Saldo/Sair):').toLowerCase();

    switch (operacao) {
      case 'saque':
        const valorSaque = parseFloat(prompt('Digite o valor do saque:'));
        conta.sacar(valorSaque);
        break;
      case 'deposito':
        const valorDeposito = parseFloat(prompt('Digite o valor do depósito:'));
        conta.depositar(valorDeposito);
        break;
      case 'exibir saldo':
        console.log(`Saldo atual: R$ ${conta.saldo}`);
        break;
      case 'sair':
        return;
      default:
        console.log('Operação inválida.');
    }
  }
}

criarConta();
