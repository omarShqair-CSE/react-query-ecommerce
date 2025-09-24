import { useQuery } from "@tanstack/react-query"
import AxiosUserInstance from "../../API/AxiosUserInstans"
import { Box, Chip, CircularProgress, Typography } from "@mui/material";

function Categories() {

    const getCategories = async () => {
        const response = await AxiosUserInstance.get('/Categories')
        console.log(response);
        return response.data

    }

    const { data: categories, isLoading, error } = useQuery({
        queryKey: ['category'],
        queryFn: getCategories,
        staleTime: 5000
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
        <Box display="flex" gap={2} flexWrap="wrap" m={7} justifyContent="center">
            {categories?.map((cat) => (
                <Chip
                    key={cat.id}
                    label={cat.name}
                    sx={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        mx: 15,
                        px: 20,
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
    )
}

export default Categories