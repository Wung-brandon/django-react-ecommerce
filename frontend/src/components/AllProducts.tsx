import { Box, Grid } from "@mui/material";
import ProductCard from "./ProductsCard/ProductCard";
import Typo from "./Typo";

function AllProducts() {
  return (
    <Box sx={{ padding: "1rem" }}>
      <Typo heading="Top Rated Products" />
      <Grid
        container
        spacing={2}
        sx={{
          justifyContent: { xs: "center", sm: "center", md: "flex-start" }, // Center items on small screens
          margin: '2rem 0'
        }}
      >
        <Grid item xs={12} sm={6} md={4} lg={3}
          sx={{
            display: "flex",
            justifyContent: "center", // Ensure card is centered horizontally in small screens
          }}
        >
          <ProductCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}
          sx={{
            display: "flex",
            justifyContent: "center", // Same for all cards
          }}
        >
          <ProductCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}          
        >
          <ProductCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ProductCard />
        </Grid>
      </Grid>
    </Box>
  );
}

export default AllProducts;
