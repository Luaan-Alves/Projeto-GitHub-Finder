import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

import Home from './routes/Home.tsx';
import Repositories from './components/Repositories.tsx';
import Error from './components/Error.tsx'; // Componente de erro
import { Routes, Route } from 'react-router-dom';

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <BrowserRouter basename="/Projeto-GitHub-Finder"> {/* Adicione o basename aqui */}
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="repos/:login" element={<Repositories />} />
          <Route path="*" element={<Error />} /> {/* Rota para erros */}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
