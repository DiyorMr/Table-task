import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import { AuthProvider } from './providers/auth';
import RequireAuth from './providers/requireAuth';
import { routes } from './routes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {routes.map(({ path, element }) =>
            <Route
              key={path}
              path={path}
              element={
                <RequireAuth>
                  {element}
                </RequireAuth>
              }
            />
          )}
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
