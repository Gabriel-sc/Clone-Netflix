const API_KEY = 'cf05836732c0a4c8e95390f58557f630';
const API_BASE = 'https://api.themoviedb.org/3';

//função getHomeList que vai pegar todas as listas que vou colocar no projeto, a função tambem vai colocar cada um no seu devido lugar e retornar na aplicação
//função basicFetch, (fetch significa buscar), essa função auxiliar vai buscar na url da api, vai pegar o resultado em formato json e retornar o json

/*Uma função declarada como ASYNC significa que o valor de retorno da função será, "por baixo dos panos", uma Promise. Se a Promise se resolver normalmente, o objeto-Promise retornará o valor. 
O comando AWAIT basicamente pausa a função myAsyncFunction() até que a Promise dentro da função func1() seja resolvida. Então o valor retornado é atribuído à variável e o código de myAsyncFunction() continua de onde parou.
PROMISE é uma classe que permite a construção de funções de processamento assíncrono representando um valor que poderá estar disponível no futuro. */
const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
}

export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'trending',
                title: 'Recomendados para Você',
                items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'toprated',
                title: 'Em Alta',
                items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: 'Documentários',
                items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
            },
        ];
    },

//função para pegar informação de um filme especifico
//switch instrução é uma das melhores maneiras de renderizar uma condicional
    getMovieInfo: async (movieId, type) => {
        let info = {};
        if(movieId) {
            switch(type) {
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`)
                break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`)
                break;
                default:
                    info = null;
                break;    
            }
        }
        return info;
    }
    
}
