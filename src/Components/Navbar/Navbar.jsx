import { AppBar, Toolbar, Link as MuiLink, Box, Button, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { Logout } from "@mui/icons-material";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useTranslation } from "react-i18next";
import TranslateIcon from '@mui/icons-material/Translate';
function Navbar() {

    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const logoutFun = () => {
        localStorage.removeItem('userToken');
        setIsLoggedIn(false);
        navigate('/login');
    }
    const { t, i18n } = useTranslation();

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
                                <Logout /> {t('logout')}
                            </MuiLink>
                        )}
                    </Box>

                    <Box sx={{ display: 'flex', gap: 7 }}>
                        {isLoggedIn ? (
                            <>
                                <MuiLink component={Link} to="/" sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <HomeIcon /> {t("home")}
                                </MuiLink>
                                <MuiLink component={Link} to="/cart" sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <ShoppingCartIcon /> {t("cart")}
                                </MuiLink>
                            </>
                        ) : (
                            <>
                                <MuiLink component={Link} to="/login" sx={{
                                    color: 'white', display: 'flex', alignItems: 'center', gap: 0.5
                                }}>
                                    <LoginIcon /> {t("login")}
                                </MuiLink>
                                <MuiLink component={Link} to="/register" sx={{
                                    color: 'white', display: 'flex', alignItems: 'center', gap: 0.5
                                }}>
                                    <AppRegistrationIcon /> {t("register")}
                                </MuiLink>
                            </>
                        )}
                        <Button
                            variant="outlined"
                            sx={{
                                color: "white",
                                borderColor: "white",
                                "&:hover": {
                                    backgroundColor: "white",
                                    color: "#764ba2",
                                }
                            }}
                            onClick={() => i18n.changeLanguage(i18n.language === "en" ? "ar" : "en")}
                        >
                            {i18n.language === "en" ? "AR" : "EN"}
                            <TranslateIcon />


                        </Button>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navbar