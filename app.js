/* eslint-disable */
const express = require('express');
const path = require('path');
const cors = require('cors')
const morgan = require('morgan')

const todoRoutes = require('./routes/todoRoutes');
const viewRoutes = require('./routes/viewRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.options('*', cors());

app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use('/', viewRoutes);
app.use('/api/v1/todo', todoRoutes);


module.exports = app;
