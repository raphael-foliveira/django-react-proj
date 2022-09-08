import { createTheme } from '@mui/material/styles';
import { amber, deepPurple, grey } from '@mui/material/colors/';

const theme = createTheme({
    palette: {
        primary: amber,
        secondary: deepPurple,
      },
    typography: {
        root: {
            color: "rgb(0,0,255)",
        }
    }
    
});

export default theme;