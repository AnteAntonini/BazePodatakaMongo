const express = require('express');
const mongoose  = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config();  

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


mongoose.connect(process.env.DATABASE, {  
useUnifiedTopology: true,
useNewUrlParser: true,
})
.then(() => console.log('DB Connected!'))
.catch(err => {
    console.log(err);
})





//require APIs
const jobsRoutes = require('./routes/jobs');
const reviewRoutes = require('./routes/review')
const skillRoutes = require('./routes/skill')
const userRoutes = require('./routes/user');
const recruiterRoutes = require('./routes/recruiter');

app.use('/api', jobsRoutes);
app.use('/api', reviewRoutes)
app.use('/api', skillRoutes)
app.use('/api', userRoutes)
app.use('/api', recruiterRoutes)


app.listen(3000, err => {
    if(err) {
        console.log(err);
    } else {
        console.log('listening on PORT', 3000);
    }
});

