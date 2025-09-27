import { useQuery } from "@tanstack/react-query"
import AxiosUserInstance from "../../API/AxiosUserInstans"
import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Grid, Rating, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Product() {
    const { t } = useTranslation()
    const getProduct = async () => {
        const response = await AxiosUserInstance.get('/Products')
        console.log(response.data);
        return (response.data)
    }
    const { error, isLoading, data: products } = useQuery({
        queryKey: ['product'],
        queryFn: getProduct,
        staleTime: 5000
    })
    if (error) return console.log(error);
    if (isLoading) return <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={60} />
    </Box>
    return (
        <Box px={{ xs: 2, sm: 4, md: 8 }} py={6} bgcolor="#f7f8fc">
            <Typography
                variant="h3"
                component="h2"
                mb={4}
                textAlign="center"
                fontWeight="bold"
                sx={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    animation: "shine 3s linear infinite",
                    "@keyframes shine": {
                        "0%": { backgroundPosition: "0% 50%" },
                        "100%": { backgroundPosition: "200% 50%" },
                    },
                    backgroundSize: "200% auto",
                }}
            >
                {t("ourProducts")}
            </Typography>

            <Grid container spacing={4} justifyContent="center">
                {products.map((prod) => (
                    <Grid item key={prod.id} xs={12} sm={6} md={4}>
                        <Link
                            to={`product/${prod.id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <Card
                                sx={{
                                    maxWidth: 300,
                                    borderRadius: 3,
                                    backgroundColor: "white",
                                    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                                    transition: "transform 0.3s, box-shadow 0.3s",
                                    "&:hover": {
                                        transform: "translateY(-6px) scale(1.03)",
                                        boxShadow:
                                            "0px 8px 20px rgba(118, 75, 162, 0.3), 0px 4px 10px rgba(102, 126, 234, 0.2)",
                                    },
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="250"
                                    image={prod.mainImageUrl}
                                    alt={prod.name}
                                    sx={{
                                        objectFit: "contain",
                                        p: 3,
                                        bgcolor: "#fafafa",
                                        transition: "transform 0.4s",
                                        "&:hover": { transform: "scale(1.05)" },
                                    }}
                                />
                                <CardContent sx={{ textAlign: "center" }}>
                                    <Typography variant="h6" fontWeight="600" color="#5a3ea8">
                                        {prod.name.split(" ").length > 4
                                            ? prod.name.split(" ").slice(0, 4).join(" ") + " ..."
                                            : prod.name}
                                    </Typography>

                                    <Typography
                                        variant="subtitle1"
                                        sx={{ color: "#667eea", fontWeight: "bold", mt: 1 }}
                                    >
                                        ${prod.price.toFixed(2)}
                                    </Typography>

                                    <Rating
                                        name="product-rating"
                                        value={prod.rate}
                                        readOnly
                                        precision={0.5}
                                        sx={{
                                            mt: 1,
                                            mb: 2,
                                            "& .MuiRating-iconFilled": { color: "#764ba2" },
                                        }}
                                    />

                                    <Button
                                        variant="contained"
                                        sx={{
                                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                            "&:hover": {
                                                background:
                                                    "linear-gradient(135deg, #5a6fd6 0%, #5a3ea8 100%)",
                                                transform: "scale(1.05)",
                                            },
                                            transition: "all 0.3s",
                                            px: 3,
                                            borderRadius: 2,
                                            color: "white",
                                            fontWeight: "bold",
                                            boxShadow: "0px 4px 10px rgba(102,126,234,0.3)",
                                        }}
                                    >
                                        {t("viewDetails")}
                                    </Button>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Box>




    )
}

export default Product