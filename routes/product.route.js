const {Router} = require('express')
const Product = require('../models/product.model')

const productRouter = Router()

productRouter.get('/products', async(req, res) => {
        try {
                let products = await Product.find({})
                console.log(products)
                res.status(200).json({
                        success: true,
                        message: "List of all products",
                        products: products
                })  
        } catch (error) {
                res.status(500).json({
                        success: false,
                        message: "Something went wrong",
                        
                })         
        }
        
})

productRouter.post('/products', async(req, res) => {
        try {
                let {title, price, category} = req.body 

                const product = await Product.findOne({title})

                if(product) {
                        res.json("Product already exist")
                        return
                }

                let products = await Product({
                        title,
                        price,
                        category
                })

                await products.save()
                res.status(200).json({
                        success: true,
                        message: "Created New Product",
                        products
                })  

        } catch (error) {
                res.status(500).json({
                        success: true,
                        message: "List of all products",
                        
                })  
        }

})

productRouter.put('/products/:id', async (req, res) => {
        try {
            let id = req.params.id;
    
            // Get the updated fields from the request body
            const { title, price, category } = req.body;
    
            // Construct the updatedProduct object with the provided fields
            let updatedProduct = {};
            if (title) updatedProduct.title = title; // Only update if title is provided
            if (price) updatedProduct.price = price; // Only update if price is provided
            if (category) updatedProduct.category = category; // Only update if category is provided
    
            // Find the product by ID and update it
            let product = await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
    
            // Check if the product was found and updated
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found",
                });
            }
    
            res.status(200).json({
                success: true,
                message: "Product updated successfully",
                updatedProduct: product,
            });
    
        } catch (error) {
            console.error(error); // Log the error for debugging
            res.status(500).json({
                success: false,
                message: "Product not updated",
            });
        }
    });
    
productRouter.delete('/products/:id', async(req, res) => {
        try {
                let id = req.params.id

                await Product.findByIdAndDelete(id)

                res.status(200).json({
                        success: true,
                        message: " product deleted",
                        
                }) 
                
        } catch (error) {
                
                res.status(500).json({
                        success: false,
                        message: "error in product deleting",
                        
                })
        }

        
})

module.exports = productRouter