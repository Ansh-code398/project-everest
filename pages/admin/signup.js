import React, { useRef, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import LinkBody from 'next/link'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useRouter } from 'next/router';
import { VideoCard } from 'material-ui-player';


export default function SignUp(props) {
  const theme = createTheme();
  const email = useRef();
  const password = useRef();
  const profilePic = useRef();
  const bio = useRef();
  const name = useRef();
  const pin = useRef();
  const router = useRouter();
  const [wrongPin, setWrongPin] = React.useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (pin.current.value === process.env.NEXT_PUBLIC_PIN) {
      try {
        const data = await axios.post('https://linuix-app-api.vercel.app/api/auth/register', {
          email: email.current.value,
          password: password.current.value,
          photo_url: profilePic.current.value,
          bio: bio.current.value,
          username: name.current.value,
        });
        localStorage.setItem('user', JSON.stringify(data.data));
        props.setUser(data.data);
        router.push('/admin');
      }
      catch (err) {
        console.log(err);
      }
    }
    else {
      setWrongPin(
        true
      )
    }
  };
  useEffect(() => {
    if (localStorage.getItem('user') !== null) {
      router.push('/admin');
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
            Sign up
          </Typography>
          {!wrongPin ? <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  autoFocus
                  inputRef={name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  inputRef={email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  inputRef={password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="profile"
                  label="profile pic url"
                  type="url"
                  id="profile"
                  autoComplete="profile"
                  inputRef={profilePic}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  minRows={4}
                  maxRows={4}
                  name="bio"
                  label="Your Bio"
                  type="text"
                  id="bio"
                  autoComplete="bio"
                  inputRef={bio}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="pin"
                  label="Enter Staff Pin"
                  type="password"
                  id="pin"
                  inputRef={pin}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className='bg-blue-500 hover:bg-blue-900'
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link variant="body2">
                  <LinkBody href="/admin/signin">
                    Already have an account? Sign in
                  </LinkBody>
                </Link>
              </Grid>
            </Grid>
            
          </Box>
          : <Grid container justifyContent="flex-center">

              <Grid item>
                <Typography variant="h4" textAlign="center">
                  You Cheater! You're not a staff member! (►__◄) <br/>
                  Take This
                </Typography>
                </Grid>
              <Grid item>
                <VideoCard 
                src="/Rickroll.mp4"
                autoplay={true}
                />
              </Grid>
            </Grid>}
        </Box>
      </Container>
    </ThemeProvider>
  );
}