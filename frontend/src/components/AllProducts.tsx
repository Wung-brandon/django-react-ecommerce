

import { Box } from "@mui/material";
import ProductSection from "./productSection";

function AllProducts() {
  const apiUrl = import.meta.env.VITE_API_PRODUCT_BASE_URL
  // console.log('ape url', apiUrl)
  return (
    <Box>

      {/* Render New Arrivals Products */}
      <ProductSection 
        heading="New Arrivals" 
        apiUrl={`${apiUrl}/new-arrivals/`} 
      />

      {/* Render Featured Products */}
      <ProductSection 
        heading="Featured Products" 
        apiUrl={`${apiUrl}/featured/`} 
      />

      {/* Render Recent Products */}
      <ProductSection 
        heading="Recent Products" 
        apiUrl={`${apiUrl}/featured/`} 
      />

      {/* Render Top Rated Products */}
      <ProductSection 
        heading="Top Rated Products" 
        apiUrl={`${apiUrl}/top-rated/`} 
      />

      {/* Render Best Selling Products */}
      <ProductSection 
        heading="Best Selling Products" 
        apiUrl={`${apiUrl}/best-selling/`}  
      />

      {/* You can add more product sections as needed */}
    </Box>
  );
}

export default AllProducts;
