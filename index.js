const express = require('express');
const port = 8001;
const app = express();
const bodyparser = require('body-parser')
const db = require('./config/db');
const path = require('path');

app.use(bodyparser.urlencoded({ extended: false }));

app.use(bodyparser.json());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', require('./routes/userRoutes'));
app.use('/', require('./routes/attributeRoutes'));

app.listen(port, (error) => {
    if (error) {
        console.log(error);
        return false;
    }
    console.log(`Server Start On ${port} Port...`);
})