const router = require('express').Router(); 
const Skill = require('../models/skill');

//POST request 
router.post('/skill', async (req, res) => {
    try {
        let skill = new Skill();
        skill.name = req.body.description;
        skill.created_at = req.body.created_at;
        skill.updated_at = req.body.updated_at;

        await skill.save();  

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

// GET ALL skills
router.get('/skill', async (req, res) => {
    try {
        let skill = await Skill.find()

        res.json({
            success: true,
            skill: skill
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

// GET request - get a single skill
router.get('/skill/:id', async (req, res) => {
    try {
        let skill = await Skill.findOne({_id: req.params.id}) 
            
        res.json({
            success: true,
            skill: skill
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});


//PUT request - update a single skill
router.put('/skill/:id', async (req, res) => {
    try {
        let skill = await Skill.findOneAndUpdate(
            {_id: req.params.id},
            {
            $set: {                          
                name : req.body.name,
                created_at : req.body.created_at,
                updated_at : req.body.updated_at,
            }
        },
        {upsert: true});  //when doesn't exist create new one

        res.json({
            success: true,
            updatedSkill: skill  
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});


//DELETE request - delete a single skill
router.delete('/skill/:id', async (req, res) => {
    try {
        let deletedSkill = await Skill.findOneAndDelete({_id: req.params.id});

        if(deletedSkill) {
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