import { useContext, useState } from 'react';
import { AuthContext } from '../../../app/contexts/AuthContext';
import useNavigation from '../../../app/libs/navigate';
import styles from './Login.module.css';

const Login = () => {
  const { handleLogin } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    const success = await handleLogin(username, password);

    if (!success) {
      setError('Usuário ou senha incorretos');
    }
  };

  return (
    <section className={styles.loginContainer}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor='username'>Usuário</label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor='password'>Senha</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type='submit' className={styles.submitButton}>
          Entrar
        </button>
      </form>
      <p className={styles.forgotPassword} onClick={() => navigate('/esqueci-senha')}>
        Esqueceu sua senha?
      </p>
    </section>
  );
};

export default Login;
