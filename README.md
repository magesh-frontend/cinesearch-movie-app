# 🎬 CineSearch — Movie Search App

A clean React movie search app built with OMDb API.

## Features
- 🔍 Live search with debounce (no button needed)
- 🎴 Movie cards with poster, title, year
- 📄 Movie detail page with rating, genre, plot, cast
- ❤️ Add/remove favorites (persisted in localStorage)
- 📱 Responsive design
- ⬆️ Load more pagination

## Tech Stack
- React 18
- React Router v6
- Context API (favorites state)
- OMDb API
- CSS Variables (no extra libraries)

---

## Setup Instructions

### 1. Get a Free API Key
Go to: https://www.omdbapi.com/apikey.aspx  
Choose the FREE tier (1000 requests/day) and enter your email.  
You'll receive your API key via email.

### 2. Add your API Key
Open `src/api.js` and replace:
```js
const API_KEY = 'YOUR_API_KEY';
```
with your actual key:
```js
const API_KEY = 'abc12345';
```

### 3. Install & Run
```bash
npm install
npm start
```

App runs at http://localhost:3000

---

## Project Structure
```
src/
├── api.js                  # OMDb API calls
├── App.js                  # Routes
├── context/
│   └── FavoritesContext.js # Global favorites state
├── components/
│   ├── Navbar.js
│   ├── MovieCard.js
│   └── Spinner.js
└── pages/
    ├── Home.js             # Search page
    ├── MovieDetail.js      # Detail page
    └── Favorites.js        # Saved favorites
```
