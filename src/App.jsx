import { useState, useEffect } from 'react'
import BookCard from './components/BookCard'

const livresDeDepart = [
  { id: 1, auteur: "Mariama Bâ", titre: "Une si longue lettre", isDisponible: true },
  { id: 2, auteur: "Cheikh Hamidou Kane", titre: "L'Aventure ambiguë", isDisponible: false },
  { id: 3, auteur: "Ousmane Sembène", titre: "Les Bouts de bois de Dieu", isDisponible: true },
  { id: 4, auteur: "Aminata Sow Fall", titre: "La Grève des bàttu", isDisponible: true },
  { id: 5, auteur: "Boubacar Boris Diop", titre: "Murambi, le livre des ossements", isDisponible: false },
  { id: 6, auteur: "Chinua Achebe", titre: "Le Monde s'effondre", isDisponible: true },
  { id: 7, auteur: "Antoine de Saint-Exupéry", titre: "Le Petit Prince", isDisponible: false },
  { id: 8, auteur: "Albert Camus", titre: "L'Étranger", isDisponible: true },
]

function App() {
  // Liste des livres (chargée depuis localStorage si elle existe)
  const [listBook, setListBook] = useState(() => {
    const sauvegarde = localStorage.getItem("livres")
    return sauvegarde ? JSON.parse(sauvegarde) : livresDeDepart
  })

  const [titre, setTitre] = useState("")
  const [auteur, setAuteur] = useState("")
  const [erreur, setErreur] = useState("")
  const [recherche, setRecherche] = useState("")
  const [filtre, setFiltre] = useState("tous")

  // Sauvegarde automatique à chaque modification de la liste
  useEffect(() => {
    localStorage.setItem("livres", JSON.stringify(listBook))
  }, [listBook])

  const changeStatus = (id) => {
    const newList = listBook.map((l) =>
      l.id === id ? { ...l, isDisponible: !l.isDisponible } : l
    )
    setListBook(newList)
  }

  const supprimerLivre = (id) => {
    setListBook(listBook.filter((l) => l.id !== id))
  }

  const ajouterLivre = (e) => {
    e.preventDefault()

    if (titre.trim() === "" || auteur.trim() === "") {
      setErreur("Veuillez remplir le titre et l'auteur.")
      return;
    }

    const existe = listBook.some(
      (l) =>
        l.titre.toLowerCase() === titre.trim().toLowerCase() &&
        l.auteur.toLowerCase() === auteur.trim().toLowerCase()
    )
    if (existe) {
      setErreur("Ce livre existe déjà.")
      return
    }

    const nouveauLivre = {
      id: Date.now(),
      titre: titre.trim(),
      auteur: auteur.trim(),
      isDisponible: true,
    }

    setListBook([...listBook, nouveauLivre])
    setTitre("")
    setAuteur("")
    setErreur("")
  }

  const livresAffiches = listBook.filter((l) =>
        l.titre.toLowerCase().includes(recherche.toLowerCase()) ||
        l.auteur.toLowerCase().includes(recherche.toLowerCase())
    )
    .filter((l) => {
      if (filtre === "disponibles") return l.isDisponible
      if (filtre === "empruntes") return !l.isDisponible
      return true
    })

  const nbDisponibles = listBook.filter((l) => l.isDisponible).length

  return (
    <main>
      <h2>Liste des livres</h2>

      <form
        onSubmit={ajouterLivre}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          padding: '18px',
          gap: '20px',
          border: '1px solid grey',
          margin: '42px 26px 30px 26px',
          alignItems: 'flex-end',
          borderRadius: '10px',
        }}
      >
        <div style={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label htmlFor="titre" style={{ fontWeight:'bold' }}>Titre :</label>
          <input
            id="titre"
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            style={{ width: '100%', boxSizing: 'border-box', borderRadius: '8px', padding: '8px' }}
          />
        </div>

        <div style={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label htmlFor="auteur" style={{ fontWeight: 'bold' }}>Auteur :</label>
          <input
            id="auteur"
            type="text"
            value={auteur}
            onChange={(e) => setAuteur(e.target.value)}
            style={{ width: '100%', boxSizing: 'border-box', borderRadius: '8px', padding: '8px' }}
          />
        </div>

        <button
          type="submit"
          style={{
            color: 'white',
            backgroundColor: 'green',
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
          }}>Ajouter</button>

        {erreur && (
          <p style={{ color: '#DC2626', margin: 0, flexBasis: '100%' }}>{erreur}</p>
        )}
      </form>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '15px',
          alignItems: 'center',
          margin: '0 26px 20px 26px',
        }}>

        <input
          type="text"
          placeholder="Rechercher un livre..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          style={{ flex: '1 1 250px', padding: '8px', borderRadius: '8px', border: '1px solid grey' }}
        />

        <select
          value={filtre}
          onChange={(e) => setFiltre(e.target.value)}
          style={{ padding: '8px', borderRadius: '8px', border: '1px solid grey' }}
        >
          <option value="tous">Tous</option>
          <option value="disponibles">Disponibles</option>
          <option value="empruntes">Empruntés</option>
        </select>

        <p style={{ margin: 0 }}>
          {nbDisponibles} disponible(s) sur {listBook.length}
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {livresAffiches.map((l) => (
          <BookCard
            key={l.id}
            titre={l.titre}
            auteur={l.auteur}
            isDisponible={l.isDisponible}
            onClickEmprunt={() => changeStatus(l.id)}
            onSupprimer={() => supprimerLivre(l.id)}
          />
        ))}
      </div>

      {livresAffiches.length === 0 && (
        <p style={{ margin: '0 26px' }}>Aucun livre trouvé.</p>
      )}
    </main>
  )
}

export default App