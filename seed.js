const Post = require('./models/post');

const posts = [{
        author: 'Mahtma Gandhi',
        description: 'Be the change that you wish to see in the world.'
    },
    {
        author: 'Alexander The Greatan',
        description: 'There is nothing impossible to him who will try.'
    },
    {
        author: 'Bhagat Singh',
        description: 'A rebellion is not a revolution.'
    },
    {
        author: 'Subhas Chandra Bose',
        description: 'It is blood alone that can pay the price of freedom. Give me blood and I will give you freedom.'
    },
];

const seedDB = async() => {
    await Post.deleteMany({});

    await Post.insertMany(posts);
    console.log('DB Seeded')
}

module.exports = seedDB;