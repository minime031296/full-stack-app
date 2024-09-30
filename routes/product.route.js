const {Router} = require('express')

const productRouter = Router()

productRouter.get('/products', async(req, res) => {})

productRouter.post('/products', async(req, res) => {})

productRouter.put('/products/:id', async(req, res) => {})

productRouter.delete('/products/:id', async(req, res) => {})

module.exports = productRouter