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
  styled
} from "@mui/material";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import FileUploadIcon from '@mui/icons-material/FileUpload';

export default function AddForm() {
  const navigate = useNavigate();
  let products = localStorage.getItem("products");
  if (!products) products = [];
  else {
    products = JSON.parse(products);
  }
  const [name, setName] = useState("");
  const [description, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCate] = useState("");
  const [image, setImage] = useState(null);
  let categories = JSON.parse(localStorage.getItem("categories"));
  const UploadButton = styled("input")(
    {height:0,width:0}
  )

  const convertToBase64 = (img) => {
    const selectedFile = img;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  const onSubmitHandler = () => {
    if (!name || !description || !price || !category) {
      alert("Please fill in all the details.");
      return;
    }
  
    products.push({
      id: nanoid(),
      name: name,
      price: price,
      description: description,
      category: category,
      image: image,
    });
    localStorage.setItem("products", JSON.stringify(products));
    alert("New product added successfully");
    navigate("/home");
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ textAlign: "center", padding: "20px 0" }}>
      <Typography variant="h3" sx={{fontWeight: "bold", fontStyle: "italic"}}>New Product</Typography>
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
                  label="Product Description"
                  onChange={(e) => setDesc(e.target.value)}
                  variant="outlined"
                  color="info"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  required
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
              <Grid item xs={12} md={8}>
                <TextField
                  required
                  select
                  label="Categories"
                  variant="outlined"
                  color="info"
                  onChange={(e) => setCate(e.target.value)}
                  fullWidth
                >
                  {categories.map((category) => {
                    return (
                      <MenuItem value={category}>{category}</MenuItem>
                    )
                  }
                  )}
        
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Button size="large" component="label" 
                 sx={{
                  bgcolor: "#82204A",
                  color: "white",
                  border: "0px",
                  "&:hover": {
                    bgcolor: "#CA91CA",
                  },
                }}
                variant="contained" startIcon={<FileUploadIcon />} fullWidth>
                  <UploadButton
                    required
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      convertToBase64(e.target.files[0]);
                    }}
                  />Upload Image
                </Button>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions sx={{display:"flex",justifyContent:"center"}}>
            <Button onClick={()=>onSubmitHandler()} variant="contained" 
            sx={{
              bgcolor: "#82204A",
              color: "white",
              border: "0px",
              "&:hover": {
                bgcolor: "#CA91CA",
              },
            }}
            size="large">
              Add
            </Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
}
