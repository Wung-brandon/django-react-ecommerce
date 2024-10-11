import EcommerceCarousel from "../../components/Carousel"
import { Stack } from "@mui/material"
import Sidebar from "../../components/Sidebar"
import AllProducts from "../../components/AllProducts"
function HomePage() {
  return (
    <div style={{ width:'100%'}} className="h-100">
        <EcommerceCarousel />
        <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Sidebar />
            <AllProducts />  
        </Stack>
      {/* Add other components or content here */}
    </div>
  )
}

export default HomePage