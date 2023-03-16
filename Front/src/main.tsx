import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './redux/configStore'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import './index.css'

const client = new ApolloClient({
  uri: 'http://localhost:8080', // GraphQL server URI
  cache: new InMemoryCache(), // InMemoryCache를 통해 cache 관리
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* graphQL */}
    <ApolloProvider client={client}>
      {/* redux */}
      <Provider store={store}>
        {/* router */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
)
