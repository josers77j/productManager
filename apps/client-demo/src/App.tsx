import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import routes from './routes/routes';

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={<route.component />} />
        ))}
      </Routes>
    </Layout>
  );
};

export default App;
