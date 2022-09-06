import { createTheme } from '@mui/material/styles';
import { amber, deepPurple } from '@mui/material/colors/';

const theme = createTheme({
    palette: {
        primary: amber,
        secondary: deepPurple,
    },
    colors: {
        bgColor: '#3e3e3e',
        bgLightColor: '#888',
        bgLighterColor: '#DADADA',
        mainAccentColor: '#fecc01'
    },
    components: {
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: "#EEE"
                }
            }
        },
        MuiInput: {
            styleOverrides: {
                root: {
                    color: "#EEE"
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    color: "#EEE"
                }
            }
        }
    }
});

export default theme;