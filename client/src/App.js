import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "scenes/LoginPage";
import HomePage from "scenes/HomePage";
import ProfilePage from "scenes/ProfilePage";
import { routes } from "./routes";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  const login = routes[0];
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={isAuth ? <route.component /> : <Navigate to="/" />}
              />
            ))}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
