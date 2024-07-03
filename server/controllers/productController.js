const Product = require("../models/products")

const axios = require('axios')
module.exports = {

    // get all producsts
    getProducts: async (req, res) => {
        const response = await axios.get('https://dummyjson.com/products')
        res.status(200).json(response.data.products) //send it back as json
    },
  
    // get a single product
    getProduct: async (req, res) => {
        const productId = req.params.id
        const response = await axios.get(`https://dummyjson.com/products/${productId}`)
        res.status(200).json(response.data) //send it back as json
    },

    // create new saved product
    createSavedProduct: async (req, res) => {
        const product = req.body
        
        try{
            const savedProduct = await Product.create({ product: product });  
            res.status(200).json(savedProduct)
        } catch(error){
            res.status(400).json({error: error.message})
        }
    },

}



