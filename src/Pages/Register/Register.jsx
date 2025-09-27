import { Box, Button, CircularProgress, Container, TextField, Typography, InputAdornment } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BadgeIcon from '@mui/icons-material/Badge';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';
import { useForm } from "react-hook-form";
import { usePost } from "../../API/apiRequsted";
import { useTranslation } from "react-i18next";
function Register() {
    const { t } = useTranslation()
    const { register, handleSubmit } = useForm();
    const { loading, postData } = usePost();
    const onSubmit = (formData) => {
        //    console.log(formData);
        postData("Identity/Account/Register", formData);
    };

    return (
        <Box
            py={12}
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #FFDEE9 0%, #B5FFFC 100%)",
                display: "flex",
                alignItems: "center"
            }}
        >
            <Container maxWidth="sm">
                <Box
                    sx={{
                        padding: 5,
                        backgroundColor: "#fff",
                        borderRadius: 4,
                        boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
                    }}
                >
                    <Typography
                        component="h2"
                        variant="h4"
                        mb={4}
                        textAlign="center"
                        sx={{ color: "#764ba2", fontWeight: "bold" }}
                    >
                        {t("createYourAccount")}
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                    >
                        <TextField
                            {...register("Email")}
                            label={t("email")}
                            required
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon color="primary" />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <TextField
                            {...register("UserName")}
                            label={t("userName")}
                            required
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircleIcon color="secondary" />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <TextField
                            {...register("FullName")}
                            label={t("fullName")}
                            required
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <BadgeIcon sx={{ color: "#ff6f61" }} />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <TextField
                            {...register("PhoneNumber")}
                            label={t("phoneNumber")}
                            required
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PhoneIcon sx={{ color: "#00b894" }} />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <TextField
                            {...register("Password")}
                            label={t("password")}
                            type="password"
                            required
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon color="error" />
                                    </InputAdornment>
                                )
                            }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            sx={{
                                mt: 2,
                                py: 1.5,
                                fontSize: "16px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                color: "#fff",
                                fontWeight: "bold",
                                borderRadius: 3,
                                "&:hover": {
                                    background: "linear-gradient(135deg, #556cd6 0%, #5b3fa3 100%)"
                                }
                            }}
                        >
                            {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : `${t("register")}`}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );

}

export default Register