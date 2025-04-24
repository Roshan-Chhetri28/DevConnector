const express = require("express")
const router = express.Router()
const gravatar = require('gravatar') // for getting avatar
const bcrypt = require('bcrypt') // hashes characters
const jwt = require('jsonwebtoken') //for auth middleware so that users dont byepass without proper auth token
const config = require('config')
const {check, validationResult} = require('express-validator') // 
const User = require('../../modles/User')



//@route    POST api/users
//@desc     Register user
//@access   Public

router.post('/',
[
    check('name', "Name is required").not().isEmpty(),
    check('email', 'Please include valid email').isEmail(),
    check('password', 'please enter a proper password with 6 or more characters').isLength({min:6})
], 
async (req, res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    
    const {name, email, password} = req.body

    try{
        //See user exist
        let user = await User.findOne({email})

        if(user){
            return res.status(400).json({errors:[{msg: "user already exist"}]})
        }
    
        // getuser gravatar
        const avatar = gravatar.url(email, {
            s:'200', //size
            r: 'A', //rating
            d:'mm'
        })

        user = new User({
            name, 
            email,
            avatar,
            password
        })

        // encrypt password
        const salt = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(password, salt)

        await user.save();

        //retun json web token
        const payload = {
            user:{
                id: user.id
            }
        }

        jwt.sign(payload,
            config.get('jwtSecret'),

            {expiresIn:3600},

            (err, token)=>{
                if(err) throw err;
                res.json({token});
            }
        )
        

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }



    
})


    

module.exports = router