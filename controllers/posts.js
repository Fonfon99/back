const comment1 = {email: 'louis@louis.com', content: 'This is a comment', like: 0};
const comment2 = {email: 'louis@louis.com', content: 'This is a comment', like: 1};

const post1 = {email: 'louis@louis.com', title: 'Post 1', url: 'https://picsum.photos/300/200', comments: [comment1]};
const post2 = {email: 'louis@louis.com', title: 'Post 2', url: 'https://picsum.photos/300/200', comments: [comment1, comment2]};
const post3 = {email: 'louis@louis.com', title: 'Post 3', url: 'https://picsum.photos/300/200', comments: []};

function getPosts(req, res) {
    res.send([post1, post2, post3]);
}

module.exports = {getPosts};