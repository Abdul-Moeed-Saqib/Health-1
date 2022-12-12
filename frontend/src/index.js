import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom'
import { setContext } from '@apollo/client/link/context'

const link = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
});

const setAuthorizationLink = setContext((request, prevContext) => ({
  headers: {
    ...prevContext.headers,
    authorization: `Bearer ${localStorage.getItem('comp308Token')}`
  }
}))



const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: setAuthorizationLink.concat(link)
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);