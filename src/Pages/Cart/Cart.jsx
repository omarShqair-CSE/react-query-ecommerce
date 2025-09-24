import {
    CircularProgress, Box, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Typography, Button
} from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Bounce, toast } from 'react-toastify'
import { Add } from '@mui/icons-material'
import AxiosUserInstance from '../../API/AxiosUserInstans'

function Cart() {

    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const incrementQty = async (id, name) => {
        const response = await AxiosUserInstance.post(`/Carts/increment/${id}`)
        if (response.status === 200) {
            toast.success("incrementSuccess", { name }, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                transition: Bounce,
            })
            getProduct()
        }
    }

    const clearCart = async () => {
        const token = localStorage.getItem('userToken')
        const response = await axios.delete('https://kashop1.runasp.net/api/Customer/Carts/clear', {
            headers: { Authorization: `Bearer ${token}` }
        })
        if (response.status === 200) {
            toast.error("cartCleared"), {
                position: "top-right",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            }
            getProduct()
        }
    }

    const removeItem = async (id) => {
        try {
            const token = localStorage.getItem('userToken')
            const response = await axios.delete(`https://kashop1.runasp.net/api/Customer/Carts/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (response.status === 200) {
                toast.warn("productDeleted", {
                    position: "top-right",
                    autoClose: 5000,
                    theme: "light",
                    transition: Bounce,
                })
            }
        } catch (error) {
            console.log(error)
        }
        getProduct()
    }

    const getProduct = async () => {
        try {
            const token = localStorage.getItem("userToken")
            const response = await axios.get('https://kashop1.runasp.net/api/Customer/Carts', {
                headers: { Authorization: `Bearer ${token}` }
            })
            setProducts(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => { getProduct() }, [])

    if (isLoading) return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
            <CircularProgress size={60} />
        </Box>
    )

    return (
        <Box px={{ xs: 2, sm: 4, md: 8 }} py={6} bgcolor="#f9f9f9">
            <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
                🛒 yourCart
            </Typography>

            <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 7 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#1976d2' }}>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>productId"</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>productName"</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>price"</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>quantity"</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>total"</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>action"</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {products.items.map((item) => (
                            <TableRow key={item.id}
                                sx={{ '&:hover': { backgroundColor: '#f1f1f1' }, transition: '0.3s' }}>
                                <TableCell>{item.productId}</TableCell>
                                <TableCell sx={{ fontWeight: '500' }}>{item.productName}</TableCell>
                                <TableCell sx={{ color: 'green', fontWeight: 'bold' }}>${item.price}</TableCell>
                                <TableCell>
                                    {item.count}
                                    <Button onClick={() => incrementQty(item.productId, item.productName)}>
                                        <Add color='error' />
                                    </Button>
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>{item.totalPrice}</TableCell>
                                <TableCell>
                                    <Button sx={{ mx: 1 }} variant="outlined" color="error"
                                        onClick={() => removeItem(item.productId)}>
                                        delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell colSpan={5} sx={{ textAlign: 'right', fontWeight: 'bold' }}>
                                <Typography variant="h6" sx={{ display: 'inline' }}>
                                    total: ${(products.cartTotal).toFixed(2)}
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ textAlign: 'right' }}>
                                <Button variant="contained" color="error" onClick={clearCart}>
                                    clearAll
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default Cart