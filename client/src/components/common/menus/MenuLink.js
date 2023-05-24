import { Button, Box } from "@mui/material";
import { useState } from "react";
import { themeStyles } from "../../../styles";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { NavLink, Link } from "react-router-dom";

function MenuLink( {data, styleObject} ) {

    const [dropdowns, setDropdowns] = useState(data || []);

    const handleClick = (index, event) => {
        const newDropdowns = [...dropdowns];
        newDropdowns[index].anchorEl = event.currentTarget;
        newDropdowns[index].open = true;
        setDropdowns(newDropdowns);
      };
      

    const handleClose = (index) => {
        const newDropdowns = [...dropdowns];
        newDropdowns[index].anchorEl = null;
        newDropdowns[index].open = false;
        setDropdowns(newDropdowns);
    };
      

    return (
        <>
            {dropdowns.map((dropdown, index) => (
                dropdown.options ?
                <Box key={dropdown.id}>
                    <Button
                        id={dropdown.id}
                        aria-controls={dropdown.open ? dropdown.id + '-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={dropdown.open ? 'true' : undefined}
                        onClick={(event) => handleClick(index, event)}
                        sx={{ ...themeStyles.btnMenu, ...styleObject}}
                        endIcon={<KeyboardArrowDownIcon style={{...themeStyles.btnMenuIcon}}/>}
                    >
                        {dropdown.label}
                    </Button>
                    <Menu
                        key={index}
                        id={dropdown.id + '-menu'}
                        MenuListProps={{
                        'aria-labelledby': dropdown.id,
                        }}
                        anchorEl={dropdown.anchorEl}
                        open={dropdown.open}
                        onClose={() => handleClose(index)}
                        TransitionComponent={Fade}
                    >
                        {dropdown.options.map((option, index) => (
                        <MenuItem key={index} onClick={() => handleClose(index)}>
                           <NavLink to={option.to} style={{...themeStyles.menuLink}}>{option.option}</NavLink>
                        </MenuItem>
                        ))}
                    </Menu>
                </Box>
                : 
                <Button
                    id={dropdown.id}
                    key={dropdown.id}
                    sx={{ ...themeStyles.btnMenu}}
                >
                <NavLink to={dropdown.to} style={{...themeStyles.btnMenu, ...styleObject}}>{dropdown.label}</NavLink>
                </Button>
            ))}
        </>
    );
}

export default MenuLink;