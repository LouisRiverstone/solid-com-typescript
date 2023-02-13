/**
 * OCP (Open-Close Principle)
 * 
 * Os objetos ou entidades devem estar abertos para extensão, mas fechados para modificação
 */
interface FormaGeometricaInterface {
    area(): number
}

abstract class FormaGeometrica implements FormaGeometricaInterface {
    public area(): number {
        return 0
    }
}

class Quadrado extends FormaGeometrica {
    public comprimentoLado: number;

    constructor(comprimentoLado: number) {
        super();
        this.comprimentoLado = comprimentoLado;
    }

    public area(): number {
        return Math.pow(this.comprimentoLado, 2)
    }
}

class Retangulo extends FormaGeometrica {
    public comprimentoLargura: number;
    public comprimentoAltura: number;

    constructor(comprimentoLargura: number, comprimentoAltura: number) {
        super();
        this.comprimentoLargura = comprimentoLargura;
        this.comprimentoAltura = comprimentoAltura;
    }

    public area(): number {
        return this.comprimentoAltura * this.comprimentoLargura
    }
}

class Circulo extends FormaGeometrica {
    public raio: number;

    constructor(raio: number) {
        super();
        this.raio = raio;
    }

    public area(): number {
        return Math.PI * Math.pow(this.raio, 2);
    }
}

class CalculadoraDeArea {
    private formasGeometricas: FormaGeometrica[];

    public constructor(formasGeometricas: FormaGeometrica[]) {
        this.formasGeometricas = formasGeometricas;
    }

    public areaTotal(): number {
        const somaTotal = this.formasGeometricas.reduce((valorTotal: number, forma: FormaGeometrica) => {
            let area: number = 0.0;

            if (forma instanceof FormaGeometrica) {
                area = forma.area();
            }

            return area + valorTotal;
        }, 0.0);

        return somaTotal;
    }
}

class Impressora {
    private calculadora: CalculadoraDeArea;

    public constructor(calculadora: CalculadoraDeArea) {
        this.calculadora = calculadora;
    }

    public imprimir(): void {
        console.log('Somas das áreas é igual a ', (this.calculadora.areaTotal()).toFixed(2));
    }
}

/** 
* Código cliente 
* */
const formas = [
    new Circulo(3.0),
    new Quadrado(5),
    new Retangulo(2, 5)
];

const impressora = new Impressora(new CalculadoraDeArea(formas));
impressora.imprimir();