import React, { useRef, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LinkBody from 'next/link'
import axios from 'axios';
import { useRouter } from 'next/router'

const theme = createTheme();

export default function SignIn(props) {
  const email = useRef();
  const password = useRef();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await axios.post('https://linuix-app-api.vercel.app/api/auth/login', {
        email: email.current.value,
        password: password.current.value
      });
      localStorage.setItem('user', JSON.stringify(data.data));
      props.setUser(data.data);
      router.push('/admin');
    }
    catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      if (localStorage.getItem('user') !== null) {
        router.push('/admin');
      }
    }
    catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              inputRef={email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className='bg-blue-500 hover:bg-blue-900'
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link variant="body2">
                  <LinkBody href="/admin/signup">
                    {"Don't have an account? Sign Up"}
                  </LinkBody>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}