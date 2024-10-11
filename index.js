const express = require ('express')
const mongoose = require ('mongoose')
const cors = require ('cors')

const UserModel = require('./models/Users')

mongoose.connect("mongodb://127.0.0.1:27017/create-user")

const app = express()
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById(id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json(err));
});


app.put("/updateUser/:id", (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate(
        { _id: id }, 
        { heading: req.body.heading, content: req.body.content, age: req.body.age },
        { new: true }
    )
    .then(user => res.json(user))
    .catch(err => res.json(err));
});



app.delete('/deleteUser/:id', (req, res) => { 
    const id = req.params.id;
    UserModel.findByIdAndDelete(id) 
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
});



app.post("/createUser",(req, res) =>{
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))})


app.listen(3000, () =>{
    console.log("server is running")
})