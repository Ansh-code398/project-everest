import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import { Autocomplete, Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useRouter } from 'next/router';
import axios from 'axios';
import { TextField } from '@mui/material';
import Link from 'next/link';
import { Progress } from './Bar';

const Search = styled(Autocomplete)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  color: "white",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },

  minWidth: "30%"
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(TextField)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Navbar({ user, setUser, isAnimating }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchData, setSearchData] = React.useState([]);
  const [searchUrl, setSearchUrl] = React.useState('');
  React.useEffect(() => {
    localStorage.getItem('user') && setUser(JSON.parse(localStorage.getItem('user')));

  }, [])
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  function signOut() {
    localStorage.removeItem('user');
    setUser(null);
    if (router.asPath === '/admin') {
      router.push('/admin/signin');
    }
  }
  const menuId = 'primary-search-account-menu';

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {user ? <MenuItem>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Avatar src={user.photo_url} onClick={signOut} />
        </IconButton>
        <p>Sign Out</p>
      </MenuItem> :
        <Link href='/admin/signin'><Button variant="primary"> Sign In </Button></Link>}
    </Menu>
  );

  const router = useRouter();

  React.useEffect(() => {
    const data = axios.get("https://linuix-app-api.vercel.app/api/softwares").then(res => {
      setSearchData(res.data);
    });
  }, []);


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{ background: '#0a1946' }}>
      <Progress isAnimating={isAnimating} />
        <Toolbar>
          <Link href='/'>
            <Button
              edge="start"
              color="inherit"
              aria-label="open drawer"
            >
              <Avatar src="https://media.discordapp.net/attachments/890475885470285864/920662213293924412/calinix.jpg" />
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' }, marginLeft: '0.5rem' }}
              >
                Everest
              </Typography>
            </Button>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          {searchData && <Search
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={searchData.map((item) => item.title)}
            onChange={async (event, value) => {
              try {
                const url = await searchData.filter(item => item.title === value)[0].slug;
                router.push(`/applications/${url}`);
              }
              catch (err) {
                return;
              }
            }}
            placeholder='Search...'
            className="bg-white"
            style={{
              backgroundColor: '#fff'
            }}
            renderInput={(params) => (
              <StyledInputBase
                {...params}
                label="Search"
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
              />
            )}
          >   <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
          </Search>}

          {router.asPath.includes("/admin") && <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {user ? <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {router.asPath.includes("/admin") && <Avatar onClick={signOut} src={user.photo_url} />}
            </IconButton> : <Link href='/admin/signin'><Button variant="primary"> Sign In </Button></Link>}
          </Box>}
          {router.asPath.includes("/admin") && <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>}
        </Toolbar>
      </AppBar>
      {router.isReady && router.asPath.includes("/admin") && renderMobileMenu}

    </Box>
  );
}