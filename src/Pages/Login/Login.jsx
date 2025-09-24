import { Box, Button, CircularProgress, Container, InputAdornment, TextField, Typography } from "@mui/material";
import axios from "axios"
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

function Login() {
  const { setIsLoggedIn } = useContext(AuthContext);

  const { register, handleSubmit } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const loginFun = async (formData) => {
    try {
      setIsLoading(true)
      const response = await axios.post('https://kashop1.runasp.net/api/Identity/Account/Login', formData)
      //  console.log(response);
      if (response.status == 200) {
        navigate('/')
        // console.log(response.data);
        localStorage.setItem("userToken", response.data.token)
        setIsLoggedIn(true);
      }
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setIsLoading(false)
    }

  }

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
            Login page
          </Typography>


          <Box
            component="form"
            onSubmit={handleSubmit(loginFun)}
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <TextField
              {...register("email")}
              label="Email"
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
              {...register("password")}
              label="Password"
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
              {isLoading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Login"}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Login