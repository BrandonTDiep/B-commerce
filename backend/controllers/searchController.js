const mongoose = require('mongoose')
const axios = require('axios')
module.exports = {
  
    getSearchedProducts: async (req, res) => {
        const searchQuery = req.params.quey
        const response = await axios.get(`https://dummyjson.com/products/search?q=${searchQuery}`)
        res.status(200).json(response.data.products) //send it back as json
    },
}



