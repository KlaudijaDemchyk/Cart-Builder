import './App.css';
import { useState, useEffect } from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SellIcon from '@mui/icons-material/Sell';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Container, Chip,
  List, TextField, Typography, Button,
  ListItem, ListItemButton, ListItemIcon, ListItemText,
  Alert, Grid, IconButton
} from '@mui/material';


function App() {
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("list")) || []
  );
  const [productToAdd, setProductToAdd] = useState("");
  const [productCountToAdd, setCountProductToAdd] = useState("");
  const [showWarning, setShowWarning] = useState(false);


  useEffect(()=>{
    localStorage.setItem("list", JSON.stringify(list))
  }, [list]);


  const handleSubmit = () => {
    if (productToAdd) {
      setList([
        ...list,
        {
          productCount: productCountToAdd || 1, 
          productName: productToAdd
        }
      ]);
      setProductToAdd("");
      setCountProductToAdd("");      
    } else {
      setShowWarning(true);
    }    
  }

  const handleDelete = (product) => {
    setList(list.filter(item => item.productName !== product.productName));
  }

  return (    
    <Container maxWidth="sm">
      <Typography variant="h2" mt={3} mb={2} textAlign={'center'} gutterBottom>
        Cart Builder
      </Typography>
      <Grid container  mb={2} spacing={2} justifyContent={'center'} alignItems={'flex-end'}>
        <Grid item xs={8} sm={6}>
          <TextField required value={productToAdd} onChange={(event) => {setProductToAdd(event.target.value); setShowWarning(false);}} fullWidth label="Product" variant="standard" />
        </Grid>
        <Grid item xs={4} sm={2}>
          <TextField value={productCountToAdd} onChange={(event) => {setCountProductToAdd(event.target.value); setShowWarning(false)}}  fullWidth label="Count" variant="standard" />
        </Grid>
        <Grid item xs={12}  sm={4}>
          <Button fullWidth variant="contained" onClick={handleSubmit} endIcon={<AddShoppingCartIcon />}>
            Add to Cart
          </Button>
        </Grid>
      </Grid>
      {showWarning && <Alert severity="warning">Fill form. Product is required</Alert>}      
      <List>
        {list.map(({productName, productCount}, index) => {
          return <ListItem key={index} disablePadding 
          secondaryAction={
            <Chip label={productCount} />              
            }>
          <ListItemButton>
            <ListItemIcon>
              <SellIcon />
            </ListItemIcon>
            <ListItemText primary={productName} />            
          </ListItemButton>
          <IconButton edge="end" aria-label="delete" onClick={() => handleDelete({productName, productCount})}>
            <DeleteIcon />
          </IconButton>
        </ListItem>      
        })}          
      </List>
      {!!list.length && 
        <Button onClick={() => {
          setList([]);
          localStorage.removeItem("list");        
        }}>Clear</Button>
      }
      
    </Container>
  );
}


export default App;
