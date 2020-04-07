import React, { useState } from 'react';
//ler aquivo
//lib de icons do react - fi = fethericons, icon = fiLogin(fi + nome do icon)
//cda icon e um componente => e aceitam tamanho e cor
import { FiLogIn } from 'react-icons/fi';
//definir os links para que a pagina nao seja carregada toda(Abordagem SPA);
import { Link, useHistory } from 'react-router-dom';

import Api from '../../service/api';

import './styles.css';
//imagens devem ser importadas no java script
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
export default function Logon() {
  const [id, setId] = useState('');
  const history = useHistory();
  async function handleLogin(event) {
    event.preventDefault();

    try {
      const response = await Api.post('sessions', { id });

      //o nome e o id precisa estar disponivel em toda a aplicação
      //salvar no localStorage do navegador.
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile');
    } catch (error) {
      alert('falha no login, tente novamente');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be-the-hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input
            placeholder="Sua ID"
            value={id}
            onChange={(event) => setId(event.target.value)}
          />

          <button className="button" type="submit">
            Entrar
          </button>
          <Link className="back-link" to="/register">
            Nao tenho cadastro
            <FiLogIn size={16} color="#E02041" />
          </Link>
        </form>
      </section>
      {/*anexar uma imagem no jsx, atraves de variavel */}
      <img src={heroesImg} alt="heroes" />
    </div>
  );
}
