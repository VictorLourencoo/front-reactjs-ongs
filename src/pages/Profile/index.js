//useEffect = disparar uma fuction e algum momento do componente.
//ira servir para mostar os incents de acordo com aong logada
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import newIncident from '../NewIncidents/index';

import api from '../../service/api';

export default function Profile() {
  const history = useHistory();

  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');

  const [incidents, setIncitends] = useState([]);

  //poussi 2 paramentros =1° uma função que sera executada,
  // 2° quando sera executada
  useEffect(() => {
    //pegar todos os incidents na rota profile.
    //atraves do id que vai no cabeçalho e esta armazenado no local storage
    api
      .get('/profile', {
        headers: {
          Authorization: ongId
        }
        //.then para pegar os dados da resposta, e armazena dentro de um state.
      })
      .then(response => {
        setIncitends(response.data);
      });
    //fun~ção disparada sempre que ongID mudar.
  }, [ongId]);

  //deletar caso.
  async function handleDeleteIncident(id) {
    try {
      await api.delete(`/incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      });
      //filtrar os incidents para remover oq foi deletado,
      //assim nao precisara atualizar a pagina para deletar o caso
      setIncitends(incidents.filter(incident => incident.id !== id));
    } catch (error) {
      alert('erro a deletar caso, tente novamente');
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be-the-hero" />
        <span>Bem vinda,{ongName}</span>

        <Link className="button" to="/incidents/new">
          Cadastrar Novo Caso
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>
      <ul>
        {incidents.map(incident => (
          //facilita o react a identificar o item
          <li key={incident.id}>
            <strong>Casos:</strong>
            <p>{incident.title}</p>

            <strong>Descrição:</strong>
            <p>{incident.description}</p>

            <strong>Valor:</strong>

            <p>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(incident.value)}
            </p>

            <button
              onClick={() => handleDeleteIncident(incident.id)}
              type="button"
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
