/**
 * DIP (Dependency Inversion Principle)
 * 
 * As entidades devem depender de abstrações, não de implementações. 
 * Ele declara que o módulo de alto nível não deve depender do módulo 
 * de baixo nível, mas devem depender de abstrações.
 */

class Pedido {
    public id: string | undefined;
    public items: string[] | undefined;
    public valorTotal: number | undefined;
}

class Voucher {
    public id: string | undefined;
    public utilizador: string | undefined;
    public valor: number | undefined;
}

class POS {
    public registrosDePagamento: string[] = [];

    public pagarPedido(p: Pedido): string {
        this.registrosDePagamento.push(`> Pedido de ID ${p.id} pago com sucesso. Valor Total: ${p.valorTotal}`);

        return Date.now().toString();
    }

    public pagarVouche(v: Voucher): string {
        this.registrosDePagamento.push(`> Voucher de ID ${v.id} utilizado por ${v.utilizador}. Valor: ${v.valor}`);

        return Date.now().toString()
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
pedido.id = Date.now().toString();
pedido.items = ['item 1', 'item 2'];
pedido.valorTotal = 120.00;

const voucher = new Voucher();
voucher.id = Date.now().toString();
voucher.utilizador = 'Alice';
voucher.valor = 340.00;

const pos = new POS();
pos.pagarVouche(voucher);
pos.pagarPedido(pedido);

console.log(pos.historico());

/** Questões para refletir:
 * 
 * 1. Como faríamos para adequar o código acima ao princípio DIP?
 */