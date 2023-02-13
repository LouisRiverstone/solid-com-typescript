/**
 * LSP (Liskov Substitution Principle)
 * 
 * Seja q(x) uma propriedade demonstrável sobre objetos de x do tipo T. 
 * Então q(y) deve ser demonstrável para objetos y do tipo S onde S é um 
 * subtipo de T. 
 * 
 * Em palavras mais simples, isso significa que cada subclasse deve ser subtituída 
 * pela sua superclasse (ou interface) sem que a classe cliente tenha que mudar sua
 * implementação para que o código opere adequadamente. 
 */

interface Jogo {
    resultado(): number[]
}

class Dado implements Jogo {
    public resultado() {
        return [Math.floor(Math.random() * 6)];
    }
}

class MegaSena implements Jogo {
    private cartela = [] as number[];

    public constructor() {
        this.cartela = Array.from(Array(60).keys());
    }

    public resultado(): number[] {
        this.shuffle();

        return this.cartela.slice(0, 6)
    }

    private shuffle(): void {
        const array = this.cartela;

        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        this.cartela = array;
    }
}

/** 
 * Código cliente 
 * */
const jogos = [new Dado(), new MegaSena()];

const indiceAleatorio = Math.floor(Math.random() * jogos.length);

const jogo = jogos[indiceAleatorio] // não importa o que vem, sempre vai dar bom!

function apresentaResultado(jogo: Jogo) {
    const nomeJogo = jogo.constructor.name

    console.log(`Jogo ${nomeJogo} : resultado ${jogo.resultado()}`);
}

apresentaResultado(jogo);
