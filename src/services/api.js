import axios from 'axios'

// Instância única do Axios, reutilizada por toda a aplicação.
// Centralizar a configuração (baseURL, timeout, headers) evita repetição
// e facilita trocar a API no futuro.
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000, // 10 segundos
  headers: {
    Accept: 'application/json',
  },
})

export default api
