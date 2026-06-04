# axios-react-hook · playground

An interactive Postman-style UI for testing both **v1** and **v2** of [axios-react-hook](https://github.com/devmdrd/axios-react-hook).

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/devmdrd/axios-react-hook/tree/playground)

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## How both versions are installed

Both hook versions are installed side by side using npm aliases so they can coexist in the same project:

```json
"axios-react-hook-v1": "npm:axios-react-hook@1.0.0",
"axios-react-hook-v2": "npm:axios-react-hook@2.0.0"
```

Use the **v1 / v2** pill toggle in the header to switch between them.

## v1 vs v2

| | v1 | v2 |
|---|---|---|
| Install | `npm install axios-react-hook@1.0.0` | `npm install axios-react-hook` |
| Config | Positional args | Object config |
| Returns | `data, loading, error, refetch` | `data, loading, error, status, refetch, cancel` |
| Extras | — | `params`, `headers`, `timeout`, `onSuccess`, `onError` |

## Project structure

```
src/
  components/
    Header.jsx          — logo + v1/v2 toggle + theme switcher
    Sidebar.jsx         — preset collections list
    RequestBar.jsx      — method, URL input, send button
    ConfigPanel.jsx     — params / body / headers / code tabs
    ResponsePanel.jsx   — response status, body, code snippet
    EmptyState.jsx      — idle state before first request
    CodeHighlight.jsx   — syntax highlighter
  utils/
    constants.js        — collections, HTTP methods, status helpers
    helpers.js          — JSON utils + code snippet builders
  App.jsx               — state management + composition
  main.jsx              — entry point
  styles.css            — black and white themes
```

## License

MIT © Muhammed Rashid
