const express = require('express');
const apiRoutes = require('./routes/api');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || '3001';

//Conectamos a la DB
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/openwebinars'

mongoose.connect(mongoUri);

//El middleware que ejecutamos entre la solicitud y la respusta
//Le inyectamos bodyParser a Express
//se ejecuta entre la solicitud de la ruta y la función que este como respuesta.
app.use(bodyParser.json()) // Convertirá el cuerpo en un objeto JSON.


app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(port, () => {
    console.log(`[Express App] The app is listening on port: ${port}`);
})

//Apuntamos las urls a las funciones de nuestra api
app.get('/api/posts/', apiRoutes.loadPosts);
app.get('/api/posts/:id', apiRoutes.loadPost);
app.post('/api/posts/', apiRoutes.newPost);
app.put('/api/posts/', apiRoutes.updatePost); // No lleva parámetro id, ya que lo mandamos en el body.
app.delete('/api/posts/:id', apiRoutes.deletePost);


//Manejo de los errores
function handleError(err) {
    console.error(`[Error] ${err.message}`)
    console.error(err.stack)
}

//Los eventos son: error, uncaughtException, unhandledRejection
app.on('error', (err) => handleError);
app.on('uncaughtException', (err) => handleError);
app.on('unhandledRejection', (err) => handleError);