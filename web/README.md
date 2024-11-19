# EKG Display Web Application

Full-Stack Web Application built with a **React frontend** and a **Node.js backend** (using Express). The frontend interacts with the backend to fetch and display data from the microcontroller. This guide will walk you through setting up both parts of the app locally.

### Running Web Application

Since we're running on Port 5010, go to backend/ and run `node index.js` to start the web application. Then, go to frontend/ and run 'npm start' and open browser link: http://localhost:5010/

### Key NPM Commands Explained:

- **`npm install`**: Installs dependencies defined in `package.json`.
- **`npm start`**: Runs the app (starts the React frontend and Node.js backend if using `concurrently`).
- **`npm run build`**: Builds the React app for production.
- **`npm test`**: Runs tests (if set up in the frontend).
- **`npm run lint`**: Runs a linting tool (if set up).
- **`npm cache clean --force`**: Clears the npm cache (useful for troubleshooting).
