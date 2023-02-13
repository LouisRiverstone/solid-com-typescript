/**
 * SRP (Single Responsability Principle)
 * 
 * Uma classe deve ter um e apenas um motivo para mudar, 
 * o que significa que uma classe deve ter apenas uma função.
 */

interface FormaGeometrica { }

class Quadrado implements FormaGeometrica {
    public comprimentoLado: number;

    constructor(comprimentoLado: number) {
        this.comprimentoLado = comprimentoLado;
    }
}

class Circulo implements FormaGeometrica {
    public raio: number;

    constructor(raio: number) {
        this.raio = raio;
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

            if (forma instanceof Quadrado) {
                area = Math.pow(forma.comprimentoLado, 2);
            } else if (forma instanceof Circulo) {
                area = Math.PI * Math.pow(forma.raio, 2);
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
    new Quadrado(5)
];

const impressora = new Impressora(new CalculadoraDeArea(formas));
impressora.imprimir();