import React from 'react';
//BrowserRouter responsavel por todas as rotas(por volta de tudo)
//route responsavel por cada uma das rotas(cada route tem um caminho e um componente)
//switch garante que apenas uma rota seja excutada a cada momento
//sao acessados como componentes;
//exact + especifica que o caminho precisar exatamente como foi passado

import { BrowserRouter, Route, Switch } from 'react-router-dom';
//import de rotas.
import Logon from './pages/Logon/index';
import Register from './pages/Register/index';
import Profile from './pages/Profile/index';
import NewIncidents from './pages/NewIncidents/index';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/register" component={Register} />

        <Route path="/profile" component={Profile} />
        <Route path="/incidents/new" component={NewIncidents} />
      </Switch>
    </BrowserRouter>
  );
}
