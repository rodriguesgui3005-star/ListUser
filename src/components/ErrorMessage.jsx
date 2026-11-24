import styles from './ErrorMessage.module.css'

function ErrorMessage({ message, onRetry }) {
  return (
    <div className={styles.error} role="alert">
      <h2>Ops! Algo deu errado</h2>
      <p>{message}</p>
      {onRetry && (
        <button type="button" className={styles.button} onClick={onRetry}>
          Tentar novamente
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
