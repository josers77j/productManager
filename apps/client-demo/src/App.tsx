import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthPage from './modules/auth/auth-page';
import Layout from './components/layout';


const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="*" element={<h1>Página no encontrada</h1>} />
      </Routes>
    </Layout>
  );
};

export default App;
