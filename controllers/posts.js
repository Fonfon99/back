const { prisma } = require("../db/db.js");
const {unlink} = require('fs').promises;

async function getLike(req, res) {
  const id = Number(req.params.id);
  const post = await prisma.post.findUnique({
    where: { id },
  });
  if (!post) return res.status(400).send("Post not found");

  const user = await prisma.user.findUnique({ where: { email: req.email } });
  const userId = user.id;
  const like = await prisma.PostLike.findUnique({
    where: { postId_userId: { userId, postId: id } },
  });
  if (like) {
    res.send({ like: true });
  } else {
    res.send({ like: false });
  }
}

async function getPosts(req, res) {
  const email = req.email;
  const posts = await prisma.post.findMany({
    include: {
      comments: {
        orderBy: {
          createdAt: "asc",
        },
        include: {
          user: {
            select: {
              email: true,
            },
          },
        },
      },
      user: {
        select: {
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  res.send({ posts: posts, email });
}

async function createPost(req, res) {
  const title = req.body.title;
  const email = req.email;
  try {
    const hasImage = req.file !== undefined;
    const url = hasImage
      ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      : undefined;
    const user = await prisma.user.findUnique({ where: { email } });
    const userId = user.id;
    const post = { userId, title, url };

    const result = await prisma.post.create({ data: post });

    res.send({ post: result, message: "Post created successfully" });
  } catch (err) {
    console.error(err);
  }
}

async function likeOrUnlike(req, res) {
  const id = Number(req.params.id);
  const post = await prisma.post.findUnique({
    where: { id },
  });
  if (!post) return res.status(400).send("Post not found");

  const user = await prisma.user.findUnique({ where: { email: req.email } });
  const userId = user.id;
  const like = await prisma.PostLike.findUnique({
    where: { postId_userId: { userId, postId: id } },
  });
  if (like) {
    const unlikePost = await prisma.post.update({
      where: { id },
      data: {
        likesNbr: {
          decrement: 1,
        },
        likes: {
          delete: {
            postId_userId: {
              userId,
              postId: id,
            },
          },
        },
      },
    });
    return res.send({ post: unlikePost, message: "Post unliked successfully", like: false });
  } else {
  const addLikeToPost = await prisma.post.update({
    where: { id },
    data: {
      likesNbr: {
        increment: 1,
      },
      likes: {
        create: {
          userId,
        },
      },
    },
  });
  res.send({ post: addLikeToPost, message: "Post liked successfully", like: true });
}
}

async function createComment(req, res) {
  const id = Number(req.params.id);
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
        },
      },
    },
  });
  if (!post) return res.status(400).send("Post not found");

  const userConnnected = await prisma.user.findUnique({
    where: { email: req.email },
  });
  const userId = userConnnected.id;
  const newcomment = { userId, postId: id, content: req.body.content };
  const comment = await prisma.comment.create({ data: newcomment });
  res.send({ comment, message: "Comment created successfully" });
}

async function deletePost(req, res) {
  const id = Number(req.params.id);
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
  });
  if (!post) return res.status(400).send("Post not found");

  const email = req.email;
  const image = post.url;
  console.log(email);
  if (email !== process.env.ADMIN_USER && email !== post.user.email) 
    return res.status(400).send("You are not authorized to delete this post");

  await prisma.comment.deleteMany({ where: { postId: id } });
  await prisma.post.delete({ where: { id } });
  if (image) {
    const filename = image.split("/images/")[1];
  unlink(`images/${filename}`)
  }
  res.send({ message: "Post deleted successfully" });
}

module.exports = {
  getPosts,
  createPost,
  createComment,
  deletePost,
  likeOrUnlike,
  getLike,
};
