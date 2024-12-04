const app = require('./app');
const db = require('./config/bd');
const UserModel = require('./model/user.model');

const port = 3000;

app.get('/', (req, res) => {
    res.send("Hello, world! started app with connection to node and mongo!!!");
})
app.listen(port, ()=> {
    console.log(`Server Listening on Port http://localhost:${port}`);
});