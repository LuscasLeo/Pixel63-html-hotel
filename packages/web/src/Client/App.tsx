import { CookiesProvider } from "react-cookie";
import { GeneralProvider } from "./Context/Context";
import ThemeManager from "./Themes/ThemeManager";
import { BrowserRouter } from "react-router";
import './index.css';
import './fonts.css';

const App = () => {
    return (
        <GeneralProvider>
            <CookiesProvider>
                <BrowserRouter>
                    <ThemeManager />
                </BrowserRouter>
            </CookiesProvider>
        </GeneralProvider>
    )
}

export default App;