import { Link } from "react-router-dom";
import { Typography, Button, Box } from "@mui/material";

export default function Welcome() {
  return (
    <div
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/3775602/pexels-photo-3775602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        backgroundSize: "contain",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          width: { xs: "90%", sm: "70%", md: "50%" }, // Adjust width based on screen size
          padding: "2rem",
          borderRadius: "10px",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          marginBottom: "2rem",
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: "bold", mb: 4 }}>
          Revibe
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "1rem", fontStyle: "italic" }}>
          Explore our vibrant community of buyers and sellers. Discover unique finds, exchange recommendations, and embrace the excitement of second-hand shopping. Connect with fellow enthusiasts who share your appreciation for quality, value, and sustainability
        </Typography>
        <Button
          variant="outlined"
          size="large"
          component={Link}
          to="/home"
          sx={{
            "&:hover": {
              bgcolor: "#82204A",
              color: "white",
            },
          }}
          color="inherit"
          onClick={() =>
            localStorage.setItem(
              "categories",
              JSON.stringify([
                "Vehicles",
                "Properties",
                "Electronic",
                "Home & Personal Items",
                "Sports",
                "Clothing",
                "Others",
              ])
            )
          }
        >
          Start
        </Button>
      </Box>
    </div>
  );
}
