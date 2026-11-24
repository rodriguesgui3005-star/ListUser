import styles from './SearchBar.module.css'

// Input controlado: o valor vive no estado do componente pai (App).
function SearchBar({ value, onChange, disabled }) {
  return (
    <div className={styles.wrapper}>
      <label htmlFor="search" className={styles.label}>
        Buscar por nome
      </label>
      <input
        id="search"
        type="search"
        className={styles.input}
        placeholder="Digite o nome do usuário..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
      />
    </div>
  )
}

export default SearchBar
