import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams, useNavigate } from "react-router-dom";
import { Container, Box, Button, ButtonGroup, Modal, Card, CardMedia } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import Navbar from "../../components/Navbar";

export default function Product() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  const { productId } = useParams();
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const product = products.find((p) => p.id === productId);

  const onDeleteHandler = () => {
    const newProducts = products.filter((p) => p.id !== productId);
    localStorage.setItem("products", JSON.stringify(newProducts));
    handleClose();
    alert("Delete successful");
    navigate("/home");
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ marginTop: "20px" }}>
        <Card sx={{ width: '100%', height: 'auto', border: '3px solid #D75B91', borderRadius: '15px' }}>
          <CardMedia
            component="img"
            height="auto"
            image={product.image || 'https://www.khalsaacademy.co.in/wp-content/uploads/2018/11/image-not-available.jpg'}
            alt="Product Image"
            sx={{ objectFit: 'cover', width: '100%' }}
          />
        </Card>
        <Accordion sx={{ marginTop: '20px' }} defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Product Name</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" sx={{ fontStyle: 'italic' }}>{product.name}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Price</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" sx={{ fontStyle: 'italic' }}>RM {product.price}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Category</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" sx={{ fontStyle: 'italic' }}>{product.category}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4-content"
            id="panel4-header"
          >
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Description</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" sx={{ fontStyle: 'italic', overflowWrap: 'break-word' }}>{product.description}</Typography>
          </AccordionDetails>
        </Accordion>
        <Box sx={{ display: 'flex', justifyContent: 'end', mt: '1rem' }}>
            <Button color="info" variant="contained" sx={{marginRight: "10px", marginBottom: "10px"}} onClick={() => navigate(`/edit/${product.id}`)} startIcon={<EditIcon />}>Edit</Button>
            <Button
              color="error"
              variant="contained"
              sx={{ marginBottom: "10px"}}
              onClick={handleOpen}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
        </Box>
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography variant="h6" sx={{fontWeight: "bold"}}>You are trying to delete {product && product.name}</Typography>
            <Typography sx={{ mt: 2 }}>Are you sure you want to delete it?</Typography>
            <ButtonGroup sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button onClick={handleClose} variant="contained" color="error">Cancel</Button>
              <Button onClick={onDeleteHandler} variant="contained" color="info">Confirm</Button>
            </ButtonGroup>
          </Box>
        </Modal>
      </Container>
    </>
  );
}
