import {
    CircularProgress, Box, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Typography, Button
} from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Bounce, toast } from 'react-toastify'
import { Add } from '@mui/icons-material'
import AxiosUserInstance from '../../API/AxiosUserInstans'
import { useTranslation } from 'react-i18next'

function Cart() {
    const { t } = useTranslation()
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const incrementQty = async (id, name) => {
        const response = await AxiosUserInstance.post(`/Carts/increment/${id}`)
        if (response.status === 200) {
            toast.success(`${t("incrementSuccess")}, ${name}`, {
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
            toast.error(t("cartCleared"), {
                position: "top-right",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            })
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
                toast.warn(t("productDeleted"), {
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
                🛒 {t("yourCart")}
            </Typography>

            <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 7 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ background: 'linear-gradient(135deg, #3559FDFF 0%, #812CD6FF 100%)', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t("productId")}</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t("productName")}</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t("price")}</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t("quantity")}</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t("total")}</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t("action")}</TableCell>
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
                                        {t("delete")}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell colSpan={5} sx={{ textAlign: 'right', fontWeight: 'bold' }}>
                                <Typography variant="h6" sx={{ display: 'inline' }}>
                                    {t("total")}: ${(products.cartTotal).toFixed(2)}
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ textAlign: 'right' }}>
                                <Button variant="contained" color="error" onClick={clearCart}>
                                    {t("clearAll")}
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