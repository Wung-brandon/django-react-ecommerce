import EcommerceCarousel from "../../components/Carousel"
import { Box, Stack } from "@mui/material"
import Sidebar from "../../components/Sidebar"
import AllProducts from "../../components/AllProducts"
function HomePage() {
  return (
    <Box style={{ width:'100%'}} className="h-100">
        <EcommerceCarousel />
        {/* <Stack direction="row" justifyContent="space-between" spacing={2} margin='1rem'> */}
            {/* <Sidebar /> */}
            <Box>
              {/* <h1>Welcome to our E-commerce website!</h1>
              <p>
                Here, you can find a wide range of products to choose from, from
                luxury watches to eco-friendly clothing. Enjoy shopping!
              </p> */}
              <AllProducts />
              
            </Box>
            
        {/* </Stack> */}
      {/* Add other components or content here */}
    </Box>
  )
}

export default HomePage