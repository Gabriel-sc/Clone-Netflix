import React, {useState} from 'react';
import './MovieRow.css';
import {HiChevronLeft} from "react-icons/hi";
import {HiChevronRight} from "react-icons/hi";

//Para fazer uma lista ficar indo para o lado e para o outro, precisa de duas divs, uma sendo a area total e a outra será responsavel por conter todo os items, e essa segunda div que irá se mover para os lados através da margem.
//a propriedade window.innerWidth retorna a largura interna da área de conteúdo de um janela
export default ({title, items}) => {
    const [scrollX, setScrollX] = useState(0);

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth /2);
        if(x>0) {
            x=0;
        }
        setScrollX(x);
    }

    const handleRightArrow = () =>{
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listW = items.results.length * 150;
        if((window.innerWidth - listW) > x ) {
            x = (window.innerWidth - listW) - 60;
        }
        setScrollX(x);
    }

    return (
        <div className="movieRow">
            <h2>{title}</h2>
            <div className='movieRow--left' onClick={handleLeftArrow}>
                <HiChevronLeft style={{fontSize:50}} />
            </div>
            
            <div className='movieRow--right' onClick={handleRightArrow}>
                <HiChevronRight style={{fontSize:50}} />
            </div>

            <div className='movieRow--listarea'>
                <div className='movieRow--list' style={{
                    marginLeft: scrollX,
                    width: items.results.length * 150
                }}>
                    {items.results.length > 0 && items.results.map((item, key) => (
                    
                        <div key={key} className='movieRow--item'>
                        <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}