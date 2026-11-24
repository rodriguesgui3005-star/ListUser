import api from './api'

// Busca a lista de usuários. O `signal` permite cancelar a requisição
// (por exemplo, quando o componente é desmontado).
export async function getUsers(signal) {
  const response = await api.get('/users', { signal })
  return response.data
}
