/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@mui/material"

interface ButtonProp{
    text: string;  // required prop to define the text content of the heading.  The text content will be displayed as a heading (h4).  The color and font weight will be set as per the provided prop values.  The textAlign prop will be set to 'center' to center align the heading.  The sx prop is used to apply CSS styles.  The variant prop is set to 'h4' to define the size and style of the heading.  The text content will be displayed in the color #550c18 and font weight will be bold.  The heading will be centered.  The sx prop is used to apply CSS styles.  The variant prop is set to 'h4' to define the size and style of the heading.  The text content will be displayed in the color #550c18 and font weight will be bold.  The heading will be centered.  The sx prop is used to apply CSS styles
    onClick?: any;
    sx?: any; // optional
    color?: string; // optional
    icon?: any; // optional
}

const ButtonComponent:React.FC<ButtonProp> = ({text, onClick, color, icon}) => {
    return(
        <>
            <Button 
                variant="contained" 
                sx={{backgroundColor: color}} 
                size="large"
                startIcon={icon}
                onClick={onClick}
                
            >{text}</Button>
        </>
    )
}
export default ButtonComponent

