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

    public imprimirArea(): void {
        console.log('Somas das áreas é igual a ', (this.areaTotal()).toFixed(2));
    }
}


const formas = [
    new Circulo(3.0),
    new Quadrado(5)
];

const calculadora = new CalculadoraDeArea(formas);
calculadora.imprimirArea();

/** Questões para refletir:
 * 
 * 1. Qual é a responsabilidade única da classe CalculadoraDeArea?
 * 2. Como pederíamos resolver essa questão?
 */