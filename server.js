// Imports
import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const PORT = process.env.PORT || 3000;

// Create socket.io server instance
const app = express();
const server = createServer(app);
const io = new Server(server, {
	connectionStateRecovery: {}
});

// Socket.io event handlers
io.on('connection', (socket) => {
	console.log('A user has connected.');

	socket.on('disconnect', () => {
		console.log('A user has disconnected.');
	});
});

// Serve static resources
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(__dirname, 'public')));

// Start server
server.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
