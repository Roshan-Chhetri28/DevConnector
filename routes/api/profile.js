const express = require("express")
const axios = require("axios")
const config = require("config")
const router = express.Router()
const auth = require('../../middleware/auth')

const { check, validationResult } = require('express-validator')

const Profile = require("../../modles/Profile")
const User = require("../../modles/User")
const Post = require('../../modles/Post')

//@route    GET api/profile/me
//@desc     Get current user profile
//@access   Public

router.get('/me', auth, async (req, res) => {
    try {

        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar'])

        if (!profile) {
            return res.status(400).json({ error: [{ msg: 'There is no profile for this user' }] })
        }

        res.json(profile)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')

    }
})

//@route    POST api/profile
//@desc     Create or update user profile
//@access   Private

router.post('/', [auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills is Required').not().isEmpty()
]], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body

    // build profile object
    const profileFields = {}

    profileFields.user = req.user.id

    if (company) profileFields.company = company
    if (website) profileFields.website = website
    if (location) profileFields.location = location
    if (bio) profileFields.bio = bio
    if (status) profileFields.status = status
    if (githubusername) profileFields.githubusername = githubusername
    if (skills) {
        profileFields.skills = Array.isArray(skills)
            ? skills.map(skill => skill.trim())
            : skills.split(',').map(skill => skill.trim());
    }

    // build social object

    profileFields.social = {} //if we dont initialize like this the below code throws error saying ...social is un defined

    if (youtube) profileFields.social.youtube = youtube
    if (twitter) profileFields.social.twitter = twitter
    if (facebook) profileFields.social.facebook = facebook
    if (linkedin) profileFields.social.linkedin = linkedin
    if (instagram) profileFields.social.instagram = instagram


    try {

        let profile = await Profile.findOne({ user: req.user.id })

        if (profile) {
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id }, { $set: profileFields },
                { new: true }
            )
            return res.json(profile)
        }

        // Create

        profile = new Profile(profileFields)


        await profile.save();

        res.json(profile)
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message, 'Server Error')

    }
})

//@route    GET api/profile
//@desc     GET all profiles
//@access   Public

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        res.json(profiles)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error")
    }
})


//@route    GET api/profile/user/:user_id
//@desc     GET profile by user id
//@access   Public

router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar'])

        if (!profile) {
            return res.status(400).json({ msg: "Profile not found" })
        }
        res.json(profile)
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: "Profile not found" })
        }
        res.status(500).send("server error")
    }
})

//@route    DELETE api/profile
//@desc     DELETE profile, user and post
//@access   Private

router.delete('/', auth, async (req, res) => {
    try {

        // ! Remove user post
        await Post.deleteMany({ user: req.user.id })


        //!remove profile 
        await Profile.findOneAndDelete({ user: req.user.id })


        //!remove User 
        await User.findOneAndDelete({ _id: req.user.id })

        res.json({ msg: "User deleted" })

    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: "Profile not found" })
        }
        res.status(500).send("server error")
    }
})

//@route    PUT api/profile/experience
//@desc     Add profile experience
//@access   Private

router.put('/experience', [auth, [
    check('title', "Title is required").not().isEmpty(),
    check('company', "company is required").not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
]],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        }

        try {
            const profile = await Profile.findOne({ user: req.user.id })

            profile.experience.unshift(newExp)

            await profile.save()

            res.json(profile)
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error")

        }
    })


//@route    Delete api/profile/experience
//@desc     Delete profile experience
//@access   Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })

        //Get remove Index

        removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id)

        if (removeIndex < 0) {
            return res.status(404).send('Experience not found')
        }

        profile.experience.splice(removeIndex, 1)

        await profile.save()

        res.send('Experience Deleted')
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")

    }
})

//@route    POST api/profile/experience
//@desc     Update profile experience
//@access   Private
router.post('/experience/:exp_id', auth, async (req, res) => {

    try {
        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body

        const profile = await Profile.findOne({ user: req.user.id })

        if (!profile) return res.status(404).json({ msg: "profile not found" })

        const exp_index = profile.experience.map(item => item.id).indexOf(req.params.exp_id)

        if (title) profile.experience[exp_index].title = title
        if (company) profile.experience[exp_index].company = company
        if (location) profile.experience[exp_index].location = location
        if (from) profile.experience[exp_index].from = from
        if (to) profile.experience[exp_index].to = to
        if (current) profile.experience[exp_index].current = current
        if (description) profile.experience[exp_index].description = description

        await profile.save()

        return res.json(profile)
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error")
    }



})

//@route    PUT api/profile/education
//@desc     Add profile education
//@access   Private

router.put('/education', [auth, [
    check('school', "School is required").not().isEmpty(),
    check('degree', "degree is required").not().isEmpty(),
    check('fieldofstudy', "field of study is required").not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
]],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        } = req.body

        const newEdu = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        }

        try {
            const profile = await Profile.findOne({ user: req.user.id })

            profile.education.unshift(newEdu)

            await profile.save()

            res.json(profile)
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error")

        }
    }
)


//@route    Delete api/profile/education
//@desc     Delete profile education
//@access   Private
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })

        //Get remove Index

        removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id)

        if (removeIndex < 0) {
            return res.status(404).send('education not found')
        }

        profile.education.splice(removeIndex, 1)

        await profile.save()

        res.send('education Deleted')
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")

    }
})


//@route    Delete api/profile/github/:username
//@desc     Delete profile education
//@access   Public
router.get('/github/:username', async (req, res) => {
    try {
        const URI = `https://api.github.com/users/${req.params.username}/repos`
        const params = {
            per_page: 5,
            sort: "created:asc",
            clientId = process.env.GITHUB_CLIENT_ID,
            clientSecret = process.env.GITHUB_SECRET
        }


        const githubresponse = await axios.get(URI, {
            headers: { 'user-agent': 'node.js' },
            params
        })

        res.json(githubresponse.data)
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Internal Server Error')
    }
})

module.exports = router