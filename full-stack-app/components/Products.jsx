import { Box, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'

const Products = () => {
    const [products, setProdcuts] = useState([])

    const fetchProducts = async() => {
        let response = await fetch(`https://full-stack-app-zgeq.onrender.com/api/products`, {
            method: "GET",
            credentials:"include",
            headers:{
                "Content-Type": "application/json"
            },
        })
        let data = await response.json()
        setProdcuts(data)
        console.log(data)
    }

    useEffect(() => {
        fetchProducts()
    }, [])
  return (
    <Box>
      {products.length > 0 && products.map((product, ind) => (
        <>
        <Typography>Title: {product.title}</Typography>
        <Typography>Price: {product.price}</Typography>
        <Typography>Category: {product.category}</Typography>
        </>
      ))}
    </Box>
  )
}

export default Products
