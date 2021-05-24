const router = require('express').Router(); 
const Recruiter = require('../models/recruiter');

//POST request 
router.post('/recruiter', async (req, res) => {
    try {
        let recruiter = new Recruiter();
        recruiter.title = req.body.title;
        recruiter.location = req.body.location;
        recruiter.created_at = req.body.created_at;
        recruiter.updated_at = req.body.updated_at;

        await recruiter.save();  

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

// GET ALL recruiters
router.get('/recruiter', async (req, res) => {
    try {
        let recruiter = await Recruiter.find()
        .populate('user')
        .exec();

        res.json({
            success: true,
            recruiter: recruiter
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

// GET request - get a single recruiter
router.get('/recruiter/:id', async (req, res) => {
    try {
        let recruiter = await Recruiter.findOne({_id: req.params.id}) 
            .populate('user')
            .exec();
            
        res.json({
            success: true,
            recruiter: recruiter
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});


//PUT request - update a single recruiter
router.put('/recruiter/:id', async (req, res) => {
    try {
        let recruiter = await Recruiter.findOneAndUpdate(
            {_id: req.params.id},
            {
            $set: {                          
                title : req.body.title,
                location : req.body.location,
                created_at : req.body.created_at,
                updated_at : req.body.updated_at,
                user: req.body.user_id
            }
        },
        {upsert: true});  //when doesn't exist create new one

        res.json({
            success: true,
            updatedRecruiter: recruiter  
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});


//DELETE request - delete a single recruiter
router.delete('/recruiter/:id', async (req, res) => {
    try {
        let deletedRecruiter = await Recruiter.findOneAndDelete({_id: req.params.id});

        if(deletedRecruiter) {
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