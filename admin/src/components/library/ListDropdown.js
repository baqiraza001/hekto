import React, { useState } from "react";
import { ListItemButton, ListItemIcon, ListItemText, Collapse, List, ListItem } from "@mui/material";
import { ExpandLess, ExpandMore, List as ListIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

const ListDropdown = ({ title, icon, items }) => {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const handleCollapse = () => {
    setCollapseOpen(!collapseOpen);
  };

  return (
    <>
      <ListItemButton onClick={handleCollapse}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={title} />
        {collapseOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
        <List>
          {items.map((item, index) => {
            return (
            
            <Link
              to={item.to}
              style={{ textDecoration: "none", color: "inherit" }}
              key={index}
            >
              <ListItem component="div" key={index} disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            </Link>
          )})}

        </List>
      </Collapse>
    </>
  );
};

export default ListDropdown;