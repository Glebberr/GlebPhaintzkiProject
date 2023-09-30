import { useState, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useResolvedPath } from 'react-router-dom';
import CakeIcon from '@mui/icons-material/Cake';
import { GeneralContext } from '../App';
import { RoleTypes, checkPermissions, pages, settings } from './Navbar-config';
import Searchbar from './Searchbar';
import CustomizedSwitch from './CustomizedSwitch';




export default function Navbar() {
    const { user, roleType, setUser, setRoleType, setLoader, navigate, darkMode } = useContext(GeneralContext);
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const path = useResolvedPath().pathname;


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logout = () => {
        setLoader(true);
        fetch(`https://api.shipap.co.il/clients/logout`, {
            credentials: 'include',
        })
            .then(() => {
                setUser();
                setRoleType(RoleTypes.none);
                navigate('/');
            })
            .catch(err => console.log(err))
            .finally(() => setLoader(false))
        handleCloseUserMenu();
    }


    return (
        <AppBar position="static" style={{ backgroundColor: darkMode ? '	#282828' : '#E76B90' }}>
            <Container maxWidth="xxl">
                <Toolbar disableGutters>
                    <CakeIcon sx={{ display: { xs: 'none', md: 'flex' }, fontSize: '55px', marginBottom: '6px' }} />
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Typography
                            variant="h5"
                            component="a"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'Pacifico',
                                fontWeight: 400,
                                letterSpacing: '.2.5rem',
                                color: 'white',
                                textDecoration: 'none',
                            }}
                        >
                            Sugar&Spice
                        </Typography>
                    </Link>
                    {/* Hamburger */}

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none', lg: 'none' },
                            }}
                        >
                            {pages.filter(p => !p.permissions || checkPermissions(p.permissions, roleType)).map((page) => (
                                <Link to={page.route} key={page.route} style={{ textDecoration: 'none', color: '#E76B90' }}>
                                    <MenuItem key={page.route} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center" sx={{
                                            fontFamily: 'Dancing Script',
                                            fontSize: '1.5rem'
                                        }}>{page.title}</Typography>
                                    </MenuItem>
                                </Link>
                            ))}
                        </Menu>
                    </Box>

                    <Typography
                        variant="h5"
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'Pacifico',
                            fontWeight: 400,
                            letterSpacing: '.2.5rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Sugar&Spice
                    </Typography>
                    <Box sx={{
                        flexGrow: 1, display: {
                            xs: 'none', md:
                                'flex'
                        }
                    }}>
                        {pages.filter(p => !p.permissions || checkPermissions(p.permissions, roleType)).map((page) => (
                            <Link to={page.route} key={page.route} style={{ textDecoration: 'none', color: 'white' }}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    variant={page.route === path ? 'cotained' : ''}

                                    sx={{
                                        my: 2,
                                        color: 'white',
                                        display: 'block',
                                        fontFamily: 'Dancing Script',
                                        fontWeight: 600,
                                        fontSize: '14px',
                                        backgroundColor: page.route === path ? '#eb4476' : ''

                                    }}
                                >
                                    {page.title}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    < Searchbar />
                    < CustomizedSwitch />
                    {
                        user &&
                        <Box sx={{ flexGrow: 0, }}>

                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <Link to={setting.route} key={setting.route} style={{ textDecoration: 'none', color: 'black' }}>
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">{setting.title}</Typography>
                                        </MenuItem>
                                    </Link>
                                ))}

                                <MenuItem onClick={logout}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}
