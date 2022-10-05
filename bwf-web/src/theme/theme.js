import { createTheme } from '@mui/material/styles';
import { amber, deepPurple, grey, red, deepOrange, green } from '@mui/material/colors/';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: amber,
        secondary: deepPurple,
        error: red,
        success: green,
        warning: deepOrange,
        text: grey,
      },
    typography: {
        root: {
            color: "rgb(0,0,255)",
        }
    },
    textFieldColor: {
        color: "white !important"
    }
    
});

export default theme;