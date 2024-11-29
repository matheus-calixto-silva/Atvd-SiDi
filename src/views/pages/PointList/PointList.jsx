import { useContext, useState } from 'react';
import { AuthContext } from '../../../app/contexts/AuthContext';
import { deletePoint, editPoint } from '../../../app/services/user';
import styles from './PointList.module.css';

const PointList = () => {
  const { user, editRegistroPonto, deleteRegistroPonto } =
    useContext(AuthContext);
  const [editId, setEditId] = useState(null);
  const [editPonto, setEditPonto] = useState({
    id: '',
    data: '',
    horaEntrada: '',
    horaSaida: '',
  });

  if (!user) {
    return <p>Você precisa estar logado para visualizar os pontos.</p>;
  }

  const formatarData = (dataString) => {
    const date = new Date(dataString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const iniciarEdicao = (id) => {
    const ponto = user.registrosPontos.find((registro) => registro.id === id);
    setEditId(id);
    setEditPonto({
      id: ponto.id,
      data: ponto.data,
      horaEntrada: ponto.horaEntrada,
      horaSaida: ponto.horaSaida,
    });
  };

  const salvarEdicao = async () => {
    const result = await editPoint(user.id, editPonto.id ,editPonto);

    if(result.success && editId !== null) {
      editRegistroPonto(editId, editPonto); // Edita o registro no contexto
      setEditId(null); // Limpa o modo de edição
    }
  };

  const cancelarEdicao = () => {
    setEditId(null); // Cancela a edição e limpa os campos
    setEditPonto({ data: '', horaEntrada: '', horaSaida: '' });
  };

  const excluirPonto = async (id) => {
    const result = await deletePoint(user.id, id);
    if (result.success) {
      deleteRegistroPonto(id); // Exclui o registro no contexto
    }
  };

  return (
    <section className={styles.section}>
      <h2>Registros de Ponto</h2>
      {user.registrosPontos && user.registrosPontos.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Data</th>
              <th>Hora de Entrada</th>
              <th>Hora de Saída</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {user.registrosPontos.map((ponto) =>
              editId === ponto.id ? (
                <tr key={ponto.id}>
                  <td>
                    <input
                      type='date'
                      value={editPonto.data}
                      onChange={(e) =>
                        setEditPonto({ ...editPonto, data: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type='time'
                      value={editPonto.horaEntrada}
                      onChange={(e) =>
                        setEditPonto({
                          ...editPonto,
                          horaEntrada: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type='time'
                      value={editPonto.horaSaida}
                      onChange={(e) =>
                        setEditPonto({
                          ...editPonto,
                          horaSaida: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <button onClick={salvarEdicao}>Salvar</button>
                    <button onClick={cancelarEdicao}>Cancelar</button>
                  </td>
                </tr>
              ) : (
                <tr key={ponto.id} id={ponto.id}>
                  <td>{formatarData(ponto.data)}</td>
                  <td>{ponto.horaEntrada}</td>
                  <td>{ponto.horaSaida}</td>
                  <td>
                    <button onClick={() => iniciarEdicao(ponto.id)}>
                      Editar
                    </button>
                    <button onClick={() => excluirPonto(ponto.id)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      ) : (
        <p>Nenhum registro de ponto encontrado.</p>
      )}
    </section>
  );
};

export default PointList;
