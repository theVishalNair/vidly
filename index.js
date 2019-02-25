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
    return res.send(genres);
});

app.post('/api/genres', (req, res) => {
    const {
        error
    } = validateGenreName(req.body);


    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    return res.status(200).send(genre);
});


app.put('/api/genres/:id', (req, res) => {
    const {
        error
    } = validateGenreName(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const id = req.param.id;
    const index = checkGenreExist(id)
    if (index == -1) {
        return res.status(404).send(`Genre with id ${id} does not exist`);
    }

    genres[index].name = req.body.name;
    return res.status(200).send(genres[index]);
});


app.delete('api/genres/:id', (req, res) => {

    const id = req.param.id;
    const index = checkGenreExist(id)
    if (index == -1) {
        return res.status(404).send(`Genre with id ${id} does not exist`);
    }

    const genre = genres[index];
    return res.status(200).send(genre);
});



// Helper Function

validateGenreName = course => {
    const schema = {
        name: Joi.string()
            .min(3)
            .required()
    };

    return Joi.validate(course, schema);
};

checkGenreExist = id => {
    const index = genres.findIndex(c => {
        return c.id == parseInt(id);
    })
    return index;
}



// Creation of a server

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`App has been started on port ${port}`);
});