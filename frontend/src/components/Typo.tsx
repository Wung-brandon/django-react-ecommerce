import { Typography } from "@mui/material"

interface TypoProp{
    heading: string;  // required prop to define the text content of the heading.  The text content will be displayed as a heading (h4).  The color and font weight will be set as per the provided prop values.  The textAlign prop will be set to 'center' to center align the heading.  The sx prop is used to apply CSS styles.  The variant prop is set to 'h4' to define the size and style of the heading.  The text content will be displayed in the color #550c18 and font weight will be bold.  The heading will be centered.  The sx prop is used to apply CSS styles.  The variant prop is set to 'h4' to define the size and style of the heading.  The text content will be displayed in the color #550c18 and font weight will be bold.  The heading will be centered.  The sx prop is used to apply CSS styles
}

const Typo:React.FC<TypoProp> = ({heading}) => {
    return(
        <>
            <Typography 
                variant="h4" 
                textAlign='center' 
                sx={{color:'#550c18', fontWeight:'bold', margin: '0.5em 0'}}
            >{heading}</Typography>
        </>
    )
}
export default Typo

