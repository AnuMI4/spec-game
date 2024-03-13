# Card Game Project

This project is a React-based card game supporting multiple game modes and dynamic player configurations. Utilizing React's powerful context API for state management and React Router for seamless navigation, this game offers an engaging and interactive user experience.

## Getting Started

```bash
  $ nvm use
  $ npm install
  $ npm run dev
```

## Project Structure

```tree
frontend/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   │   └── Cards-Joker-Black.svg
│   ├── components/
│   │   ├── ExitConfirmationModal.jsx
│   │   ├── GameBoard.jsx
│   │   ├── GameModeSelection.jsx
│   │   ├── GuessModal.jsx
│   │   ├── LastGuessInput.jsx
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   └── WinnerAnnouncementModal.jsx
│   ├── context/
│   │   ├── GameContext.jsx
│   │   └── useGame.jsx
│   ├── utils/
│   │   └── index.js
│   ├── images.js
│   ├── index.css
│   ├── main.jsx
│   └── App.jsx
├── .gitignore
├── package.json
└── README.md
```

### Directory Breakdown

- `public/`: Contains static assets like `index.html`, where the React app is mounted.
- `src/`: The source directory for the React code.
  - `assets/`: Stores static files like images or icons.
  - `components/`: Contains React components for the UI and logic.
  - `context/`: Holds Context API files for global state management.
  - `utils/`: Contains utility functions or constants.
  - `index.css`: The main stylesheet for the app.
  - `main.jsx`: The entry point for the React app.
  - `App.jsx`: The root component that includes routing and global contexts.
- `.gitignore`: Specifies untracked files to ignore.
- `package.json`: Tracks project metadata, scripts, and dependencies.
- `README.md`: Includes project information and documentation.
