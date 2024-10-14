import { Box, Grid, Typography, Divider } from "@mui/material";
import { WhatsApp, GitHub, LinkedIn} from "@mui/icons-material";
import { Link } from "react-router-dom";

function Footer() {
  const quickLinks = [
    {name: 'Home', link: '/'},
    {name: 'About Us', link: '/about'},
    {name: 'Contact Us', link: '/contact'},
    {name: 'Terms & Conditions', link: '/terms'},
    {name: 'Privacy Policy', link: '/privacy'},
    {name: 'Return Policy', link: '/return'},
    {name: 'FAQs', link: '/faqs'},
  ]

  const socialMediaLinks = [
    {icon: <WhatsApp fontSize="large"/>, link: 'https://wa.link/3ng2v5/'},
    {icon: <GitHub fontSize="large"/>, link: 'https://github.com/Wung-brandon/'},
    {icon: <LinkedIn fontSize="large"/>, link: 'https://www.linkedin.com/in/wung-brandon-000917256/'},
  ]

  const myAccountLinks = [
    {name: 'Signup', link: '/signup'},
    {name: 'Login', link: '/login'},
    {name: 'Logout', link: '/logout'},
    {name: 'My Orders', link: '/my-orders'},
    {name: 'My Cart', link: '/my-cart'},
    {name: 'My Wishlist', link: '/my-wishlist'},
  ]

  const shopLinks = [
    {name: 'Men', link: '/shop/men'},
    {name: 'Women', link: '/shop/women'},
    {name: 'Children', link: '/shop/children'},
    {name: 'Accessories', link: '/shop/accessories'},
  ]
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
      <Grid container spacing={3} justifyContent="center" >
        
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
            {quickLinks.map((l, index) => (
              <Typography component="li" padding='5px 0' key={index}>
                <Link to={l.link} style={{ color: "#e8e9eb", textDecoration: "none" }}>
                  {l.name}
                </Link>
              </Typography>
            ))}
            
          </Box>
        </Grid>

        <Grid item xs={12} md={2}>
          <Typography variant="h6" textTransform="uppercase" gutterBottom>
            My Account
          </Typography>
          <Box component="ul" sx={{ listStyle: "none", padding: 0 }}>
            {myAccountLinks.map((l) => (
              <Typography component="li" padding='5px 0'>
                <Link to={l.link} style={{ color: "#e8e9eb", textDecoration: "none" }}>
                  {l.name}
                </Link>
              </Typography>
            ))}
          </Box>
        </Grid>

        {/* Shop */}
        <Grid item xs={12} md={2}>
          <Typography variant="h6" textTransform="uppercase" gutterBottom>
            Shop
          </Typography>
          <Box component="ul" sx={{ listStyle: "none", padding: 0 }}>
            {shopLinks.map((l) => (
              <Typography component="li" padding='5px 0'>
                <Link to={l.link} style={{ color: "#e8e9eb", textDecoration: "none" }}>
                  {l.name}
                </Link>
              </Typography>
            ))}
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
            {socialMediaLinks.map((l) => (
              <Link to={l.link} target="_blank" rel="noopener noreferrer" className=" text-white">
                {l.icon}
              </Link>
            ))}
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
