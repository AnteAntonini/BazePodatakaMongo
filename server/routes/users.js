const router = require('express').Router(); 
const User = require('../models/user');

//POST request 
router.post('/user', async (req, res) => {
    try {
        let user = new User();
        user.first_name = req.body.first_name;
        user.last_name = req.body.last_name;
        user.email = req.body.email;
        user.github = req.body.github;
        user.password = req.body.password;
        user.likedin = req.body.likedin;
        user.facebook = req.body.facebook;
        user.instagram = req.body.instagram;
        user.created_at = req.body.created_at;
        user.updated_at = req.body.updated_at;
        user.is_recruiter = req.body.is_recruiter;

        await user.save();  

        res.json({
            status: true,
            message: "Successfully saved"
        })
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.messages
        })
    }   
});

// GET ALL users
router.get('/user', async (req, res) => {
    try {
        let user = await User.find()

        res.json({
            success: true,
            user: user
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

// GET request - get a single user
router.get('/user/:id', async (req, res) => {
    try {
        let user = await User.findOne({_id: req.params.id}) 
            
        res.json({
            success: true,
            user: user
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});


//PUT request - update a single user
router.put('/user/:id', async (req, res) => {
    try {
        let user = await User.findOneAndUpdate(
            {_id: req.params.id},
            {
            $set: {                          
                last_name : req.body.last_name,
                email : req.body.email,
                github : req.body.github,
                first_name : req.body.first_name,
                password : req.body.password,
                likedin : req.body.likedin,
                facebook : req.body.facebook,
                instagram : req.body.instagram,
                created_at : req.body.created_at,
                updated_at : req.body.updated_at,
                is_recruiter : req.body.is_recruiter
            }
        },
        {upsert: true});  //when doesn't exist create new one

        res.json({
            success: true,
            updatedUser: user  
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});


//DELETE request - delete a single user
router.delete('/user/:id', async (req, res) => {
    try {
        let deletedUser = await User.findOneAndDelete({_id: req.params.id});

        if(deletedUser) {
            res.json({
                status: true,
                message: "Successfully deleted"
            });
        }    
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

module.exports = router;