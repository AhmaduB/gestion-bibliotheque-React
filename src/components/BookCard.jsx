export default function BookCard({ titre, auteur, isDisponible, onClickEmprunt, onSupprimer }) {
  return (
    <div
      style={{
        border: '3px solid grey',
        borderRadius: '10px',
        padding: '20px',
        margin: '10px',
        width: '300px',
      }}
    >
      <h2>Titre: {titre}</h2>
      <p>Auteur: {auteur}</p>
      <p>Statut : {isDisponible ? "🟢 Disponible" : "🔴 Emprunté"}</p>

      <div style={{ display: 'flex', gap: '10px', marginTop:'10px', marginLeft:'48px' }}>
        <button
          onClick={onClickEmprunt}
          style={{
            padding: '8px',
            borderRadius: '5px',
            border: '1px solid grey',
            color: 'white',
            cursor: 'pointer',
            backgroundColor: isDisponible ? 'green' : '#DC2626',
          }}
        >
          {isDisponible ? "Emprunter" : "Rendre"}
        </button>

        <button
          onClick={onSupprimer}
          style={{
            padding: '8px',
            borderRadius: '5px',
            border: '1px solid grey',
            backgroundColor: 'white',
            cursor: 'pointer',
          }}
        >
          Supprimer
        </button>
      </div>
    </div>
  )
}