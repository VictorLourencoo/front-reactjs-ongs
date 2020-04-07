import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/logo.svg';

//integração com a api
import Api from '../../service/api';

export default function Register() {
  //recebe os valores do formulario atraves de estados.
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsApp, setWhatsApp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  //navegação atraves de uma função javaScript
  const history = useHistory();

  //responsavel por cadastrar o usuario na api.
  //recebe um evento e previne que a pagina recarregue.
  async function hendleRegister(event) {
    event.preventDefault();

    const data = {
      name,
      email,
      whatsApp,
      city,
      uf
    };
    try {
      const response = await Api.post('ongs', data);
      alert(`O ID da sua ong e: ${response.data.id}`);
      //depois de cadastrado, o history da um push na pg de longin
      history.push('/');
    } catch (err) {
      alert('erro de cadastro');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be-the-hero" />
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude as pessoas a
            encontrarem os casos da sua ONG.
          </p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Ja tenho cadastro
          </Link>
        </section>

        {/*a função e executada quando o formulario for disparado */}
        {/*value eo valor que conrresponde ao state.*/}
        {/* onChange = atualiza o valor do input no estado*/}
        <form onSubmit={hendleRegister}>
          <input
            placeholder="Nome da ONG"
            value={name}
            onChange={event => setName(event.target.value)}
          />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />

          <input
            placeholder="WhatsApp"
            value={whatsApp}
            onChange={event => setWhatsApp(event.target.value)}
          />

          <div className="input-group">
            <input
              placeholder="Cidade"
              value={city}
              onChange={event => setCity(event.target.value)}
            />

            <input
              placeholder="UF"
              style={{ width: 80 }}
              value={uf}
              onChange={event => setUf(event.target.value)}
            />
          </div>

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
