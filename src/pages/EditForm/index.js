import {
  Button,
  MenuItem,
  Container,
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
  CardActions,
  InputAdornment,
  Divider,
  styled,
  Modal,
  Box,
  ButtonGroup,
  Input
} from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import FileUploadIcon from '@mui/icons-material/FileUpload';

export default function EditForm() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  const { productId } = useParams();
  let products = JSON.parse(localStorage.getItem("products")) ;
  const product = products.find((p) => p.id === productId);

  const [name, setName] = useState(product.name);
  const [description, setDesc] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);
  const [image, setImage] = useState(product.image);

  const updateHandler = () => {
    if (!name || !description || !price || !category) {
      alert("Please fill in all the details.");
      return;
    }
  
    const updatedProducts = products.map((p) => {
      if (p.id === productId) {
        return {
          ...p,
          name,
          description,
          price,
          category,
          image
        };
      }
      return p;
    });
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    handleClose();
    alert("Product updated successfully");
    navigate(`/product/${product.id}`);
  }
  const convertToBase64 = (img) => {
    const selectedFile = img;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  const UploadButton = styled("input")(
    {
      height: 0,
      width: 0,
      display: "none"
    }
  );

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ textAlign: "center", padding: "20px" }}>
        <Typography variant="h3" sx={{fontWeight: "bold", fontStyle: "italic"}}>Edit Product</Typography>
        <Card
          raised
          sx={{
            marginTop: "30px",
            padding: "30px",
          }}
        >
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  value={name}
                  label="Product Name"
                  variant="outlined"
                  color="info"
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  value={description}
                  label="Product Description"
                  onChange={(e) => setDesc(e.target.value)}
                  variant="outlined"
                  color="info"
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  value={price}
                  label="Product Price (RM per unit)"
                  type="number"
                  min="1"
                  onChange={(e) => setPrice(e.target.value)}
                  variant="outlined"
                  color="info"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">RM</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  value={category}
                  select
                  label="Categories"
                  variant="outlined"
                  color="info"
                  onChange={(e) => setCategory(e.target.value)}
                  fullWidth
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Vehicles">Vehicles</MenuItem>
                  <MenuItem value="Properties">Properties</MenuItem>
                  <MenuItem value="Electronics">Electronics</MenuItem>
                  <MenuItem value="Home & Personal Items">
                    Home & Personal Items
                  </MenuItem>
                  <MenuItem value="Leisure/Sports/Hobbies">
                    Leisure/Sports/Hobbies
                  </MenuItem>
                  <MenuItem value="Business To Business">
                    Business To Business
                  </MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Input
                  style={{
                    display: "none"
                  }}
                  accept="image/*"
                  id="upload-image"
                  type="file"
                  onChange={(e) => {
                    convertToBase64(e.target.files[0]);
                  }}
                />
                <label htmlFor="upload-image">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<FileUploadIcon />}
                    sx={{
                      bgcolor: "#82204A",
                      color: "white",
                      border: "0px",
                      "&:hover": {
                        bgcolor: "#CA91CA",
                      },
                    }}
                    fullWidth
                  >
                    Upload Image
                  </Button>
                </label>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions sx={{justifyContent:"flex-end"}}>
            <Button variant="contained" onClick={()=>navigate(`/product/${product.id}`)} color="error">Cancel</Button>
            <Button onClick={handleOpen} variant="contained" color="info">
              Confirm
            </Button>
          </CardActions>
        </Card>
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={{position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: 400,bgcolor: 'background.paper',border: '2px solid #000',boxShadow: 24,p: 4,}}>
            <Typography id="keep-mounted-modal-title" variant="h6" sx={{fontWeight: "bold", fontStyle: "italic"}}>
              You are trying to update {product.name}.
            </Typography>
            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
              Please make sure your input is correct.
            </Typography>
            <ButtonGroup sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button onClick={handleClose} variant="contained"  color="error">Cancel</Button>
              <Button onClick={updateHandler} variant="contained" color="info">Update</Button>
            </ButtonGroup>
          </Box>
        </Modal>
      </Container>
    </>
  );
}
