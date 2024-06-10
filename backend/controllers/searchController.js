const mongoose = require('mongoose')
const axios = require('axios')
module.exports = {
  
    getSearchedProducts: async (req, res) => {
        const response = await axios.get(`https://dummyjson.com/products/search?q=${req.params.query}`)
        res.status(200).json(response.data.products) //send it back as json
    },
}



