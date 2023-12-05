import React from "react";
import { Toolbar, AppBar, IconButton, Badge } from "@mui/material";

import { NavLink, useLocation } from "react-router-dom";
import AppleIcon from '@mui/icons-material/Apple';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';

const NavBar = ({ totalitems }) => {
    const { pathname } = useLocation();
    return (
        <>
            <AppBar position="fixed" color="primary" >
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <IconButton
                        LinkComponent={NavLink}
                        to="/"
                        color="inherit"
                        aria-label="apple"
                    ><AppleIcon fontSize="large" />
                    </IconButton>

                    {pathname !== "/cart" && (
                        <IconButton
                            LinkComponent={NavLink}
                            to="/cart"
                            color="inherit"
                            aria-label="Cart">
                            <Badge badgeContent={totalitems} color="success"
                            ><LocalMallRoundedIcon /></Badge>
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>
        </>
    )
}
export default NavBar;