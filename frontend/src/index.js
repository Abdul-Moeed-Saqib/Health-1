import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom'
import { setContext } from '@apollo/client/link/context'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const link = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
});

const setAuthorizationLink = setContext((request, prevContext) => ({
  headers: {
    ...prevContext.headers,
    authorization: `Bearer ${localStorage.getItem('auth')}`
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