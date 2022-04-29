import React, {useEffect, useState} from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

//função loadAll pegando a lista total

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [FeaturedData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //pegando o destaque(featured)
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random()*(originals[0].items.results.length -1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }
    loadAll();
  }, []);

//effect para monitorar a faixa preta do header
useEffect (() => {
  const scrollListener = () => {
    if(window.scrollY > 10){
      setBlackHeader(true);
    }else {
      setBlackHeader(false);
    }
  }
  window.addEventListener('scroll', scrollListener);
  return () => {
    window.removeEventListener('scroll', scrollListener);
  }
}, []);
  return (
    <div className="page">

      <Header black={blackHeader} />

      {FeaturedData &&
        <FeaturedMovie item={FeaturedData} />}

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />          
        ))}
      </section> 

      <footer>
        Feito pelo<a href="https://github.com/Gabriel-sc?tab=repositories" rel="noopener noreferrer" target="_blank"  > Gabriel-sc</a><br/>
        Direitos de imagem para <a href="https://www.netflix.com/br/" rel="noopener noreferrer"  target="_blank"> Netflix</a><br/>
        Dados pegos do site <a href="https://www.themoviedb.org/" rel="noopener noreferrer"  target="_blank"> Themoviedb.org</a>
      </footer>

      {movieList.length <= 0 &&
      <div className='loading'>
        <img src="https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_2560%2Cc_limit/Netflix_LoadTime.gif" alt="Carregando" />
      </div>
      }
    </div>
  );
}
//target="_blank", permite colocar um link pra outra página sem fechar a sua página
//a última div é o loading, enquanto estiver carregando o conteúdo aparecerá o gif de loading do netflix