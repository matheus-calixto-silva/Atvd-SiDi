import { useContext } from 'react';
import { AuthContext } from '../../../app/contexts/AuthContext';
import useNavigation from '../../../app/libs/navigate';
import { routes } from '../../../app/Router/routes';
import logo from '../../assets/nav-logo.png';
import styles from './LoggedNavBar.module.css';

const LoggedNavBar = () => {
  const { handleLogout } = useContext(AuthContext);
  const navigate = useNavigation();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer} onClick={() => navigate('/inicio')}>
        <img src={logo} alt='sidi logo' className={styles.logo}  style={{cursor: 'pointer'}}/>
      </div>
      <div>
        {' '}
        <button
          onClick={() => navigate(routes.listPoints)}
          className={styles.button}
        >
          Pontos
        </button>
        <button onClick={handleLogout} className={styles.button}>
          Sair
        </button>
      </div>
    </nav>
  );
};

export default LoggedNavBar;
