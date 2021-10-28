const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path')
const seedDB = require('./seed');
const methodOverride = require('method-override');
const Post = require('./models/post');


mongoose.connect('mongodb://localhost:27017/quotes')
    .then(() => {
        console.log("DB Connected");
    })
    .catch((err) => {
        console.log(err);
    });


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


seedDB();


app.get('/', (req, res) => {
    res.send('Connected!❤️😍  <h2>Visit localhost:3000/posts</h2> to view our posts or quotes');
});

app.get('/posts', async(req, res) => {
    const posts = await Post.find({});

    res.render('index', { posts });
});

app.get('/posts/new', (req, res) => {
    res.render('new');
});


app.post('/posts', async(req, res) => {
    const { title, author, description } = req.body;
    await Post.create({ title, author, description });
    res.redirect('/posts');
});

app.get('/posts/:id', async(req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.render('show', { post });
});

app.get('/posts/:id/edit', async(req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.render('edit', { post });
});

app.patch('/posts/:id', async(req, res) => {
    const { id } = req.params;
    const updatedPost = req.body;
    await Post.findByIdAndUpdate(id, updatedPost);
    res.redirect('/posts');
});


app.delete('/posts/:id', async(req, res) => {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.redirect('/posts');
});


app.listen('3000', () => {
    console.log('listening at 3000');
});