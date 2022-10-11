const {prisma} = require('../db/db.js');

async function getPosts(req, res) {
    const email = req.email;
    const posts = await prisma.post.findMany({
        include: {
            comments: {
                orderBy: {
                    createdAt: 'asc'
                },
                include: {
                    user: {
                        select: {
                            email: true
                        }
                    }
            }
        },
            user: {
                select: {
                    email: true 
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
    });
    res.send({posts: posts,email});
}

async function createPost(req, res) {
    const title = req.body.title;
    const email = req.email;
    try {
    const hasImage = req.file !== undefined;
    const url = hasImage ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : undefined;
    const user = await prisma.user.findUnique({where: {email}});
    const userId = user.id;
    const post = { userId, title, url};

    const result = await prisma.post.create({data: post});
    
    res.send({post: result, message: 'Post created successfully'}); 
    } catch (err) {
        console.error(err);
    }
}

async function createComment(req,res) {
    const id = Number(req.params.id);
    const post = await prisma.post.findUnique({
        where: {id},
        include: {
            user: {
                select: {
                    id: true
            }
        }
    }
});
    if (!post) return res.status(400).send('Post not found');
    
    const userConnnected = await prisma.user.findUnique({where: {email: req.email}});
    const userId = userConnnected.id;
    const newcomment = {userId, postId: id, content: req.body.content};
    console.log(req.body);
    const comment = await prisma.comment.create({data: newcomment});
    res.send({comment, message: 'Comment created successfully'});
}

async function deletePost(req, res) {
    const id = Number(req.params.id);
    console.log(id);
    const post = await prisma.post.findUnique({
        where: {id},
        include: {
            user: {
                select: {
                    email: true
                }
            }
        }
    });
    if (!post) return res.status(400).send('Post not found');

    const email = req.email;
    if (post.user.email !== email) return res.status(400).send('You are not authorized to delete this post');

    await prisma.comment.deleteMany({where: {postId: id}}); 
    await prisma.post.delete({where: {id}});
    res.send({message: 'Post deleted successfully'});
}

module.exports = {getPosts, createPost, createComment, deletePost};