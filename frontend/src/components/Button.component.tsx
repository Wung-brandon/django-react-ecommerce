/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@mui/material"
import {
    ShoppingCart
} from "@mui/icons-material"

interface ButtonProp{
    text: string;  // required prop to define the text content of the heading.  The text content will be displayed as a heading (h4).  The color and font weight will be set as per the provided prop values.  The textAlign prop will be set to 'center' to center align the heading.  The sx prop is used to apply CSS styles.  The variant prop is set to 'h4' to define the size and style of the heading.  The text content will be displayed in the color #550c18 and font weight will be bold.  The heading will be centered.  The sx prop is used to apply CSS styles.  The variant prop is set to 'h4' to define the size and style of the heading.  The text content will be displayed in the color #550c18 and font weight will be bold.  The heading will be centered.  The sx prop is used to apply CSS styles
    onClick?: any
}

const ButtonComponent:React.FC<ButtonProp> = ({text, onClick}) => {
    return(
        <>
            <Button 
                variant="contained" 
                sx={{backgroundColor: '#550c18'}} 
                fullWidth
                size="large"
                startIcon={<ShoppingCart />}
                onClick={onClick}
            >{text}</Button>
        </>
    )
}
export default ButtonComponent

