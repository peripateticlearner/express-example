const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const PORT = 3000

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({extended: true}))

const users = require("./data/users")
const posts = require("./data/posts")

// console.log(posts);
// console.log(users);

app.get('/', (req, res) => {
    res.send("Base home page")
})

app
    .route('/users')
    .get((req, res) => {
    res.json(users)
})
    .post((req, res) => {
        if(req.body.name && req.body.username && req.body.email){
            if(users.find((user)=> user.username == req.body.username)){
                res.json({error: "Username already exists"})
                return
            }
        }
        const user = {
            id: users[users.length -1].id + 1,
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
        }
        users.push(user)
        res.json(users[users.length -1])
    })

app.get('/posts', (req, res) => {
    res.json(posts)
})

app
    .route('/users/:usersID')
    .get((req, res) => {
    //res.send(`User ID: ${req.params.usersID}`)
    const user = users.find((user)=> user.id == req.params.usersID)
    if(user) {res.json(user)}
    else {res.status(404).send("User not found")}
})
    .patch((req, res) => {
        const user = users.find((user, i) => {
            if(user.id == req.params.usersID){
                for (const key in req.body){
                users[i][key] = req.body[key]
            }
            return true
        }
    })
    if (user) res.json(user)
    else {res.status(404).send("User not found")}
    })
    .delete((req, res) => {
        const user = users.find((user, i) => {
            if(user.id == req.params.usersID){
                users.splice(i, 1)
                return true
            }
        })
        if (user) res.json(user)
        else {res.status(404).send("User not found")} 
    })

app.get('/posts/:postsID', (req, res) => {
    const post = posts.find((post) => post.id == req.params.postsID)
    if (post) {res.json(post)}
    else{res.status(404).send("Post not found")}
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})