/**
 * ISP (Interface Segregation Principle)
 * 
 * Um cliente nunca deve ser forçado a implementar uma interface 
 * que ele não usa, ou os clientes não devem ser forçados a depender 
 * de métodos que não usam
 */
interface Compartilhavel {
    gerarLinkFacebook(): string;
    gerarRSS(): string;
}

class Post implements Compartilhavel {
    public titulo: string | undefined;
    public urlImagem: string | undefined;
    public resumo: string | undefined;
    public conteudo: string | undefined;
    public url: string | undefined;


    public gerarLinkFacebook(): string {
        const imagemUri = encodeURI(this.urlImagem ?? '')
        const linkUri = encodeURI(this.url ?? '')

        return `https://fb.com.br/share?title=${this.titulo}&img=${imagemUri}&url=${linkUri}`
    }

    public gerarRSS(): string {
        return `
            <?xml version="1.0" encoding="iso-8859-1"?> 
            <rss version="0.91"> 
                <channel> 
                    <title>Meu blog</title> 
                    <description>Bloco do Bartô</description> 
                    <link>https://barto.com.br/blog</link> 
                    <language>pt-br</language> 
                    <item> 
                        <title>${this.titulo}</title> 
                        <description>${this.resumo}</description> 
                        <link>${this.url}</link> 
                    </item> 
                </channel> 
            </rss>
       `;
    }
}


class Pagina implements Compartilhavel {
    public titulo: string | undefined;
    public urlImagemCapa: string | undefined;
    public conteudo: string | undefined;
    public link: string | undefined;


    public gerarLinkFacebook(): string {
        const imagemCapaUri = encodeURI(this.urlImagemCapa ?? '')
        const linkUri = encodeURI(this.link ?? '')

        return `https://fb.com.br/share?title=${this.titulo}&img=${imagemCapaUri}&url=${encodeURI(linkUri)}`
    }

    public gerarRSS(): string {
        throw new Error('Não existe conversor RSS implementado.');
    }
}


/**
 * Código cliente
 */
const post = new Post();
post.titulo = 'Titulo do Post';
post.resumo = 'Esse poste é isso e aquilo';
post.url = 'https://parto.com/blog/titulo-do-post';
post.urlImagem = 'https://parto.com/upload/posts/imagem-titulo.jpg';

console.log('POST')
console.log(post.gerarRSS())
console.log(post.gerarLinkFacebook())

const pagina = new Pagina();
pagina.titulo = 'Contato';
pagina.link = 'https://barto.com/contato';
pagina.urlImagemCapa = 'https://barto.com.br/uploads/capa.jpg';

console.log('PÁGINA')
console.log(pagina.gerarRSS())// Se tudo der certo, vai dar ruim!!
console.log(pagina.gerarLinkFacebook())

/** Questões para refletir:
 * 
 * 1. O que você acha de ser obrigado a implementar um método mesmo que não vá utilizá-lo?
 * 2. Como faríamos para adequar o código acima ao princípio ISP?
 */
