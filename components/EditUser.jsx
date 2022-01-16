import React, { useRef, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useRouter } from 'next/router';



export default function EditUser(props) {
    const theme = createTheme();
    const username = useRef();
    const bio = useRef();
    const password = useRef();
    const photo_url = useRef();

    const router = useRouter();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const user = localStorage.getItem('user');
            const data = await axios.put(`https://linuix-app-api.vercel.app/api/users/${user._id}`, {
                userId: user._id,
                username: username.current.value,
                bio: bio.current.value,
                password: password.current.value,
                photo_url: photo_url.current.value
            });
            localStorage.setItem('user', data.data);
            router.push('/admin');
        }
        catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user !== null) {
            username.current.value = JSON.parse(user).username;
            bio.current.value = JSON.parse(user).bio;
            photo_url.current.value = JSON.parse(user).photo_url;
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
                        <EditIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Update User
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="Name"
                                    required
                                    fullWidth
                                    id="Name"
                                    label="Name"
                                    autoFocus
                                    inputRef={username}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    placeholder='Password'
                                    type="password"
                                    id="password"
                                    autoComplete="password"
                                    inputRef={password}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    multiline
                                    maxRows={5}
                                    minRows={5}
                                    fullWidth
                                    id="Bio"
                                    label="Bio"
                                    name="Bio"
                                    inputRef={bio}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="ProfilePicture"
                                    label="Profile Picture"
                                    type="url"
                                    id="ProfilePicture"
                                    autoComplete="profile"
                                    inputRef={photo_url}
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
                            Edit user
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mb: 2 }}
                            className='bg-red-500 hover:bg-red-900'
                            onClick={async () => {
                                try {
                                    const confirm = window.confirm('Are you sure you want to delete this user?');
                                    if (confirm) {
                                        await axios.delete(`https://linuix-app-api.vercel.app/api/users/${JSON.parse(localStorage.getItem('user'))._id}`, {
                                            data: {
                                                userId: JSON.parse(localStorage.getItem('user'))._id
                                            }
                                        });
                                        localStorage.removeItem('user');
                                        props.setUser(null);
                                        router.push('/');

                                    } else {
                                        return
                                    }
                                }
                                catch (err) {
                                    console.log(err);
                                }
                            }}
                        >
                            Delete user
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}