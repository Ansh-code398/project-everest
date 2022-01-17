import React, { useRef, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useRouter } from 'next/router';



export default function CreatePost(props) {
    const theme = createTheme();
    const title = useRef();
    const exerpt = useRef();
    const description = useRef();
    const featuredImage = useRef();
    const slug = useRef();
    const categories = useRef();
    const code = useRef();
    const software_website = useRef();

    const router = useRouter();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const cats = categories.current.value.split(',');
            const data = await axios.post('https://linuix-app-api.vercel.app/api/softwares/', {
                title: title.current.value,
                exerpt: exerpt.current.value,
                desc: description.current.value,
                featuredImage: {
                    url: featuredImage.current.value
                },
                slug: slug.current.value,
                categories: cats,
                code: code.current.value,
                author:{
                    photo: {url: props.user.photo_url},
                    name: props.user.username,
                    bio: props.user.bio,
                    email: props.user.email
                },
                software_website: software_website.current.value
            });
            cats.forEach(async (cat) => {
                await axios.post('https://linuix-app-api.vercel.app/api/categories/', {
                    name: cat,
                    slug: cat.replace(/\s+/g, '')
                });
            });
            router.push(`/applications/${data.data.slug}`);
        }
        catch (err) {
            console.log(err);
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
                        <AddIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Create a new post
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="title"
                                    required
                                    fullWidth
                                    id="title"
                                    label="Title"
                                    autoFocus
                                    inputRef={title}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="exerpt"
                                    label="Small Description"
                                    name="exerpt"
                                    inputRef={exerpt}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="description"
                                    label="Description"
                                    type="text"
                                    multiline
                                    minRows={5}
                                    maxRows={5}
                                    id="description"
                                    inputRef={description}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="featured-image"
                                    label="Featured Image Url"
                                    type="url"
                                    id="feature-image"
                                    autoComplete="profile"
                                    inputRef={featuredImage}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="slug"
                                    label="Software Slug"
                                    placeholder='obs-studio'
                                    type="text"
                                    id="slug"
                                    autoComplete="slug"
                                    inputRef={slug}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="code"
                                    label="Code To Install"
                                    placeholder='sudo pacman install obs-studio'
                                    type="text"
                                    id="code"
                                    autoComplete="code"
                                    inputRef={code}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="categories"
                                    label="Categories"
                                    placeholder='obs, studio, streaming'
                                    type="text"
                                    id="category"
                                    autoComplete="slug"
                                    inputRef={categories}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="software_website"
                                    label="Software Website"
                                    placeholder='https://obsproject.com'
                                    type="text"
                                    id="software_website"
                                    autoComplete="software_website"
                                    inputRef={software_website}
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
                            Create
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}