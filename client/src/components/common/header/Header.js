import { Button, Box, Grid, IconButton, Typography, LinearProgress } from "@mui/material";
// import styles from "./header.module.css";

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import MenuLink from "../menus/MenuLink";
import { themeStyles } from "../../../styles";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import SnackBar from "../../library/SnackBar";
import { connect } from "react-redux";

function Header({ progressBar, configuration }) {

    const data = [
        {
            id: 'english',
            label: 'English',
            options: [
                { to: "/English", option: "English" },
                { to: "/urdu", option: "Urdu" },
                { to: "/hindi", option: "Hindi" },
            ],
            anchorEl: null,
            to: '/test',
            open: false
        },
        {
            id: 'currency',
            label: 'USD',
            options: [{ to: '/dollar', option: 'Dollar' }, { to: '/Rupees', option: 'Rupees' }, { to: '/yuan', option: 'Yuan' }],
            anchorEl: null,
            to: '/test',
            open: false
        }
    ];

    return (
        <header>
            {/* top bar: started */}
            <section>
                <Box className={themeStyles.topBarContainer}>
                    <Grid sx={themeStyles.topBarGrid} alignItems='center' container color="var(--white)" bgcolor="var(--voilet)" height="44px">
                        <Grid item lg={4} xs={12} display="flex" justifyContent={'space-around'}>
                            <Box >
                                <Typography className="josefin" variant="body1">
                                    <MailOutlineIcon sx={{ "verticalAlign": 'middle', "marginRight": '10px' }} />
                                    {configuration.email}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1">
                                    <PhoneInTalkIcon sx={{ "verticalAlign": 'middle', "marginRight": '10px' }} />
                                    {configuration.phoneNumber}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item lg={4} display="flex" justifyContent={'flex-end'}>
                            <Box display={'flex'} alignItems={"center"}>
                                <MenuLink data={data} />
                                <Link to="/admin/login">
                                    <Button
                                        id="fade-button"
                                        aria-haspopup="true"
                                        sx={{ ...themeStyles.btnMenu }}
                                        endIcon={<PersonOutlineIcon style={{ ...themeStyles.btnMenuIcon }} />}
                                    >
                                        Login
                                    </Button>
                                </Link>
{/* 
                                <Button
                                    id="fade-button"
                                    aria-haspopup="true"
                                    sx={{ ...themeStyles.btnMenu }}
                                    endIcon={<FavoriteBorderIcon style={{ ...themeStyles.btnMenuIcon }} />}
                                >
                                    <Link to="/" style={{ ...themeStyles.btnMenu }}>Wishlist</Link>
                                </Button> */}

                                <IconButton aria-label="delete" sx={{ ...themeStyles.btnCartIcon, ...themeStyles.btnMenu }}>
                                    <Link to="/" style={{ ...themeStyles.btnMenu }}><AddShoppingCartIcon /></Link>
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </section>
            {/* top bar: ended */}

            {/* navigation bar: started */}
            <Navbar />
            {/* navigation bar: ended */}

            <Box>
                <SnackBar />
                {progressBar.loading && <LinearProgress />}
            </Box>
        </header>
    );
}

const mapStateToProps = state => {
    return {
        progressBar: state.progressBar,
        configuration: state.home.configuration
    }
}

export default connect(mapStateToProps)(Header);