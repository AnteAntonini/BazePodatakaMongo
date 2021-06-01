const router = require('express').Router(); 
const Jobs = require('../models/jobs');

//POST request 
router.post('/jobs', async (req, res) => {
    try {
        let jobs = new Jobs();
        jobs.title = req.body.title;
        jobs.description = req.body.description;
        jobs.finished = req.body.finished;
        jobs.in_progress = req.body.price;

        await jobs.save();  

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


// GET ALL JOBS
router.get('/jobs', async (req, res) => {
    try {
        let jobs = await Jobs.find()
        .populate('[recruiter]')
        .exec();

        res.json({
            success: true,
            jobs: jobs
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

// GET request - get a single job
router.get('/jobs/:id', async (req, res) => {
    try {
        let jobs = await Jobs.findOne({_id: req.params.id})
            .populate('[recruiter]')
            .exec(); 
            
        res.json({
            success: true,
            jobs: jobs
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});


//PUT request - update a single job
router.put('/jobs/:id', async (req, res) => {
    try {
        let jobs = await Jobs.findOneAndUpdate(
            {_id: req.params.id},
            {
            $set: {                          
                title : req.body.title,
                description : req.body.description,
                finished : req.body.photo,
                in_progress : req.body.price,
                skill: req.body.skill_id,
            }
        },
        {upsert: true});  //when doesn't exist create new one

        res.json({
            success: true,
            updatedJob: jobs  
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});


//DELETE request - delete a single job
router.delete('/jobs/:id', async (req, res) => {
    try {
        let deletedJob = await Jobs.findOneAndDelete({_id: req.params.id});

        if(deletedJob) {
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