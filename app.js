const express = require('express');
const body_parser = require('body-parser');
const userRouter = require('./routers/userrouter');
const toDoRoute = require('./routers/todoroute');
const rideRoute = require('./routers/rideroute');
const userDetails = require('./routers/userDetailsRouter')

const app = express();

app.use(body_parser.json());

app.use('/', userRouter);
app.use('/', toDoRoute)
app.use('/', rideRoute)
app.use('/', userDetails)

module.exports = app;