import useNavigation from '../../../app/libs/navigate';
import logo from '../../assets/nav-logo.png';

import styles from './GuestNavbar.module.css';

const GuestNavbar = () => {
  const navigate = useNavigation();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer} onClick={() => navigate('/')}>
        <img src={logo} alt='sidi logo' className={styles.logo} />
      </div>
      <div className={styles.buttonsContainer}>
        <button
          type='button'
          className={styles.button}
          onClick={() => navigate('/login')}
        >
          Entrar
        </button>
        <button
          type='button'
          className={styles.button}
          onClick={() => navigate('/cadastro')}
        >
          Cadastre-se
        </button>
      </div>
    </nav>
  );
};

export default GuestNavbar;
