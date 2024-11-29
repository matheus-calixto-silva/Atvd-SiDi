import { useState } from 'react';
import useNavigation from '../../../app/libs/navigate';
import { registerUser } from '../../../app/services/user';
import styles from './Register.module.css';

const Register = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const navigate = useNavigation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    const newUser = {
      nome,
      cpf,
      telefone,
      email,
      senha,
      registrosPontos: [],
      id: new Date().toISOString(),
    };

    console.log(newUser);

    const response = await registerUser(newUser);

    if (response) {
      alert('Usuário registrado com sucesso!');
      navigate('/login')
    } else {
      alert('Erro ao cadastrar o usuário.');
    }
  };

  return (
    <section className={styles.formContainer}>
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor='nome'>Nome:</label>
          <input
            type='text'
            id='nome'
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor='cpf'>CPF:</label>
          <input
            type='text'
            id='cpf'
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor='telefone'>Telefone:</label>
          <input
            type='text'
            id='telefone'
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor='senha'>Senha:</label>
          <input
            type='password'
            id='senha'
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor='confirmarSenha'>Confirmar Senha:</label>
          <input
            type='password'
            id='confirmarSenha'
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div>
          <button type='submit' className={styles.submitButton}>
            Cadastrar
          </button>
        </div>
      </form>
    </section>
  );
};

export default Register;
