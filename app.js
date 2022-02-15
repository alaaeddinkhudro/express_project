const express = require('express');
const body_parser = require('body-parser');
const joi = require('joi');

const app = express();
app.use(body_parser.json()); // parse json in body
app.use(body_parser.urlencoded({
    extended: true
})); // parse fields in x-www-form-urlencoded


let customers = [{
        id: 1,
        name: 'alaa'
    },
    {
        id: 2,
        name: 'amin'
    },
    {
        id: 3,
        name: 'muaaz'
    },
];

const customer_schema = joi.object({
    name: joi.string().alphanum().min(3).max(30).required(),
});

app.get('/customers', (req, res) => {
    res.send(JSON.stringify(customers));
});

app.get('/customers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const customer = customers.find(c => c.id === id);

    if (!customer) return res.status(404).send('customer not found!!');

    res.send(JSON.stringify(customer));
});

app.post('/customers', (req, res) => {

    let {
        error
    } = customer_schema.validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const customer = {
        id: customers.length + 1,
        name: req.body.name
    };

    customers.push(customer);
    res.status(201).send(customer);
});

app.put('/customers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let customer = customers.find(c => c.id === id);

    if (!customer) return res.status(404).send('customer not found!!');

    let {
        error
    } = customer_schema.validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);


    customer.name = req.body.name;
    res.status(200).send(JSON.stringify(customer));
});

app.delete('/customers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = customers.findIndex(c => c.id === id);

    if (index == -1) return res.status(404).send('customer not found!!');

    res.send(JSON.stringify(customers.splice(index, 1)));
});

app.listen(8080);