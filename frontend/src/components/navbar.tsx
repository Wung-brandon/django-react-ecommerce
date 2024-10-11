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
} from "@mui/material";
import { 
  Favorite, 
  ShoppingCart,
  Menu as MenuIcon
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import SearchBar from './SearchBar';
import logoImg from '../../src/assets/logo11-removebg-preview.png';
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(true); // Track the search bar visibility
  const [scrollPos, setScrollPos] = useState(0); // Track the scroll position

  const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    backgroundColor: '#550c18',
    justifyContent: 'space-between',
    padding: '1.5em',
    transition: 'background-color 0.3s ease',
  });

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

  // Handle Search Query
  const handleSearch = (query: string) => {
    console.log(`Searching for: ${query}`);
  };

  // Navigation Links
  const allLinks = [
    { id: 1, textLink: 'Home', link: '/' },
    { id: 2, textLink: 'About', link: '/about' },
    { id: 3, textLink: 'Men', link: '/men' },
    { id: 4, textLink: 'Women', link: '/women' },
    { id: 5, textLink: 'Children', link: '/children' },
    { id: 6, textLink: 'Accessories', link: '/watches' },
    { id: 7, textLink: 'Contact', link: '/contact' },
  ];

  // Track scroll position and toggle search bar visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      console.log('scroll position: ', currentScrollPos)
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
        {/* Brand Name */}
        <img src={logoImg} className="img-fluid" width='130px' alt="Brand Logo" />

        {/* Drawer for mobile */}
        <IconButton 
          edge="end" 
          color="inherit" 
          aria-label="menu" 
          sx={{ display: { xs: "block", sm: "none" } }} 
          onClick={() => setOpenDrawer(true)}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          anchor="right"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
        >
          <Box sx={{ width: 250 }}>
            <List>
              {allLinks.map((text) => (
                <ListItem button key={text.id}>
                  <NavLink 
                    to={text.link} 
                    style={NavLinkStyled}
                  >
                    <Typography variant='h6'>{text.textLink}</Typography>
                  </NavLink>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        {/* Main navigation for larger screens */}
        <Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' }, flex: 1 }}>
            <List sx={{ display: 'flex', cursor: 'pointer' }}>
              {allLinks.map((text) => (
                <ListItem button key={text.id} component='li'>
                  <NavLink 
                    to={text.link} 
                    style={NavLinkStyled}
                    activeClassName="active"
                  >
                    <Typography variant='h6'>{text.textLink}</Typography>
                  </NavLink>
                </ListItem>
              ))}
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
              onSearch={handleSearch}
            />
          </Box>
        </Box>

        {/* Icons */}
        <Icons>
          <Badge badgeContent={4} color="error">
            <ShoppingCart sx={{ fontSize: '2rem', cursor: 'pointer' }} />
          </Badge>
          <Badge badgeContent={2} color="error">
            <Favorite sx={{ fontSize: '2rem', cursor: 'pointer' }} />
          </Badge>
          <Link to='/login' className="loginStyle" style={{
            textDecoration: 'none',
            padding: '8px',
            borderRadius: '5px',
            backgroundColor: '#f44336',
            color: 'white',
            fontSize: '1.2rem',
            '&:hover': {
              backgroundColor: "#ef6461",
              color: "white",
              transition: "0.3s all ease"
            }
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
            '&:hover': {
              backgroundColor: "#313638",
              color: "white",
              border: "none",
              transition: "0.3s all ease"
            },
          }}>
            Sign Up
          </Link>
        </Icons>
      </StyledToolbar>
    </AppBar>
  );
}

export default Navbar;
