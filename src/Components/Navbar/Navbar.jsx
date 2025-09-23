import { AppBar, Toolbar, Link as MuiLink, Box } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
function Navbar() {
    return (
        <AppBar
            position="static"
            className="px-4 py-2"
            sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}
        >
            <Toolbar className="w-full d-flex justify-content-between" sx={{ minHeight: '64px' }}>

                <Box className="d-flex" sx={{ gap: 2 }}>
                    <MuiLink
                        component={Link}
                        to="/login"
                        className="text-decoration-none"
                        sx={{
                            color: 'white',
                            textTransform: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            padding: '8px 16px',
                            borderRadius: '20px',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                transform: 'translateY(-2px)'
                            }
                        }}
                    >
                        <LoginIcon sx={{ fontSize: 20 }} />
                        Login
                    </MuiLink>
                    <MuiLink
                        component={Link}
                        to="/register"
                        className="text-decoration-none"
                        sx={{
                            color: 'white',
                            textTransform: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            padding: '8px 16px',
                            borderRadius: '20px',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                transform: 'translateY(-2px)'
                            }
                        }}
                    >
                        <AppRegistrationIcon sx={{ fontSize: 20 }} />
                        Register
                    </MuiLink>
                </Box>

                <Box className="d-flex" sx={{ gap: 2 }}>
                    <MuiLink
                        component={Link}
                        to="/"
                        className="text-decoration-none"
                        sx={{
                            color: 'white',
                            textTransform: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            padding: '8px 16px',
                            borderRadius: '20px',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                transform: 'translateY(-2px)'
                            }
                        }}
                    >
                        <HomeIcon sx={{ fontSize: 20 }} />
                        Home
                    </MuiLink>
                    <MuiLink
                        component={Link}
                        to="/cart"
                        className="text-decoration-none"
                        sx={{
                            color: 'white',
                            textTransform: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            padding: '8px 16px',
                            borderRadius: '20px',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                transform: 'translateY(-2px)'
                            }
                        }}
                    >
                        <ShoppingCartIcon sx={{ fontSize: 20 }} />
                        Cart
                    </MuiLink>
                </Box>

            </Toolbar>
        </AppBar>
    )
}

export default Navbar