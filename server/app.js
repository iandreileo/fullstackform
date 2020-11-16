const express = require("express")
const app = express()
const mongoose = require("mongoose");
var cors = require('cors');
app.use(cors());

const employeeSchema = new mongoose.Schema({
    name: {
        type: String
    },
    age: {
        type: Number
    },
    country: {
        type: String
    },
    position: {
        type: String
    },
    salary: {
        type: Number
    }
});

let employees = mongoose.model('posts', employeeSchema);

app.get('/', (req, res) => {
    res.send('Server Running');
});

app.get('/getEmployee', async (req, res) => {
    const posts = await employees.find();
    res.json(posts);
});

app.post('/addemployee', (req, res) => {
    console.log(req.query);
    let employee = new employees(req.query);
    employee.save()
        .then(() => {
            res.send('Saved successfully');
        })
        .catch(() => {
            res.status(400).send("Unable to save");
        })
})

module.exports = app;