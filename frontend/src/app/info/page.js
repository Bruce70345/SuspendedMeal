'use client';
import React, { useEffect, useState } from 'react';
import useProductStore from '@/stores/product-store';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Theme from '../lib/Theme';
import { ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';




const Info = () => {
  const [userId, setUserId] = useState(null);
  const { products, fetchProducts, addProduct, updateProduct, deleteProduct, isLoading, error } = useProductStore();
  const [newProductName, setNewProductName] = useState('');
  const [newProductQuantity, setNewProductQuantity] = useState('');
  const [newProductExpiration, setNewProductExpiration] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')).user;
    if (user) {

      setUserId(user.userId);
      fetchProducts(user.userId);
    } else { console.log("noooo") }
  }, []);

  const handleAddProduct = () => {
    const newProduct = {
      userId,
      productName: newProductName,
      dailyQuantity: parseInt(newProductQuantity, 10),
      campaignExpiration: new Date(newProductExpiration).toISOString(),
    };
    addProduct(userId, newProduct);
    setNewProductName('');
    setNewProductQuantity('');
    setNewProductExpiration('');
  };
  const handleIncrementProduct = (productId, currentQuantity) => {
    const updatedFields = {
      dailyQuantity: currentQuantity + 1,
    };
    updateProduct(userId, productId, updatedFields);
  };

  const handleDecrementProduct = (productId, currentQuantity) => {
    if (currentQuantity > 0) {
      const updatedFields = {
        dailyQuantity: currentQuantity - 1,
      };
      updateProduct(userId, productId, updatedFields);
    }
  };

  const handleDeleteProduct = (productId) => {
    deleteProduct(userId, productId);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <ThemeProvider theme={Theme}>
      <Box sx={{
        width: '100%',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <Stack spacing={2} sx={{ width: "50%", mt: 5 }}>
          <Item>
            <Typography component='h1' variant='h4' sx={{ fontWeight: 500 }}>新增餐點</Typography >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box>
                <Typography variant='p'>供應餐點名稱: </Typography>
                <input
                  type="text"
                  placeholder="輸入餐點名稱"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                />
              </Box>
              <Box>
              <Typography variant='p'>每日可供應量: </Typography>
                <input
                  type="number"
                  placeholder="每日可供應量"
                  value={newProductQuantity}
                  onChange={(e) => setNewProductQuantity(e.target.value)}
                />
              </Box>
              <Box>
              <Typography variant='p'>優惠截止日: </Typography>
                <input
                  type="date"
                  placeholder="優惠截止日"
                  value={newProductExpiration}
                  onChange={(e) => setNewProductExpiration(e.target.value)}
                />
              </Box>
              <Button sx={{ width:"50%", margin:"auto", mt:1 }} size='small' variant="contained" onClick={handleAddProduct} disabled={!userId}>新增</Button>
            </Box>
          </Item>
          {products.map((product) => (
            <Item key={product._id}>
              <Typography variant='h6'>{product.productName}</Typography>
              <Typography>可供應數量: {product.dailyQuantity}</Typography>
              <Typography>優惠截止: {new Date(product.campaignExpiration).toLocaleDateString()}</Typography>
              <Stack direction="row" spacing={1} sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: '100%'
              }}>
                <Button color="secondary" size="small" variant="contained" onClick={() => handleIncrementProduct(product._id, product.dailyQuantity)} disabled={!userId}>+ 1</Button>
                <Button color="secondary" size="small" variant="contained" onClick={() => handleDecrementProduct(product._id, product.dailyQuantity)} disabled={!userId}>- 1</Button>
                <Button color="error" size="small" variant="outlined" onClick={() => handleDeleteProduct(product._id)} disabled={!userId}>刪除品項</Button>
              </Stack>
            </Item>
          ))}
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default Info;