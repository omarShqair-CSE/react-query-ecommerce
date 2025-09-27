import { useQuery } from "@tanstack/react-query"
import AxiosUserInstance from "../../API/AxiosUserInstans"
import { Box, Chip, CircularProgress, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

function Categories() {
    const { t } = useTranslation()
    const getCategories = async () => {
        const response = await AxiosUserInstance.get('/Categories')
        console.log(response);
        return response.data

    }

    const { data: categories, isLoading, error } = useQuery({
        queryKey: ['category'],
        queryFn: getCategories,
        staleTime: 1000 * 60 * 5
    })

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress size={60} />
            </Box>
        )
    }

    if (error) {
        return (
            <Box textAlign="center" mt={10}>
                <Typography variant="h6" color="error">
                    {error.message}
                </Typography>
            </Box>
        )
    }
    return (
        <Box display="flex" flexDirection='column' alignItems='center' gap={2} sx={{ p: 3 }}>
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
                {t("ourCategories")}
            </Typography>
            <Box display='flex' gap={1}>
                {categories?.map((cat) => (
                    <Chip
                        key={cat.id}
                        label={cat.name}
                        sx={{
                            fontSize: 30,
                            fontWeight: 'bold',
                            mx: 15,
                            px: 15,
                            py: 10,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: '#fff',
                            cursor: 'pointer',
                            transition: 'transform 0.3s',
                            '&:hover': {
                                transform: 'scale(1.1)',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                                color: 'yellowgreen'
                            }
                        }}
                    />
                ))}
            </Box>
        </Box>
    )
}

export default Categories