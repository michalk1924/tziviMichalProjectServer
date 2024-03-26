require('dotenv').config();
const express = require('express');
//const cors = require('cors');
const database = require('./DB/database');
const { addTodo } = require('./DB/todos');

// const studentsRouter = require('./routes/students');
// const teachersRouter = require('./routes/teachers');
// const coursessRouter = require('./routes/courses');

const server = express();
const host = process.env.HOST_NAME;
const port = process.env.PORT_SERVER;

// server.use((req, res, next) => {
//     console.log('before')
//     next();
// })

server.use(express.json());

const createTables = async () => {
    database.createTableUsers();
    database.createTableAlbums();
    database.createTablePhotos();
    database.createTablePosts();
    database.createTableComments();
}

const deleteTables = async () => {
    database.deleteTable("comments");
    database.deleteTable("posts");
    database.deleteTable("photos");
    database.deleteTable("albums");
    database.deleteTable("users");
}

//deleteTables();
//createTables();
const todo={
    completed: false,
    title: 'todo',
    userId: 1
}
addTodo(todo);

// server.use(cors({
//     origin: 'http://localhost:5173', 
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
//     credentials: true
// }))

// server.use('/students', studentsRouter)
// server.use('/teachers', teachersRouter);
// server.use('/courses', coursessRouter);

server.listen(port, () => {
    console.log(`listening to requests at http://${host}:${port}`);
});
