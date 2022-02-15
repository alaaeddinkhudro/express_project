const express = require('express');
const body_parser = require('body-parser');

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
]

app.get('/customers', (req, res) => {
    res.send(JSON.stringify(customers));
});

app.get('/customers/:id', (req, res) => {
    const id = req.params.id;
    const customer = customers.find(c => c.id === parseInt(id));

    if (!customer) return res.status(404).send('customer not found!!');

    res.send(JSON.stringify(customer));
});

app.post('/customers', (req, res) => {
    const customer = {
        id: customers.length + 1,
        name: req.body.name
    };

    customers.push(customer);
    res.status(201).send(customer);
});


app.listen(8080);