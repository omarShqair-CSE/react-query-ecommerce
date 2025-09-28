import {
    Box,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    FormLabel,
    Snackbar,
    Alert
} from '@mui/material'

import { useQuery } from '@tanstack/react-query'
import AxiosUserInstance from '../../API/AxiosUserInstans'
import { Controller, useForm } from 'react-hook-form'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

function Checkout() {
    const { t } = useTranslation()
    const [showCashMessage, setShowCashMessage] = useState(false)

    const { register, handleSubmit, control } = useForm({})

    const onSubmit = async (formData) => {
        console.log("from onSubmit", formData)
        if (formData.paymentMethod == 'Cash') {
            setShowCashMessage(true)
            return
        }
        const response = await AxiosUserInstance.post('/checkOut/payment', {
            paymentMethod: formData.paymentMethod
        })
        console.log('response', response);


        if (response.status === 200) {
            console.log(response);
            location.href = response.data.url
        }
    }

    // const [paymentMethod, setPaymentMethod] = useState('cash')

    const fetchData = async () => {
        const response = await AxiosUserInstance.get('carts')
        // console.log(response.data);
        return response.data
    }

    const { isLoading, data, isError, error } = useQuery({
        queryKey: ['cartItem'],
        queryFn: fetchData,
        staleTime: 1000 * 5 * 60
    })

    const cartItems = data?.items
    const cartTotal = data?.cartTotal

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
        <Box px={{ xs: 2, sm: 4, md: 8 }} py={6}>
            <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
                {t("checkout")}
            </Typography>

            <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 7 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ background: '#3559FD', color: 'white' }}>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t("productId")}</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t("productName")}</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t("price")}</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t("quantity")}</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t("total")}</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t("action")}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cartItems.map(item => (
                            <TableRow key={item.productId} sx={{ '&:hover': { backgroundColor: '#f1f1f1' } }}>
                                <TableCell>{item.productId}</TableCell>
                                <TableCell sx={{ fontWeight: '500' }}>{item.productName}</TableCell>
                                <TableCell>${item.price}</TableCell>
                                <TableCell>{item.count}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>${item.totalPrice}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell colSpan={4} sx={{ fontWeight: 'bold', textAlign: 'right' }}>
                                {t("total")}:
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>${cartTotal}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 5 }}
            >

                <Controller
                    control={control}
                    name="paymentMethod"
                    defaultValue="Cash"
                    render={({ field }) => (
                        <Box>
                            <FormLabel>{t("paymentMethod")}</FormLabel>
                            <RadioGroup {...field}>
                                <FormControlLabel value="Cash" control={<Radio />} label={t("cash")} disabled={showCashMessage} />
                                <FormControlLabel value="Visa" control={<Radio />} label={t("visa")} disabled={showCashMessage} />
                            </RadioGroup>
                        </Box>
                    )}
                />


                <Button type='submit' variant='contained' size='large' disabled={showCashMessage}>{t("submit")}</Button>
            </Box>
            <Snackbar
                open={showCashMessage}
                autoHideDuration={5000}
                onClose={() => setShowCashMessage(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setShowCashMessage(false)} severity="info" sx={{ width: '100%' }}>
                    {t("pleaseVisitShowroom")}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default Checkout
