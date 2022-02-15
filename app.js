const express = require('express');
const app = express();

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

app.listen(8080);