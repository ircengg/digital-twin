import { Link, BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Loader from './Loader';
import Alert from './Alert';

import _3DReporting from '../3DReporting'


const SignIn = ({ loginUser }) => {

    const useStyles = makeStyles((theme) => ({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));
    const classes = useStyles();

    const handleLogin = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const { userEmail, userPassword } = Object.fromEntries(data.entries());
        loginUser({ userEmail, userPassword });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <Icon>lock</Icon>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={handleLogin} >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="userEmail"
                        label="Email Address"
                        name="userEmail"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="userPassword"
                        label="Password"
                        type="password"
                        id="userPassword"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>

                </form>
            </div>
            <Box mt={8}>
                <Typography variant="body2" color="textSecondary" align="center">
                    {'Copyright © '}
                    <a color="inherit" href="https://ircengg.com/">
                        IRC ENGINEERING SERVICES (I) PVT. LTD.
                    </a>{' '}
                    {2022}
                    {'.'}
                </Typography>
            </Box>
        </Container>
    );
}


const Layout = ({ window, options = {}, navs = [], loginUser, logoutUser, showLoader, showAlert = { open: false, message: '', type: 'success' } }) => {

    const navigate = useNavigate();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

   
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex'
        },
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: options.drawerWidth,
                flexShrink: 0,
            },
        },
        appBar: {
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${options.drawerWidth}px)`,
                marginLeft: options.drawerWidth,
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
        // necessary for content to be below app bar
        toolbar: {
            ...theme.mixins.toolbar,
            alignItems: 'center',
            textAlign: 'center'
        },
        drawerPaper: {
            width: options.drawerWidth,

        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        userBox: {
            padding: '8px',
            textAlign: 'center'
        }
    }));

    const classes = useStyles();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };



    const drawer = (
        <div>
            <div className={classes.userBox}>
                <Avatar alt="User" src={options.userProfilePic} style={{ margin: 'auto' }} />
                <span>
                    {options.userName}
                </span>
                <br />
                <span>
                    <a href="#">{options.userEmail}</a>
                </span>
                <br />
                <span  >
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={logoutUser}
                    >
                        <Icon>exit_to_app</Icon>
                    </IconButton>
                </span>
            </div>
            <Divider />
            <List dense={true}>
                <ListItem button >
                    <Icon>chevron_right</Icon>
                    <Link to='/3d-reporting' >3D REPORTING</Link>
                </ListItem>
            </List>
        </div >
    );



    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            {options.isUserLoggedIn ?
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                className={classes.menuButton}
                            >
                                <Icon>menu</Icon>
                            </IconButton>
                            <>
                                <Avatar src={options.companyLogo} />
                            </>
                            <Typography variant="h6" noWrap>
                                {options.companyName}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <nav className={classes.drawer} aria-label="mailbox folders">
                        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                        <Hidden smUp implementation="css">
                            <Drawer
                                container={container}
                                variant="temporary"
                                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                                open={mobileOpen}
                                onClose={handleDrawerToggle}
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                ModalProps={{
                                    keepMounted: true, // Better open performance on mobile.
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                        <Hidden xsDown implementation="css">
                            <Drawer
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                variant="permanent"
                                open
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                    </nav>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Routes>
                            <Route path='/' element={<></>} />
                            <Route path='/3d-reporting' element={<_3DReporting />} />
                        </Routes>
                    </main>
                </div>
                :
                <SignIn loginUser={loginUser} />
            }


            <Loader loading={showLoader} />
            <Alert showAlert={showAlert} />
        </>
    );
}


const App = (props) => {

    return (
        <Router>
            <Layout {...props} />
        </Router>
    )
}

export default App;