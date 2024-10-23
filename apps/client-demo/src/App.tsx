import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import routes from './routes/routes';

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        {routes.map((route, index) => (
          <Route 
            key={index} 
            path={route.path} 
            element={React.createElement(route.component)} // Aquí usamos React.createElement para crear el componente
          />
        ))}
      </Routes>
    </Layout>
  );
};

export default App;
