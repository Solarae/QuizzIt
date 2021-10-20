const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

import userRoutes from './routes/api/users.js'

require('dotenv').config()

const { MONGO_URI } = process.env 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('api/user', userRoutes);

mongoose.connect(MONGO_URI, {useNewURLParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch(error => console.log(error.message));