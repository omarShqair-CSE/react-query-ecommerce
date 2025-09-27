import { useQuery } from '@tanstack/react-query'
import { Box, Card, CardContent, CardMedia, CircularProgress, Grid, IconButton, Typography } from '@mui/material'
import AxiosUserInstance from '../../API/AxiosUserInstans'
import { useTranslation } from 'react-i18next'

function Brand() {
    const { t } = useTranslation()
    const getBrands = async () => {
        const response = await AxiosUserInstance.get('/Brands')
        return response.data
    }
    const { data: brands, error, isError, isLoading } = useQuery({
        queryKey: ['brands'],
        queryFn: getBrands,
        staleTime: 5000
    })
    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" >
                <CircularProgress size={60} />
            </Box>
        )
    }
    if (isError) {
        return (
            <Box textAlign="center" mt={10}>
                <Typography variant="h6" color="error">
                    {error.message}
                </Typography>
            </Box>
        )
    }


    return (
        <Box px={{ xs: 2, sm: 4, md: 6 }} py={8} bgcolor="#f9f9f9">
            <Typography
                variant='h3'
                component='h3'
                mb={6}
                textAlign="center"
                fontWeight="bold"
                color="#333"
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
                {t("OurBrands")}
            </Typography>

            <Grid container spacing={6} justifyContent="center">
                {brands?.map((brand) => (
                    <Grid key={brand.id} item xs={12} sm={10} md={6}>
                        <Card
                            sx={{
                                boxShadow: 6,
                                borderRadius: 4,
                                overflow: 'hidden',
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': { transform: 'scale(1.05)', boxShadow: 8, cursor: 'pointer' },
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: '#fff',
                                textAlign: 'center',
                                minHeight: 250,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}
                        >
                            <CardMedia
                                component='img'
                                image={brand.mainImageUrl}
                                alt={brand.name}
                                sx={{ height: 200, objectFit: 'contain', bgcolor: '#fff', p: 3 }}
                            />

                            <CardContent>
                                <Typography variant="h5" fontWeight="bold" gutterBottom>
                                    {brand.name}
                                </Typography>

                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>

    )
}

export default Brand