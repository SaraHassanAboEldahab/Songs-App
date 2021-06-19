import React from 'react';
import ReactDOM from 'react-dom';
import "./style/style.css"
import { Route, Router, hashHistory, IndexRoute } from "react-router"
import ApolloClient from "apollo-client"
import { ApolloProvider } from "react-apollo"
import SongList from './components/SongList';
import App from './components/App';
import SongCreate from './components/SongCreate';
import SongDetails from './components/SongDetails';

const client = new ApolloClient({
  //here apollo will go and fetch every piece of data we need and use the id field of that piece of data to identify it.
  dataIdFromObject: o => o.id
})
const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
          <Route path="songs/new" component={SongCreate} />
          <Route path="songs/:id" component={SongDetails} />
        </Route>
      </Router>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
