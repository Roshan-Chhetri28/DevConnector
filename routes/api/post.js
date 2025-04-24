const express = require("express")
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const Post = require("../../modles/Post")
const Profile = require("../../modles/Profile")
const User = require("../../modles/User")




//* @route    post api/post
//* @desc     Create a post
//* @access   Private

router.post('/', [auth, [
    check('text', "text is required").not().isEmpty()

]],
    async (req, res) => {
        const error = validationResult(req)

        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() })
        }
        try {
            const user = await User.findById(req.user.id).select('-password')

            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            })
            const post = await newPost.save();

            post.save()
            res.json(post)

        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error")

        }




    })

//* @route    GET api/post
//* @desc     GET all post
//* @access   Public

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('user', ['name', 'avatar'])
        res.json(posts)
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error')
    }
})


//* @route    GET api/post/:post_id
//* @desc     get post by post_id
//* @access   Private
router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({ msg: "Post not found" })
        }
        res.json(post)
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: "Post not found" })
        }
        res.status(500).send("server error")
    }
})

//* @route    DELETE api/post/:post_id
//* @desc     DELETE post by post_id
//* @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User Not Authorized" })
        }
        await post.deleteOne(post)
        res.json({ msg: "post deleted" })
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: "Post not found" })
        }
        res.status(500).send("server error")
    }
})

//* @route    PUT api/post/:post_id
//* @desc     Put Like
//* @access   PRIVATE

router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        // Check if the post has already been liked by user

        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: "post already liked" })
        }

        post.likes.unshift({ user: req.user.id })
        await post.save()

        res.json(post.likes)

    } catch (err) {
        console.error(err)
        return res.status(500).send("Internal Server Error")
    }
})

//* @route    PUT api/post/unlike/like/:post_id
//* @desc     Put Like
//* @access   PRIVATE

router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        // Check if the post has already been liked by user

        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: "post Not liked by user" })
        }

        //get the remove index

        const removeIndex = post.likes.map(like=>like.user.toString()).indexOf(req.user.id);


        post.likes.splice(removeIndex, 1)
        await post.save()

        res.json(post.likes)

    } catch (err) {
        console.error(err)
        return res.status(500).send("Internal Server Error")
    }
})
module.exports = router