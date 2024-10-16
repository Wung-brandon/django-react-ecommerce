/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  styled, 
  Box,  
  Badge, 
  IconButton,
  Drawer,
  List,
  ListItem,
  Menu,
  MenuItem,

} from "@mui/material";
import { 
  Favorite, 
  ShoppingCart,
  Menu as MenuIcon,
  KeyboardArrowDown
} from "@mui/icons-material";
import LanguageSelect from "./LanguageSelect";
import { useState, useEffect } from "react";
import SearchBar from './SearchBar';
import logoImg from '../../src/assets/logo11-removebg-preview.png';
import { NavLink, Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

function Navbar() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [scrollPos, setScrollPos] = useState(0);
  const [anchorElMen, setAnchorElMen] = useState<null | HTMLElement>(null);
  const [anchorElWomen, setAnchorElWomen] = useState<null | HTMLElement>(null);
  const [anchorElChildren, setAnchorElChildren] = useState<null | HTMLElement>(null);
  const [anchorElAccessories, setAnchorElAccessories] = useState<null | HTMLElement>(null);

  const theme = useTheme();

  const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#550c18',
    padding: '1.5em',
    transition: 'background-color 0.3s ease',
    [theme.breakpoints.down('sm')]: {
      padding: '1em',
    },
  }));

  const Icons = styled(Box)(({ theme }) => ({
    display: "none",
    gap: "25px",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    }
  }));

  const NavLinkStyled = {
    textDecoration: 'none',
    color: '#e8e9eb',
    padding: '8px',
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: "#313638",
      color: "white",
    },
    '&.active': {
      borderBottom: '2px solid white',
    }
  };

  // Handle Dropdown Menus
  const handleMenuOpen = (setAnchorEl: Function) => (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (setAnchorEl: Function) => () => {
    setAnchorEl(null);
  };

  const [language, setLanguage] = useState<string>('English'); // Default language is English

  const handleChange = (event:any) => {
    setLanguage(event.target.value);
    console.log(`Selected language: ${event.target.value}`);
  };

  // Track scroll position and toggle search bar visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (currentScrollPos > scrollPos || currentScrollPos > 100) {
        setShowSearchBar(false);  // Hide search bar when scrolling down
      } else {
        setShowSearchBar(true);   // Show search bar when scrolling up or at the top
      }
      setScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollPos]);

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        {/* Logo */}
        <Box 
          display='flex' 
          justifyContent='space-between' 
          alignItems='center' 
          sx={{
            [theme.breakpoints.down('sm')]: {
              width: '100%', // Smaller logo size for small screens
            },
          }}
          
        >
          <img 
            src={logoImg} 
            alt="Brand Logo" 
            className="img-fluid" 
            style={{
              width: '130px', // Default size
              maxWidth: '100%', // Ensure responsiveness
              height: 'auto', // Maintain aspect ratio
              [theme.breakpoints.down('sm')]: {
                width: '50px', // Smaller logo size for small screens
              },
            }}
          />
          <IconButton color="inherit" aria-label="menu" sx={{ display: { xs: "block", sm: "none" } }} onClick={() => setOpenDrawer(true)}>
            <MenuIcon sx={{ fontSize: '2rem' }} />
          </IconButton>
        </Box>

        {/* Drawer for mobile view */}
        <Drawer
          anchor="right"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          PaperProps={{
            sx: { 
              width: 250, 
              backgroundColor: '#550c18',
              color: 'white',
              animation: openDrawer ? 'slideIn 0.3s' : 'slideOut 0.3s'
            }
          }}
        >
          <List sx={{ display: 'flex', cursor: 'pointer', flexDirection:'column' }}>
              <ListItem button>
                <NavLink to="/" style={NavLinkStyled}>
                  <Typography variant="h6" color="inherit">Home</Typography>
                </NavLink>
              </ListItem>

              <ListItem button>
                <NavLink to="/about" style={NavLinkStyled}>
                  <Typography variant="h6" color="inherit">About</Typography>
                </NavLink>
              </ListItem>

              {/* Men Dropdown */}
              <ListItem button onClick={handleMenuOpen(setAnchorElMen)}>
                <Box display="flex" alignItems="center">
                  <Typography variant="h6" color="inherit">
                    Men
                  </Typography>
                  <KeyboardArrowDown />
                </Box>
              </ListItem>
              <Menu
                anchorEl={anchorElMen}
                open={Boolean(anchorElMen)}
                onClose={handleMenuClose(setAnchorElMen)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                MenuListProps={{
                  sx: { backgroundColor: '#550c18', color: 'white', }
                }}
              >
                <MenuItem onClick={handleMenuClose(setAnchorElMen)} component={Link} to="/men/shirts">
                  Shirts
                </MenuItem>
                <MenuItem onClick={handleMenuClose(setAnchorElMen)} component={Link} to="/men/trousers">
                  Trousers
                </MenuItem>
              </Menu>

              {/* Women Dropdown */}
              <ListItem button onClick={handleMenuOpen(setAnchorElWomen)}>
                <Box display="flex" alignItems="center">
                  <Typography variant="h6" color="inherit">
                    Women
                  </Typography>
                  <KeyboardArrowDown />
                </Box>
              </ListItem>
              <Menu
                anchorEl={anchorElWomen}
                open={Boolean(anchorElWomen)}
                onClose={handleMenuClose(setAnchorElWomen)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                MenuListProps={{
                  sx: { backgroundColor: '#550c18', color: 'white' },
                }}
              >
                <MenuItem onClick={handleMenuClose(setAnchorElWomen)} component={Link} to="/women/dresses">
                  Dresses
                </MenuItem>
                <MenuItem onClick={handleMenuClose(setAnchorElWomen)} component={Link} to="/women/tops">
                  Tops
                </MenuItem>
              </Menu>

              {/* Children Dropdown */}
              <ListItem button onClick={handleMenuOpen(setAnchorElChildren)}>
                <Box display="flex" alignItems="center">
                  <Typography variant="h6" color="inherit">
                    Children
                  </Typography>
                  <KeyboardArrowDown />
                </Box>
              </ListItem>
              <Menu
                anchorEl={anchorElChildren}
                open={Boolean(anchorElChildren)}
                onClose={handleMenuClose(setAnchorElChildren)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                MenuListProps={{
                  sx: { backgroundColor: '#550c18', color: 'white' },
                }}
              >
                <MenuItem onClick={handleMenuClose(setAnchorElChildren)} component={Link} to="/children/shirts">
                  Shirts
                </MenuItem>
                <MenuItem onClick={handleMenuClose(setAnchorElChildren)} component={Link} to="/children/pants">
                  Pants
                </MenuItem>
              </Menu>

              {/* Accessories Dropdown */}
              <ListItem button onClick={handleMenuOpen(setAnchorElAccessories)}>
                <Box display="flex" alignItems="center">
                  <Typography variant="h6" color="inherit">
                    Accessories
                  </Typography>
                  <KeyboardArrowDown />
                </Box>
              </ListItem>
              <Menu
                anchorEl={anchorElAccessories}
                open={Boolean(anchorElAccessories)}
                onClose={handleMenuClose(setAnchorElAccessories)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                MenuListProps={{
                  sx: { backgroundColor: '#550c18', color: 'white' },
                }}
              >
                <MenuItem onClick={handleMenuClose(setAnchorElAccessories)} component={Link} to="/accessories/belts">
                  Belts
                </MenuItem>
                <MenuItem onClick={handleMenuClose(setAnchorElAccessories)} component={Link} to="/accessories/hats">
                  Hats
                </MenuItem>
              </Menu>
            {/* Add your drawer list items here */}
          </List>
        </Drawer>

        {/* Main navigation for larger screens */}
        
        <Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' }, flex: 1 }}>
            <List sx={{ display: 'flex', cursor: 'pointer' }}>
              <ListItem button>
                <NavLink to="/" style={NavLinkStyled}>
                  <Typography variant="h6" color="inherit">Home</Typography>
                </NavLink>
              </ListItem>
              <ListItem button>
                <NavLink to="/about" style={NavLinkStyled}>
                  <Typography variant="h6" color="inherit">About</Typography>
                </NavLink>
              </ListItem>

              {/* Men Dropdown */}
              <ListItem button onClick={handleMenuOpen(setAnchorElMen)}>
                <Box display="flex" alignItems="center">
                  <Typography variant="h6" color="inherit">
                    Men
                  </Typography>
                  <KeyboardArrowDown />
                </Box>
              </ListItem>
              <Menu
                anchorEl={anchorElMen}
                open={Boolean(anchorElMen)}
                onClose={handleMenuClose(setAnchorElMen)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                MenuListProps={{
                  sx: { backgroundColor: '#550c18', color: 'white' },
                }}
              >
                <MenuItem onClick={handleMenuClose(setAnchorElMen)} component={Link} to="/men/shirts">
                  Shirts
                </MenuItem>
                <MenuItem onClick={handleMenuClose(setAnchorElMen)} component={Link} to="/men/trousers">
                  Trousers
                </MenuItem>
              </Menu>

              {/* Women Dropdown */}
              <ListItem button onClick={handleMenuOpen(setAnchorElWomen)}>
                <Box display="flex" alignItems="center">
                  <Typography variant="h6" color="inherit">
                    Women
                  </Typography>
                  <KeyboardArrowDown />
                </Box>
              </ListItem>
              <Menu
                anchorEl={anchorElWomen}
                open={Boolean(anchorElWomen)}
                onClose={handleMenuClose(setAnchorElWomen)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                MenuListProps={{
                  sx: { backgroundColor: '#550c18', color: 'white' },
                }}
              >
                <MenuItem onClick={handleMenuClose(setAnchorElWomen)} component={Link} to="/women/dresses">
                  Dresses
                </MenuItem>
                <MenuItem onClick={handleMenuClose(setAnchorElWomen)} component={Link} to="/women/tops">
                  Tops
                </MenuItem>
              </Menu>

              {/* Children Dropdown */}
              <ListItem button onClick={handleMenuOpen(setAnchorElChildren)}>
                <Box display="flex" alignItems="center">
                  <Typography variant="h6" color="inherit">
                    Children
                  </Typography>
                  <KeyboardArrowDown />
                </Box>
              </ListItem>
              <Menu
                anchorEl={anchorElChildren}
                open={Boolean(anchorElChildren)}
                onClose={handleMenuClose(setAnchorElChildren)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                MenuListProps={{
                  sx: { backgroundColor: '#550c18', color: 'white' },
                }}
              >
                <MenuItem onClick={handleMenuClose(setAnchorElChildren)} component={Link} to="/children/shirts">
                  Shirts
                </MenuItem>
                <MenuItem onClick={handleMenuClose(setAnchorElChildren)} component={Link} to="/children/pants">
                  Pants
                </MenuItem>
              </Menu>

              {/* Accessories Dropdown */}
              <ListItem button onClick={handleMenuOpen(setAnchorElAccessories)}>
                <Box display="flex" alignItems="center">
                  <Typography variant="h6" color="inherit">
                    Accessories
                  </Typography>
                  <KeyboardArrowDown />
                </Box>
              </ListItem>
              <Menu
                anchorEl={anchorElAccessories}
                open={Boolean(anchorElAccessories)}
                onClose={handleMenuClose(setAnchorElAccessories)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                MenuListProps={{
                  sx: { backgroundColor: '#550c18', color: 'white' },
                }}
              >
                <MenuItem onClick={handleMenuClose(setAnchorElAccessories)} component={Link} to="/accessories/belts">
                  Belts
                </MenuItem>
                <MenuItem onClick={handleMenuClose(setAnchorElAccessories)} component={Link} to="/accessories/hats">
                  Hats
                </MenuItem>
              </Menu>

            </List>
          </Box>
           {/* Search Bar */}
           <Box 
            sx={{ 
              flex: 1, 
              display: { xs: 'none', sm: showSearchBar ? 'block' : 'none' }, 
              mx: 2, 
              transition: 'all 0.5s ease'  // Smooth transition
            }}
          >
            <SearchBar 
              placeholder="Search for products..."
              // onSearch={handleSearch}
            />
          </Box>
        </Box>

        

        {/* Icons */}
        <Icons>
          <LanguageSelect language={language} handleChange={handleChange} />
        
          <Link to='/cart' style={{
            textDecoration:'none',
            color:'white'
          }}>
            <Badge badgeContent={4} color="error"> 
              <Favorite />
            </Badge>
          </Link>

          <Link to='/favorite' style={{
            textDecoration:'none',
            color:'white'
          }}>
            <Badge badgeContent={2} color="error">
              <ShoppingCart />
            </Badge>
          </Link>
          
          <Link to='/login' className="loginStyle" style={{
            textDecoration: 'none',
            padding: '8px',
            borderRadius: '5px',
            backgroundColor: '#f44336',
            color: 'white',
            fontSize: '1.2rem',
            // '&:hover': {
            //   backgroundColor: "#ef6461",
            //   color: "white",
            //   transition: "0.3s all ease"
            // }
          }}>
            Login
          </Link>
          <Link to='/signup' style={{
            textDecoration: 'none',
            padding: '8px',
            borderRadius: '5px',
            color: 'white',
            border: "1px solid #e8e9eb",
            fontSize: '1.2rem',
            // '&:hover': {
            //   backgroundColor: "#313638",
            //   color: "white",
            //   border: "none",
            //   transition: "0.3s all ease"
            // },
          }}>
            Sign Up
          </Link>
        </Icons>
      </StyledToolbar>
    </AppBar>
  );
}

export default Navbar;
