const express = require('express')
const Post = require('../model/post')
const moment = require('moment');
const post = require('../model/post');

const postRouter = express.Router();

// add on post
postRouter.post('/', (req, res, next) => {
    const newPost = new Post(req.body);
    newPost.save((err, savedPost) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(201).send(savedPost);
    })
})

// get all posts
postRouter.get('/', (req, res, next) => {
    Post.find((err, posts) => {
     if (err) {
        res.status(500);
        return next(err);
     }
     if (!posts || posts.length === 0) {
        res.status(404);
        return next(new Error("No posts are found in the collection!"));
     }

     const postsWithFormattedDate = posts.map(post => ({
        ...post.toJSON(),
        formattedDate: moment(post.datePosted).format("dddd, MMMM, Do YYYY, h:mm:ss a")
     }));
     return res.status(200).send(postsWithFormattedDate)
        
    })
})

// delete post
postRouter.delete('/:id', (req, res, next) => {
    Post.findByIdAndDelete(req.params.id, (err, deletedPost) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(`Deleted Post: ${deletedPost.title}`)
    })
})

//update post
postRouter.put('/:id', (req, res, next) => {
    Post.findByIdAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true},
        (err, updatedPost) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            return res.status(200).send(updatedPost);
        }
    )
})

// get by postitem
postRouter.get('/postitem', (req, res, next) => {
    Post.find({ postitem: req.query.postitem }, (err, posts) => {
        if (err) { 
            res.status(500);
            return next(err)
        }
        return res.status(200).send(posts)
     
    })
})

module.exports = postRouter