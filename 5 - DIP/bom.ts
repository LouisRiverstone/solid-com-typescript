/**
 * DIP (Dependency Inversion Principle)
 * 
 * As entidades devem depender de abstrações, não de implementações. 
 * Ele declara que o módulo de alto nível não deve depender do módulo 
 * de baixo nível, mas devem depender de abstrações.
 */


interface Pagavel {
    valor(): number;
    origem(): string;
    identificador(): string;
}

class Pedido implements Pagavel {
    public id: string;
    public items: string[] = [];
    public valorTotal: number = 0.0;

    public constructor() {
        this.id = Date.now().toString();
    }

    public identificador(): string {
        return this.id;
    }

    public valor(): number {
        return this.valorTotal;
    }

    public origem(): string {
        return 'Pedido';
    }
}

class Voucher {
    public id: string;
    public utilizador: string | undefined;
    public valorUnico: number = 0.0;

    public constructor() {
        this.id = Date.now().toString();
    }

    public identificador(): string {
        return this.id;
    }

    public valor(): number {
        return this.valorUnico;
    }

    public origem(): string {
        return 'Voucher';
    }

}

class POS {
    public registrosDePagamento: string[] = [];

    public realizarPagamento(p: Pagavel): string {
        this.registrosDePagamento.push(`> Pagamento realizado no valor de ${p.valor()}. ${p.origem()} - ${p.identificador()}`);

        return Date.now().toString();
    }

    public historico(): string {
        return this.registrosDePagamento.reduce((output: string, registro: string) => {
            return output + '\n' + registro;
        }, '');
    }
}

/**
 * Código cliente
 */
const pedido = new Pedido();
pedido.items = ['item 1', 'item 2'];
pedido.valorTotal = 120.00;

const voucher = new Voucher();
voucher.utilizador = 'Alice';
voucher.valorUnico = 340.00;

const pos = new POS();
pos.realizarPagamento(voucher);
pos.realizarPagamento(pedido);

console.log(pos.historico());