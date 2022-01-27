import React, { useRef, useEffect, useState } from 'react';
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


export default function EditPost(props) {
    const theme = createTheme();
    const title = useRef();
    const exerpt = useRef();
    const description = useRef();
    const featuredImage = useRef();
    const categories = useRef();
    const code = useRef();
    const software_website = useRef();
    const [cat, setCat] = useState()
    const router = useRouter();
    const downloadLink = useRef();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await axios.put(`https://linuix-app-api.vercel.app/api/softwares/${props.software._id}`, {
                title: title.current.value,
                exerpt: exerpt.current.value,
                desc: description.current.value,
                featuredImage: {
                    url: featuredImage.current.value
                },
                email: props.user.email,
                author: {
                    name: props.user.username,
                    bio: props.user.bio,
                    photo:{
                        url: props.user.photo_url
                    },
                    email: props.user.email
                },
                categories: cat,
                code: code.current.value,
                software_website: software_website.current.value,
                downloadLink: downloadLink.current.value
            });
            props.setEdit(false);
                router.push(`/applications/${data.data.slug}`);
        }
        catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (props.software) {
            title.current.value = props.software.title;
            exerpt.current.value = props.software.exerpt;
            description.current.value = props.software.desc;
            featuredImage.current.value = props.software.featuredImage.url;
            categories.current.value = props.software.categories.join(',');
            code.current.value = props.software.code;
            software_website.current.value = props.software.software_website;
            downloadLink.current.value = props.software.downloadLink;
        }
    }, [props.software]);
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
                        Edit This Post
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
                                    name="downloadLink"
                                    label="Download Link"
                                    placeholder='https://asia.mirror.pkgbuild.com/community/os/x86_64/obs-studio-27.1.3-3-x86_64.pkg.tar.zst'
                                    type="text"
                                    id="downloadLink"
                                    autoComplete="downloadLink"
                                    inputRef={downloadLink}
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
                            Edit
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}