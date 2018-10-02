/**
 * Main index file from where every thing is started
 */

// Dependences
const express = require('express');
const Joi = require('joi');
const app = express();


// Middleware
app.use(express.json());

// Declaration of different type of gennres
let genres = [{
        id: 1,
        name: 'Horror'
    },
    {
        id: 2,
        name: 'Thriller'
    },
    {
        id: 3,
        name: 'Drama'
    },
    {
        id: 4,
        name: 'Romance'
    },
    {
        id: 5,
        name: 'Action'
    }
];

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/genres', (req, res) => {
    res.send(genres);
});




// Creation of a server

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App has been started on port ${port}`);
});