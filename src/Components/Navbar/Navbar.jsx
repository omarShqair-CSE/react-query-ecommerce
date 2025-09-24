import { AppBar, Toolbar, Link as MuiLink, Box, Button, Container, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { Logout } from "@mui/icons-material";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { ClassNames } from "@emotion/react";
function Navbar() {

    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    const logoutFun = () => {
        localStorage.removeItem('userToken');
        setIsLoggedIn(false);
        navigate('/login');
    }
    return (
        <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <Container maxWidth='xl'>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', minHeight: '64px' }}>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {isLoggedIn && (
                            <MuiLink
                                component="button"
                                onClick={logoutFun}
                                sx={{
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                    border: 'none',
                                    background: 'transparent',
                                    cursor: 'pointer'
                                }}
                            >
                                <Logout /> Logout
                            </MuiLink>
                        )}
                    </Box>

                    <Box sx={{ display: 'flex', gap: 7 }}>
                        {isLoggedIn ? (
                            <>
                                <MuiLink component={Link} to="/" sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <HomeIcon /> Home
                                </MuiLink>
                                <MuiLink component={Link} to="/cart" sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <ShoppingCartIcon /> Cart
                                </MuiLink>
                            </>
                        ) : (
                            <>
                                <MuiLink component={Link} to="/login" sx={{
                                    color: 'white', display: 'flex', alignItems: 'center', gap: 0.5
                                }}>
                                    <LoginIcon /> Login
                                </MuiLink>
                                <MuiLink component={Link} to="/register" sx={{
                                    color: 'white', display: 'flex', alignItems: 'center', gap: 0.5
                                }}>
                                    <AppRegistrationIcon /> Register
                                </MuiLink>
                            </>
                        )}
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navbar