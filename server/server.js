const mongoose = require('mongoose');

require('dotenv').config({path: '.env'});

mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
    console.error(`Database Connection Error -> ${err.message}`)
})

const app = require('./app');

const server = app.listen(3001, () => {
    console.log(`Express running on ${server.address().port}`)
})