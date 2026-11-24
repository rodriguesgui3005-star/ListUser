import styles from './Loading.module.css'

function Loading() {
  return (
    <div className={styles.loading} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <p>Carregando dados...</p>
    </div>
  )
}

export default Loading
