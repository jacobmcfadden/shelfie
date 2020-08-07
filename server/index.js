require("dotenv").config();
const express = require("express");
const massive = require("massive");
const ctrl = require("./controller");

const app = express();

const { SERVER_PORT, CONNECTION_STRING } = process.env;

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
})
.then(db => {
app.set("db", db);
})
.catch(err => console.log(err));

app.use(express.json());


app.post('/api/product', ctrl.create);
app.get('/api/inventory', ctrl.getAll);
app.get('/api/product/:id', ctrl.getOne);
app.put('/api/product/:id', ctrl.update);
app.delete('/api/product/:id', ctrl.delete);


app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}.`);
});