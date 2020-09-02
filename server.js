const express = require('express');
const e = require('express');

const server = express();

server.use(express.json())

let users = [
    {
        id: 1,
        name: "Jane Doe",
        bio: "blah blah blah",
    }
]

server.get("/api/users", (req, res) => {
    if(req == true){
        res.status(200).json({ data: users })
    } else {
        res.status(404).json({ errorMessage: "The users information could not be retrieved." })
    }
})

server.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id)
    let found  = users.find(u => u.id === id)
    if (found == true) {
        res.status(200).json(found)
    } else if(found == false) {
        res.status(404).json({ errorMessage: "The user specified could not be found"})
    } else {
        res.status(500).json({ errorMessage: "User information could not be retrieved"})
    }
})

server.post("api/users", (req, res) => {
    const user = req.body;
    
    if (!user.name || !user.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else if(user.name && user.bio == true){
        users.push(user);
        res.status(201).json({ data: user });
    } else { 
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
    }
})

server.put("api/users/:id", (req, res) => {
    const changes = req.body;
    const id = Number(req.params.id);

    let found = users.find(u => u.id === id);

    if(found) {
        Object.assign(found, changes);
        res.status(200).json(found)
    } else if(!found) {
        res.status(404).json({ message: "not found... oops!"})
    } else if(!changes.name || !changes.body) {
        res.status(400).json({ errorMessage: "that's on you bud, try putting the right info in" })
    } else {
        res.status(500).json({ errorMessage: "My bad" })
    }
});

server.delete("api/users/:id", (req, res) => {
    const id = Number(req.params.id)
    if(id === req.params.id) {
        users = users.filter(u => u.id !== id);
        res.status(200).json(users)
    } else if(id !== req.params.id) {
        res.status(404).json({ errorMessage: "The thing isn't the thing" })
    } else {
        res.status(500).json({ errorMessage: "my bad bro" })
    }
})

const port = 8000;

server.listen(port, () => console.log("server running"))