import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ProductCard from "../../components/ProductCard";
import Caroussel from "../../components/Carousel";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import DrawerMenu from "../../components/DrawerMenu";
import Button from "@mui/material/Button";
import Navbar from "../../components/Navbar";
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

export default function Home() {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = products
    .filter(
      (product) =>
        selectedCategory === "All" || product.category === selectedCategory
    )
    .filter(
      (product) =>
        !keyword || product.name.toUpperCase().includes(keyword.toUpperCase())
    );

  return (
    <>
    <Navbar/>
      <Container sx={{ padding: "20px" }}>
        <Divider />
        <Caroussel />
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          sx={{ marginBottom: "20px" }}
        >
          <Grid item xs={12} sm={6} md={3}>
            <Button
              onClick={() => setSelectedCategory("All")}
              variant="outlined"
              sx={{
                width: "100%",
                padding: { xs: "10px", md: "20px" },
                bgcolor: "#82204A",
                color: "white",
                border: "1px solid white",
                "&:hover": {
                  bgcolor: "#CA91CA",
                },
              }}
            >
              All Categories
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="outlined"
            sx={{
              width: "100%",
              padding: { xs: "10px", md: "14px" },
              bgcolor: "#82204A",
              color: "white",
              border: "1px solid white",
              "&:hover": {
                bgcolor: "#CA91CA",
              },
            }}
            >
            <DrawerMenu setSelectedCategory={setSelectedCategory} />
          </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              placeholder="Search..."
              variant="outlined"
              color="primary"
              onChange={(e) => setKeyword(e.target.value)}
              fullWidth
              InputProps={{
                endAdornment: <SearchIcon color="in" />,
              }}
            />
          </Grid>
        </Grid>
        <Typography
          variant="h3"
          style={{
            display: "flex",
            justifyContent: "center",
            fontStyle: "italic",
            margin: "40px",
          }}
        >
          {selectedCategory === "All" ? "All Categories" : selectedCategory}
        </Typography>
        {filteredProducts.length > 0 ? (
          <Grid container spacing={2}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ProductCard product={product} type="list" />
              </Grid>
            ))}
          </Grid>
        ) : (          
          <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{margin: "20px"}}>
            <SentimentDissatisfiedIcon /> No Products Found
          </Typography>
          <Button
          variant="contained"
          component={Link}
          to="/add"
          sx={{
            justifyContent: "flex-end",
            bgcolor: "#82204A",
            "&:hover": {
              bgcolor: "#CA91CA",
            },
          }}
          >
            Add New Product
          </Button>
        </Box>
          
        )}
      </Container>
    </>
  );
}
