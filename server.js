// Imports
import express from 'express';
import path from 'path';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// Create express server instance
const app = express();
const PORT = process.env.PORT || 3000;

// Create socket.io server instance
const server = createServer(app);
const io = new Server(server);

// Serve static resources
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

// Start server
server.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
