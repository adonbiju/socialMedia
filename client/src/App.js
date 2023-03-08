import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "pages/LoginPage";
import { routes } from "./routes";
import { Loading } from "components";
import { useMemo ,Suspense} from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import MainLayout from "layouts/MainLayout/MainLayout";
function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route element={<MainLayout />}>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
            </Route>
          </Routes>
          </ Suspense >
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
