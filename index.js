const app = require('./app');
const connection = require('./configuration/db')
const userModel = require('./model/user_Model')
const todoModel = require('./model/to_do_model')
const rideModel = require('./model/rides_model')

const port = 3000;

app.get('/', (req, res) => {
    res.send("Hello worlddddd")
});

app.listen( port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});