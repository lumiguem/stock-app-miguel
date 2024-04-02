const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv').config()
const app = express()

// connect db
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URL, () => console.log('Db is successfully connected'))

const productSchema = mongoose.Schema({
    name: {type: String, required: true },
    price: Number

}, {timestamps: true})

const Product = mongoose.model('Product', productSchema)

app.use(express.json())

app.post('/api/v1/products', (req,res,next) => {
    
    const newProduct = new Product(req.body)

    newProduct.save().then(result => {
        
        res.status(201).json({ok:true})
    }).catch((err)=> console.log(err))

})
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json());
app.use(cors())

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// routes 


//start server
const PORT = process.env.PORT || 5000;
app.listen(process.env.PORT, () => console.log(`Server is running in port ${PORT}`))


module.exports = app;
