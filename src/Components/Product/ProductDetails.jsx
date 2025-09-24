import { useNavigate, useParams } from 'react-router-dom'
import AxiosUserInstance from '../../API/AxiosUserInstans';
import { useQuery } from '@tanstack/react-query';
import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Rating, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import { Bounce, toast } from 'react-toastify';
import { useState } from 'react';


function ProductDetails() {

    const [isAdding, setIsAdding] = useState(false);

    const navigate = useNavigate()


    const addToCart = async (id) => {
        // alert('test')
        setIsAdding(true);
        try {
            const response = await AxiosUserInstance.post(`/Carts`, { productId: id })
            console.log(response);
            if (response.status == 200) {
                toast.success('product Added Successfully'), {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                }
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsAdding(false);

        }
    }
    const { id } = useParams();

    const getProductById = async () => {
        const res = await AxiosUserInstance.get(`/Products/${id}`);
        return res.data;
    }

    const { data: product, isLoading, error } = useQuery({
        queryKey: ['product', id],
        queryFn: getProductById
    });

    if (isLoading) return <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={60} />
    </Box>;
    if (error) return <Typography color="error">Error: {error.message}</Typography>;

    return (
        <Box px={{ xs: 2, sm: 4, md: 6 }} py={6} bgcolor="#f7f8fc" minHeight="90vh">
            <Card sx={{
                maxWidth: 700,
                margin: "0 auto",
                borderRadius: 3,
                boxShadow: "0px 4px 20px rgba(102,126,234,0.2)",
                transition: "transform 0.3s, box-shadow 0.3s",
                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: "0px 8px 25px rgba(118, 75, 162, 0.3), 0px 4px 15px rgba(102,126,234,0.2)"
                }
            }}>
                <CardMedia
                    component="img"
                    height="350"
                    image={product.mainImageUrl}
                    alt={product.name}
                    sx={{ objectFit: "contain", p: 3, bgcolor: "#fafafa", transition: "transform 0.4s", "&:hover": { transform: "scale(1.05)" } }}
                />
                <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h4" fontWeight="bold" color="#5a3ea8" mb={2}>
                        {product.name}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold" color="#667eea" mb={1}>
                        ${product.price.toFixed(2)}
                    </Typography>
                    <Box display="flex" justifyContent="center" alignItems="center" mb={2} gap={1}>
                        <Rating
                            value={product.rate}
                            readOnly
                            precision={0.5}
                            icon={<StarIcon fontSize="inherit" />}
                            sx={{ color: "#764ba2" }}
                        />
                        <Typography variant="subtitle1" color="#764ba2" ml={1}>
                            {product.rate.toFixed(1)}
                        </Typography>
                    </Box>
                    <Typography variant="body1" color="#333" mb={2}>
                        {product.description}
                    </Typography>

                    <Button
                        variant="contained"
                        sx={{
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            color: "white",
                            px: 1,
                            py: 1,
                            borderRadius: 2,
                            fontSize: 13,
                            mx: 11,
                            transition: "all 0.3s",
                            "&:hover": {
                                transform: "scale(1.05)",
                                background: "linear-gradient(135deg, #5a6fd6 0%, #5a3ea8 100%)",
                                boxShadow: "0px 4px 12px rgba(102,126,234,0.3)"
                            }
                        }}
                        onClick={() => addToCart(product.id)}
                    >
                        {isAdding ? <CircularProgress size={20} sx={{ color: "white" }} /> : 'Add to Cart'}
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate(-1)}
                        sx={{
                            color: "#667eea",
                            borderColor: "#667eea",
                            px: 1,
                            py: 1,
                            borderRadius: 2,
                            fontSize: 13,
                            mx: 11,
                            '&:hover': {
                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                color: 'white',
                                transform: 'scale(1.05)',
                                boxShadow: "0px 4px 12px rgba(102,126,234,0.3)"
                            },
                            transition: 'all 0.3s'
                        }}
                    >
                        Back
                    </Button>
                </CardContent>
            </Card>
        </Box>
    )
}

export default ProductDetails