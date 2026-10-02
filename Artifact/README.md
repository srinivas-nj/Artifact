# Frontend deployment

`index.html` is the frontend entry point. The Pages workflow stages only the
HTML, CSS, JavaScript, images, and local resume guidance from this directory.

## RUBA AI connection

Edit `ruba-config.js` to change `apiBaseUrl` when a backend is deployed. Local
development on `localhost` uses `http://localhost:8080`; other hosts default
to no backend. The frontend sends a resume question and retrieved local context
to `/api/chat`. Configure the backend to allow requests from the Pages origin.
Do not put credentials or secrets in this public configuration file.

Until a backend is available, RUBA AI transparently shows locally stored resume
guidance with a connection notice. The Java backend, PostgreSQL, and Ollama are
not part of the Pages deployment.
