const Product = require("../models/products")

const axios = require('axios')
module.exports = {

    // check if product is saved
    getSavedProduct: async (req, res) => {
        try {
            const productId = parseInt(req.params.productId, 10); 
            const product = await Product.findOne({ 'product.id': productId, user_id: req.user._id });
            if (product) {
                return res.status(200).json({ saved: true });
            }
            return res.status(200).json({ saved: false });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

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
        const existingProduct = await Product.findOne({ 'product.id': req.body.id, user_id: req.user._id });

        if(existingProduct){
            await Product.findOneAndDelete({_id: existingProduct._id})
            res.status(200).json({message: 'Product removed from saved list'}) 
        }
        else{
            const product = req.body

            const user_id = req.user._id
                
            try{
                await Product.create({ product: product, user_id: user_id });  
                res.status(200).json({message: 'Product saved'})
            } catch(error){
                res.status(400).json({error: error.message})
            }
        }
    },
    
}



