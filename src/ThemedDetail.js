import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import { Children, createContext, useMemo, useState } from "react";
import App from "./App";
import { grey } from "@mui/material/colors";

export const themeContext = createContext();

export default function ThemedDetail({children}) {
    const [translate, setTranslate] = useState({});

    const theme = useMemo(() => {
        return createTheme({
            palette: {
                primary: {
                    main: "#EC7800", // Your custom primary color
                },
                text: {
                    color: "#1F1F1F",
                },
                background: {
                    bgcolor:"#fcfeff"
                },
                sidebar:{
                    selectColor:"#5577CA"
                }
            },
        });
    }, []);
    return (
        <themeContext.Provider value={{ translate, setTranslate }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </themeContext.Provider>
    );
}
