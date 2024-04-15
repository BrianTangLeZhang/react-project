import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ToysSharpIcon from "@mui/icons-material/ToysSharp";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import CableSharpIcon from "@mui/icons-material/CableSharp";
import DirectionsBikeSharpIcon from "@mui/icons-material/DirectionsBikeSharp";
import WcSharpIcon from "@mui/icons-material/WcSharp";
import AllInclusiveSharpIcon from "@mui/icons-material/AllInclusiveSharp";
import CheckroomIcon from '@mui/icons-material/Checkroom';

const icons = [
  <ToysSharpIcon />,
  <HomeSharpIcon />,
  <CableSharpIcon />,
  <WcSharpIcon />,
  <DirectionsBikeSharpIcon />,
  <CheckroomIcon/>,
  <AllInclusiveSharpIcon />,
];

export default function DrawerMenu({ setSelectedCategory }) {
  const [open, setOpen] = React.useState(false);
  let categories = JSON.parse(localStorage.getItem("categories"));
  if (!categories) categories = [];

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Button
        onClick={toggleDrawer(true)}
        sx={{
          color: "inherit",
          display: "flex",
          overflow: "hidden",
          alignItems: "center",
        }}
      >
        Categories
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <List>
            {categories.map((text, index) => (
              <ListItem key={text}>
                <ListItemButton onClick={() => setSelectedCategory(text)}>
                  <ListItemIcon>{icons[index]}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
