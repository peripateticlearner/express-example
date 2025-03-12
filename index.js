const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Importing the data from our fake database files.
const users = require('./data/users');
const posts = require('./data/posts');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Base Home Page");
});

// GET all users - Fetches the entire list of users
app.get('/users', (req, res) => {
    res.json(users);
});

// POST /users - Adds a new user to the database
app.post('/users', (req, res) => {
    if (!req.body.name || !req.body.username || !req.body.email) {
        return res.status(400).json({ error: "Insufficient Data" });
    }

    if (users.find(user => user.username === req.body.username)) {
        return res.status(400).json({ error: "Username already exists" });
    }

    const newUserId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

    const user = {
        id: newUserId,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email
    };

    users.push(user);
    res.status(201).json(user);
});

// GET all posts - Returns all posts from the database
app.get('/posts', (req, res) => {
    res.json(posts);
});

// GET individual user by ID
app.get('/users/:usersID', (req, res) => {
    const user = users.find(user => user.id === Number(req.params.usersID));
    
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    
    res.json(user);
});

// GET individual post by ID
app.get('/posts/:postsID', (req, res) => {
    const post = posts.find(post => post.id === Number(req.params.postsID));

    if (!post) {
        return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
});

// Server start - Logs the port when the server is running
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
