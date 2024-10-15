import { Box, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'

const Products = () => {
  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    let response = await fetch(`https://full-stack-app-zgeq.onrender.com/api/products`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
    })
    let data = await response.json()
    setProducts(data.products)
    console.log(data.products)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4, p: 3 }}>
      {products.length > 0 && products.map((product, ind) => (
        <Box key={ind} sx={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '16px',
          maxWidth: '300px',
          textAlign: 'center',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)'
          }
        }}>
          <img src={product.image} alt={product.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
          <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: '#333' }}>
            {product.title}
          </Typography>
          <Typography sx={{ color: '#888', mb: 1 }}>
            Price: ${product.price}
          </Typography>
          <Typography sx={{ color: '#666', fontSize: '0.9rem' }}>
            Category: {product.category}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

export default Products
