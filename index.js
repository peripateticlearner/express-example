const express = require('express')
const bodyParser = require("body-parser")
const app = express()
const PORT = 3000

// Importing the data from our fake database files.
const users = require ("./data/users")
const posts = require ("./data/posts")
// console.log(posts)
// console.log(users)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ extended: true }))

app.get('/', (req, res) => {
    res.send("Base Home Page")
})


app
    .route('/users')
    .get((req, res) => {
    res.json(users)
})

    .post((req, res) => {
        if(req.body.name && req.body.username && req.body.email){
            if(users.find((user) => user.username == req.body.username)) {
                res.json({error: "Username already exists"})
                return
        }

        const user = {
            id: users[users.length - 1].id + 1 ,
            name: req.body.name,
            username: req.body.username,
            email: req.body.email
        }
        
        users.push(user)
        res.json(users[users.length - 1])
        } else res.json({ error: "Insufficient Data" });
})

// Creating a GET route for the entire users database.
// This would be impractical in larger data sets.
app.get('/users', (req, res) => {
    res.json(users)
})

// Creating a GET route for the entire posts database.
// This would be impractical in larger data sets.
app.get('/posts', (req, res) => {
    res.json(posts)
})

// Creating a simple GET route for individual users,
// using a route parameter for the unique id.
app.get('/users/:usersID', (req, res) => {
    //res.send(`User ID: ${req.params.usersID}`)
    const user = users.find ((user) => user.id == req.params.usersID)
    if (user) {res.json(user)}
    else {res.status(404).send("User not found")}
    
})

// Creating a simple GET route for individual posts,
// using a route parameter for the unique id.
app.get('/posts/:postsID', (req, res) => {
    //res.send(`Posts ID: ${req.params.postsID}`)
    const post = posts.find ((post) => post.id == req.params.postsID)
    if (post) {res.json(post)}
    else {res.status(404).send("Post not found")}
    
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
