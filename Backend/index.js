require('dotenv').config()
const cors = require('cors');
const express = require('express')
const app = express();
const contactRouter = require('./routers/authRouter')
const connectDB = require("./config/mongoose");
const Task = require('./routers/Task');

app.use(express.json());
app.use(cors());


const PORT = 3000;

app.use('/api', contactRouter)
app.use('/api', Task)

app.get('/', (req, res) => {
    res.send("dmsvksdvlsd")
})

connectDB().then(() =>
    app.listen(PORT, () => {
        console.log(`Server is runing ${PORT}`)
    })
)


