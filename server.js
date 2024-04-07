require('dotenv').config();
const express = require('express');
const cors = require('cors');
const database = require('./DB/database');

const todosRouter = require('./routes/todos');
const albumsRouter = require('./routes/albums');
const photosRouter = require('./routes/photos');
const commentsRouter = require('./routes/comments');
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');

const server = express();
const host = process.env.HOST_NAME;
const port = process.env.PORT_SERVER;

// server.use((req, res, next) => {
//     console.log('before')
//     next();
// })

server.use(express.json());

server.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true
}))

server.use('/todos', todosRouter)
server.use('/albums', albumsRouter)
server.use('/photos', photosRouter);
server.use('/users', usersRouter);
server.use('/todos', todosRouter);
server.use('/comments', commentsRouter);
server.use('/posts', postsRouter);

server.get('/', (req, res) => {
    res.send('Hello World!');
});

server.listen(port, () => {
    console.log(`listening to requests at http://${host}:${port}`);
});
