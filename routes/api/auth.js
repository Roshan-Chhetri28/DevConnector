const express = require("express")
const router = express.Router()
const auth = require("../../middleware/auth")
// const User = require("../../models/User")
const User = require("../../modles/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();  // ✅ Add dotenv to load environment variables
const { check, validationResult } = require('express-validator')

// @route    GET api/auth
// @desc     Find User by id / Get user data by id without password
// @access   Public

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

// @route    POST api/auth
// @desc     Authenticate user and get token
// @access   Public

router.post('/',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { email, password } = req.body

        try {
            // Check if user exists
            let user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] })
            }

            // Return JSON Web Token
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload,
                process.env.JWT_SECRET,  // ✅ Change to process.env.JWT_SECRET

                { expiresIn: 360000 }, // Adjust token expiration if needed

                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            )
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
)

module.exports = router
