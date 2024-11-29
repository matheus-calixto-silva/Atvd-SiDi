import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ProtectedRoute from '../../views/components/ProtectedRoute/ProtectedRoute.jsx';
import Home from '../../views/pages/Home/Home';
import Login from '../../views/pages/Login/Login';
import NotFound from '../../views/pages/NotFound/NotFound';
import Register from '../../views/pages/Register/Register';
import { AuthProvider } from '../contexts/AuthProvider';

import { useLocation } from 'react-router-dom';
import GuestNavBar from '../../views/components/GuestNavBar/GuestNavbar.jsx';
import LoggedNavBar from '../../views/components/LoggedNavBar/LoggedNavBar.jsx';
import ForgotPassword from '../../views/pages/ForgotPassword/ForgotPassword.jsx';
import Start from '../../views/pages/Start/Start.jsx';
import LoggedUser from './loggedUser';
import { routes } from './routes';

const Navbar = () => {
  const location = useLocation();

  const isLoggedInRoute = location.pathname.startsWith(routes.start); // Verifica se a rota é "/inicio"

  return isLoggedInRoute ? <LoggedNavBar /> : <GuestNavBar />;
};


const Router = () => {

  return (
    <BrowserRouter>
      <AuthProvider>
        {<Navbar />}
        <Routes>
          <Route
            path={`${routes.start}/*`}
            element={
              <ProtectedRoute>
                <LoggedUser />
              </ProtectedRoute>
            }
          />
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.start} element={<Start />}/>
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.register} element={<Register />} />
          <Route path={routes.forgotPassword} element={<ForgotPassword />} />
          <Route path={routes.notFound} element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Router;
