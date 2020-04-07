import React, { useState } from 'react';

import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

import api from '../../service/api';

export default function NewIncidents() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState(0);

  const ongId = localStorage.getItem('ongId');

  const history = useHistory();
  async function handleCreateIncident(event) {
    event.preventDefault();

    const data = {
      title,
      description,
      value
    };
    try {
      await api.post('/incidents', data, {
        headers: {
          Authorization: ongId
        }
      });
      history.push('/profile');
      alert('Caso cadastrado com sucesso');
    } catch (error) {
      alert('erro ao cadastrar caso, tente novamente');
    }
  }

  return (
    <div className="new-incidents-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be-the-hero" />
          <h1>Cadastrar novo caso</h1>
          <p>
            Descreve o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleCreateIncident}>
          <input
            placeholder="Titulo do caso"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />

          <textarea
            placeholder="Descrição"
            value={description}
            onChange={event => setDescription(event.target.value)}
          ></textarea>

          <input
            placeholder="Valor em Reais"
            value={value}
            onChange={event => setValue(event.target.value)}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
