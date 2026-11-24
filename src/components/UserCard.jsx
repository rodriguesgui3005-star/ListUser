import styles from './UserCard.module.css'

// Recebe os dados de UM usuário via props e renderiza o card.
function UserCard({ user }) {
  const { name, username, email, phone, website, company, address } = user

  // Iniciais do nome para o "avatar" (ex.: "Leanne Graham" -> "LG").
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <div className={styles.avatar} aria-hidden="true">
          {initials}
        </div>
        <div>
          <h2 className={styles.name}>{name}</h2>
          <p className={styles.username}>@{username}</p>
        </div>
      </div>

      <dl className={styles.info}>
        <div>
          <dt>E-mail</dt>
          <dd>{email}</dd>
        </div>
        <div>
          <dt>Telefone</dt>
          <dd>{phone}</dd>
        </div>
        <div>
          <dt>Site</dt>
          <dd>{website}</dd>
        </div>
        <div>
          <dt>Empresa</dt>
          <dd>{company.name}</dd>
        </div>
        <div>
          <dt>Cidade</dt>
          <dd>{address.city}</dd>
        </div>
      </dl>
    </article>
  )
}

export default UserCard
