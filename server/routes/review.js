const router = require('express').Router(); 
const Review = require('../models/review');

//POST request 
router.post('/review', async (req, res) => {
    try {
        let review = new Review();
        review.description = req.body.description;
        review.rating = req.body.rating;
        review.created_at = req.body.created_at;
        review.updated_at = req.body.updated_at;

        await review.save();  

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

// GET ALL reviews
router.get('/review', async (req, res) => {
    try {
        let review = await Review.find()

        res.json({
            success: true,
            review: review
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

// GET request - get a single review
router.get('/review/:id', async (req, res) => {
    try {
        let review = await Review.findOne({_id: req.params.id}) 
            
        res.json({
            success: true,
            review: review
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});


//PUT request - update a single review
router.put('/review/:id', async (req, res) => {
    try {
        let review = await Review.findOneAndUpdate(
            {_id: req.params.id},
            {
            $set: {                          
                description : req.body.description,
                rating : req.body.rating,
                created_at : req.body.created_at,
                updated_at : req.body.updated_at,
            }
        },
        {upsert: true});  //when doesn't exist create new one

        res.json({
            success: true,
            updatedReview: review  
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});


//DELETE request - delete a single review
router.delete('/review/:id', async (req, res) => {
    try {
        let deletedReview = await Review.findOneAndDelete({_id: req.params.id});

        if(deletedReview) {
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