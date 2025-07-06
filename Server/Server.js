import express from 'express';
import "dotenv/config";
import cors from 'cors';
import http from 'http';
import connect from './lib/db.js';
import userRouter from './Routes/userRouter.js';
import messageRouter from './Routes/messageRoute.js';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { userSocketMap , setIO} from './socketStore.js';


const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
    cors: { origin: '*' }
});
setIO(io);



io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    console.log('user connected', userId);

    if (userId) userSocketMap[userId] = socket.id;

    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        console.log('User disconnected', userId);
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connect();

app.use('/api/status', (req, res) => {
    res.send('Server is live...');
});
app.use('/api/auth', userRouter);
app.use('/api/messages', messageRouter);


if (process.env.NODE_ENV !== 'production') {

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
    console.log(`Server is listening on ${PORT}`)
);
}

export default server;