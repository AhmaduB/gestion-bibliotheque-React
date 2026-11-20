# Gestion de bibliothèque

Application React pour gérer une petite bibliothèque : afficher une liste de livres, en ajouter, rechercher, filtrer et gérer leur statut (disponible / emprunté).

## Fonctionnalités

- Affichage des livres sous forme de cartes
- Ajout d'un livre via un formulaire (titre + auteur) avec messages d'erreur
- Détection des doublons
- Emprunter / rendre un livre
- Suppression d'un livre
- Recherche par titre ou auteur
- Filtre par statut (Tous / Disponibles / Empruntés)
- Compteur de livres disponibles
- Sauvegarde automatique dans le navigateur (`localStorage`)
- Interface responsive

## Technologies

- React
- Vite
- JavaScript (ES6+)

## Concepts utilisés

- Composants et props (`BookCard`)
- Hooks : `useState` et `useEffect`
- Rendu de liste avec `map` et `key`
- Formulaire contrôlé (`value` + `onChange`)
- Filtrage de données (`filter`, `some`)
- Persistance avec `localStorage`

## Installation

```bash
git clone https://github.com/TON-PSEUDO/gestion-bibliotheque-react.git
cd gestion-bibliotheque-react
npm install
npm run dev
```

Ouvre ensuite l'adresse affichée dans le terminal (souvent `http://localhost:5173`).

## Structure du projet

```
src/
├── components/
│   └── BookCard.jsx
├── App.jsx
└── main.jsx
```

## Améliorations possibles

- Modifier un livre existant
- Séparer le formulaire dans un composant `BookForm`
- Déplacer les styles dans un fichier CSS
- Ajouter une date d'emprunt et le nom de l'emprunteur

## Auteur

Ton nom - [AhmaduB](https://github.com/AhmaduB/gestion-bibliotheque-React)