//usei o create-react-app mais ainda está criando o index com o ReactDom, porém o ReactDom não está mais renderizando na v18; usei createRoot para renderizar

/*import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
*/
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);


root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

