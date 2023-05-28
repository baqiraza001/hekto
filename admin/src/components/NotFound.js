import React from 'react';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        textAlign: 'center',
        marginTop: theme.spacing(8),
    },
    title: {
        marginBottom: theme.spacing(4),
    },
    button: {
        marginTop: theme.spacing(2),
    },
}));

const NotFound = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className={classes.container}>
            <Typography variant="h4" component="h1" className={classes.title}>
                404 - Page Not Found
            </Typography>
            <Typography variant="body1" component="p">
                The page you are looking for does not exist.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleGoBack}
            >
                Go Back
            </Button>
        </div>
    );
};

export default NotFound;