import { useEffect, useState } from 'react'
import axios from 'axios'
import { getUsers } from './services/userService'
import UserCard from './components/UserCard'
import SearchBar from './components/SearchBar'
import Loading from './components/Loading'
import ErrorMessage from './components/ErrorMessage'
import styles from './App.module.css'

// Converte o erro técnico do Axios em uma mensagem amigável.
function getFriendlyErrorMessage(error) {
  if (error.code === 'ECONNABORTED') {
    return 'A requisição demorou demais para responder. Tente novamente.'
  }
  if (error.response) {
    return `O servidor retornou um erro (status ${error.response.status}).`
  }
  if (error.request) {
    return 'Não foi possível conectar ao servidor. Verifique sua conexão com a internet.'
  }
  return 'Ocorreu um erro inesperado ao carregar os dados.'
}

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  // Mudar este número dispara uma nova requisição (botão "Tentar novamente").
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchUsers() {
      setLoading(true)
      setError(null)

      try {
        const data = await getUsers(controller.signal)
        setUsers(data)
      } catch (err) {
        // Requisição cancelada pelo cleanup: não é um erro para o usuário.
        if (axios.isCancel(err)) return
        setError(getFriendlyErrorMessage(err))
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    fetchUsers()

    // Cleanup: cancela a requisição se o componente desmontar.
    return () => controller.abort()
  }, [reloadKey])

  // Filtro em tempo real por nome (ignora maiúsculas/minúsculas).
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.trim().toLowerCase()),
  )

  function renderContent() {
    if (loading) return <Loading />

    if (error) {
      return (
        <ErrorMessage
          message={error}
          onRetry={() => setReloadKey((key) => key + 1)}
        />
      )
    }

    if (filteredUsers.length === 0) {
      return (
        <p className={styles.empty}>
          Nenhum usuário encontrado para &ldquo;{search}&rdquo;.
        </p>
      )
    }

    return (
      <ul className={styles.grid}>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            <UserCard user={user} />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Lista de Usuários</h1>
        <p>Dados consumidos da API JSONPlaceholder com Axios.</p>
      </header>

      <SearchBar
        value={search}
        onChange={setSearch}
        disabled={loading || Boolean(error)}
      />

      {!loading && !error && (
        <p className={styles.counter}>
          Exibindo {filteredUsers.length} de {users.length} usuários
        </p>
      )}

      {renderContent()}
    </main>
  )
}

export default App
