import { Box, Container, Typography, IconButton, Stack, Link as MuiLink } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
function Footer() {
    const { t } = useTranslation();


    return (
        <Box
            sx={{
                background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                color: "#fff",
                py: 6,
                mt: 8
            }}
        >
            <Container maxWidth="lg">
                <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" spacing={3}>

                    <Stack direction="row" spacing={2}>
                        <MuiLink component={Link} to="/" sx={{ color: "white", display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <HomeIcon /> {t("home")}
                        </MuiLink>
                        <MuiLink component={Link} to="/cart" sx={{ color: "white", display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <ShoppingCartIcon /> {t("cart")}
                        </MuiLink>
                        <MuiLink component={Link} to="/login" sx={{ color: "white", display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <LoginIcon /> {t("login")}
                        </MuiLink>
                        <MuiLink component={Link} to="/register" sx={{ color: "white", display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <AppRegistrationIcon /> {t("register")}
                        </MuiLink>
                    </Stack>

                    <Stack direction="row" spacing={1}>
                        <IconButton sx={{ color: 'white', '&:hover': { color: '#FFD700' } }}>
                            <FacebookIcon />
                        </IconButton>
                        <IconButton sx={{ color: 'white', '&:hover': { color: '#1DA1F2' } }}>
                            <TwitterIcon />
                        </IconButton>
                        <IconButton sx={{ color: 'white', '&:hover': { color: '#E1306C' } }}>
                            <InstagramIcon />
                        </IconButton>
                    </Stack>
                </Stack>

                <Typography variant="body2" textAlign="center" mt={4}>
                    © {new Date().getFullYear()} {t("myCompanyName")}. {t("allRightsReserved")}
                </Typography>
            </Container>
        </Box>
    )
}

export default Footer