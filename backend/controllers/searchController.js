const mongoose = require('mongoose')
const axios = require('axios')
module.exports = {
  
    // get a single product
    getSearchedProducts: async (req, res) => {
        const category = req.params.category
        let response
        if(category === 'all'){
             response = await axios.get('https://dummyjson.com/products')
        }
        else{
             response = await axios.get(`https://dummyjson.com/products/category/${category}`)
        }
        res.status(200).json(response.data.products) //send it back as json
    },


}



