const express = require('express');
const app = express();

let customer = [{
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
    res.send(JSON.stringify(customer));
});

app.listen(8080);