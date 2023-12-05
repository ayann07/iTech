import React from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
    bgimage: {
        display: "block",
        margin: "1rem auto",
        width: "100%"
    }
});
const Home = () => {
    const classes = useStyles();
    return (
        <>
            <Grid container
                justifyContent="center"
                alignContent="space-around"
                sx={{ aspectRatio: "18/9", marginTop: "60px" }}>
                <Grid item xs={12} textAlign="center">
                    <Typography variant="h1" component="h1" fontWeight="800">iTech Store</Typography>
                    <Typography variant="h4" sx={{ fontFamily: "times-new-roman" }}>Experience the best of Apple technology</Typography>
                </Grid>
                <Grid item xs={11}><img src="Images/mac-background.jpg" alt="Home" className={classes.bgimage} />
                </Grid>
            </Grid>
        </>
    )
}
export default Home;