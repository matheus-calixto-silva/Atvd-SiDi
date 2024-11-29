import { useContext, useState } from 'react';
import { AuthContext } from '../../../app/contexts/AuthContext';
import { registerPoint } from '../../../app/services/user';
import styles from './Start.module.css';

const Start = () => {
  const [date, setDate] = useState('');
  const [entryTime, setEntryTime] = useState('');
  const [exitTime, setExitTime] = useState('');
  const [message, setMessage] = useState('');
  const { user, addRegistroPonto } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setMessage('Usuário não está logado.');
      return;
    }

    const newRegistro = {
      id: Date.now().toString(), // Gera um ID único
      data: date,
      horaEntrada: entryTime,
      horaSaida: exitTime,
    };

    const result = await registerPoint(user.id, newRegistro);

    if (result.success) {
      addRegistroPonto(newRegistro); // Atualiza o contexto com o novo registro
      setMessage('Ponto registrado com sucesso!');
      setDate('');
      setEntryTime('');
      setExitTime('');
    } else {
      setMessage(`Erro ao registrar ponto: ${result.error}`);
    }
  };

  return (
    <section className={styles.section}>
      <h2>Cadastro de Ponto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Data do Ponto:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="entryTime">Hora de Entrada:</label>
          <input
            type="time"
            id="entryTime"
            value={entryTime}
            onChange={(e) => setEntryTime(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="exitTime">Hora de Saída:</label>
          <input
            type="time"
            id="exitTime"
            value={exitTime}
            onChange={(e) => setExitTime(e.target.value)}
            required
          />
        </div>

        <div>
          <button type="submit">Registrar Ponto</button>
        </div>

        {message && <p>{message}</p>}
      </form>
    </section>
  );
};

export default Start;
