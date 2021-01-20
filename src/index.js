import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {StoreProvider} from "./common/Store"
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <App />      
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

