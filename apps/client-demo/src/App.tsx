import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout'; // Asegúrate de que el path sea correcto
import routes from './routes/routes';
import ProtectedRoute from './routes/private.routes';
import AccessDeniedPage from './modules/exceptions/access-denied.exception';

function App() {
  return (
    <Layout> {/* Aquí se vuelve a añadir el Layout */}
      <Routes>
        {routes.map(({ path, component: Component, protected: isProtected, action = '', route = '' }) => {
          if (isProtected) {
            return (
              <Route
                key={path}
                element={<ProtectedRoute requiredPermission={{ action, route }} />}
              >
                <Route path={path} element={<Component />} />
              </Route>
            );
          }
          return <Route key={path} path={path} element={<Component />} />;
        })}
        <Route path="/access-denied" element={<AccessDeniedPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
