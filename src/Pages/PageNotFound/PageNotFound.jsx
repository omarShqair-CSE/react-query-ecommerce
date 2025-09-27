import { Box, Button, Container, Typography, Stack } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
function PageNotFound() {
    const { t } = useTranslation()
    const navigate = useNavigate()

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #FFDEE9 0%, #B5FFFC 100%)",
                px: 2,
            }}
        >
            <Container
                maxWidth="sm"
                sx={{ textAlign: "center", bgcolor: "#fff", p: 5, borderRadius: 4, boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
            >
                <ErrorOutlineIcon sx={{ fontSize: 80, color: "#764ba2", mb: 2 }} />
                <Typography variant="h3" fontWeight="bold" color="#333" mb={2}>
                    {t("404")}
                </Typography>
                <Typography variant="h5" color="#555" mb={4}>
                    {t("pageNotFound")}
                </Typography>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
                    <Button
                        variant="contained"
                        onClick={() => navigate("/")}
                        sx={{
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            color: "#fff",
                            fontWeight: "bold",
                            px: 4,
                            py: 1.5,
                            borderRadius: 3,
                            "&:hover": {
                                background: "linear-gradient(135deg, #556cd6 0%, #5b3fa3 100%)",
                            },
                        }}
                    >
                        {t("backToHomePage")}
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={() => navigate(-1)}
                        sx={{
                            color: "#667eea",
                            borderColor: "#667eea",
                            fontWeight: "bold",
                            px: 4,
                            py: 1.5,
                            borderRadius: 3,
                            "&:hover": {
                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                color: "#fff"
                            },
                        }}
                    >
                        {t("backToPreviousPage")}
                    </Button>
                </Stack>
            </Container>
        </Box>
    )
}

export default PageNotFound