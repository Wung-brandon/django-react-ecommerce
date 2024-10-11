import { Box, Grid, Typography, Divider } from "@mui/material";
import { WhatsApp, GitHub, LinkedIn } from "@mui/icons-material";
import { Link } from "react-router-dom";

function Footer() {
  
  return (
    <Box
      sx={{
        backgroundColor: "#080808",
        color: "#e8e9eb",
        padding: "2rem",
        width: "100%",
        marginTop: "auto",
      }}
    >
      <Grid container spacing={3} justifyContent="center">
        
        {/* About Us */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" textTransform="uppercase" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body2" sx={{ color: "#b0b0b0", letterSpacing:'1px', lineHeight:'25px' }}>
            Branvenia Luxe is a premium fashion brand offering exclusive clothing
            and accessories for men, women, and children. We stand for quality and
            luxury at affordable prices.
          </Typography>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} md={2}>
          <Typography variant="h6" textTransform="uppercase" gutterBottom>
            Quick Links
          </Typography>
          <Box component="ul" sx={{ listStyle: "none", padding: 0 }}>
            <Typography component="li" padding='5px 0'>
              <Link to="/" style={{ color: "#e8e9eb", textDecoration: "none" }}>
                Home
              </Link>
            </Typography>
            <Typography component="li" padding='5px 0'>
              <Link to="/about" style={{ color: "#e8e9eb", textDecoration: "none" }}>
                About Us
              </Link>
            </Typography>
            <Typography component="li" padding='5px 0'>
              <Link to="/about" style={{ color: "#e8e9eb", textDecoration: "none" }}>
                Contact Us
              </Link>
            </Typography>
            <Typography component="li" padding='5px 0'>
              <Link to="/privacy" style={{ color: "#e8e9eb", textDecoration: "none" }}>
                Privacy Policy
              </Link>
            </Typography>
            <Typography component="li" padding='5px 0'>
              <Link to="/terms" style={{ color: "#e8e9eb", textDecoration: "none" }}>
                Terms & Conditions
              </Link>
            </Typography>
            <Typography component="li">
              <Link to="/faq" style={{ color: "#e8e9eb", textDecoration: "none" }}>
                FAQ
              </Link>
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={2}>
          <Typography variant="h6" textTransform="uppercase" gutterBottom>
            My Account
          </Typography>
          <Box component="ul" sx={{ listStyle: "none", padding: 0 }}>
            <Typography component="li" padding='5px 0'>
              <Link to="/login" style={{ color: "#e8e9eb", textDecoration: "none" }}>
                Login
              </Link>
            </Typography>
            <Typography component="li" padding='5px 0'>
              <Link to="/signup" style={{ color: "#e8e9eb", textDecoration: "none" }}>
                Signup
              </Link>
            </Typography>
            <Typography component="li" padding='5px 0'>
              <Link to="/about" style={{ color: "#e8e9eb", textDecoration: "none" }}>
                View Cart
              </Link>
            </Typography>
            <Typography component="li" padding='5px 0'>
              <Link to="/privacy" style={{ color: "#e8e9eb", textDecoration: "none" }}>
                View Wishlist
              </Link>
            </Typography>
            <Typography component="li" padding='5px 0'>
              <Link to="/terms" style={{ color: "#e8e9eb", textDecoration: "none" }}>
                Order History
              </Link>
            </Typography>
          </Box>
        </Grid>

        {/* Shop */}
        <Grid item xs={12} md={2}>
          <Typography variant="h6" textTransform="uppercase" gutterBottom>
            Shop
          </Typography>
          <Box component="ul" sx={{ listStyle: "none", padding: 0 }}>
            <Typography component="li" padding='5px 0'>
              <Link to="/shop/men" style={{ color: "#e8e9eb", textDecoration: "none" }}>
                Men
              </Link>
            </Typography>
            <Typography component="li" padding='5px 0'>
              <Link to="/shop/women" style={{ color: "#e8e9eb", textDecoration: "none" }}>
                Women
              </Link>
            </Typography>
            <Typography component="li" padding='5px 0'>
              <Link to="/shop/kids" style={{ color: "#e8e9eb", textDecoration: "none" }}>
                Children
              </Link>
            </Typography>
            <Typography component="li" padding='5px 0'>
              <Link to="/shop/accessories" style={{ color: "#e8e9eb", textDecoration: "none" }}>
              Accessories
              </Link>
            </Typography>
          </Box>
        </Grid>

        {/* Contact Us */}
        <Grid item xs={12} md={2}>
          <Typography variant="h6" textTransform="uppercase" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body2" sx={{ color: "#b0b0b0", letterSpacing:'1px', lineHeight:'25px' }} padding='5px 0'>
            Email: info@branvenialuxe.com<br />
            Phone: +123 456 7890<br />
            Address: 123 Fashion Ave, Luxury City, CA<br />
            Hours: Monday-Sunday(24/7)
          </Typography>
          <Box sx={{ mt: 2}}>
          <div className="col-lg-3 col-md-6 d-flex align-items-center justify-content-between mb-4">
            <Link to="https://wa.link/3ng2v5/" target="_blank" rel="noopener noreferrer" className=" text-white">
              <WhatsApp fontSize="large" />
            </Link>
            <Link to="https://github.com/Wung-brandon/" target="_blank" rel="noopener noreferrer" className="text-white">
              <GitHub fontSize="large" />
            </Link>
            <Link to="https://www.linkedin.com/in/wung-brandon-000917256/" target="_blank" rel="noopener noreferrer" className="text-white">
              <LinkedIn fontSize="large" />
            </Link>
           </div>
          </Box>
        </Grid>
      </Grid>

      {/* Divider */}
      <Divider sx={{ my: 3, backgroundColor: "#e8e9eb" }} />

      {/* Footer Bottom */}
      <Typography variant="body2" sx={{ textAlign: "center", color: "#b0b0b0" }}>
        &copy; {new Date().getFullYear()} Branvenia Luxe. All Rights Reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
