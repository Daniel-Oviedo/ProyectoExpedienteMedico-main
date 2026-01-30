export function ProfileCard({ user }) {
  return (
    <div className="profile-card">
      <div className="profile-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="profile-icon">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
          <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
        </svg>
        <h2>Tu Perfil</h2>
      </div>
      <div className="profile-info">
        <div className="info-item">
          <span className="info-label">Nombre</span>
          <span className="info-value">{user?.nombre}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Email</span>
          <span className="info-value">{user?.email}</span>
        </div>
      </div>
    </div>
  )
}
