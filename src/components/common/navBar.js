import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { languages } from "../../constants";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import { Trans, useTranslation } from "react-i18next";

function NavBar(props) {
  const { handleColorChange } = props;
  const [language, setLanguage] = React.useState("");
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setLanguage(value);
    i18n.changeLanguage(value);
    handleColorChange(value);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Log out failed");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar sx={{ alignItems: "center" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h3"
            component="div"
            sx={{ flexGrow: 0, display: { xs: "none", sm: "block" }, mt: "1%" }}
          >
            <Trans i18nKey="description.dashboardGreeting">
              {t("description.dashboardGreeting")}
            </Trans>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              height: "100%",
              display: { xs: "none", sm: "block" },
              backgroundColor: "white",
              minWidth: "8%",
              marginRight: "1%",
              borderRadius: "3%",
            }}
          >
            <FormControl sx={{ minWidth: 140 }}>
              <InputLabel
                sx={{
                  marginTop: "-4%",
                  "&.Mui-focused": {
                    color: "black",
                  },
                }}
              >
                {t("description.languages")}
              </InputLabel>
              <Select
                sx={{
                  "& .MuiOutlinedInput-input": {
                    padding: "7% 5%",
                  },
                }}
                item
                value={language}
                label="Languages"
                onChange={handleChange}
              >
                {Object.keys(languages).map((lng) => (
                  <MenuItem value={lng} key={lng}>
                    {languages?.[lng]?.language}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Button
              type="submit"
              variant="contained"
              size="medium"
              color="secondary"
              onClick={handleLogout}
              sx={{ margin: "1%", minWidth: 150 }}
            >
              {t("description.logout")}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
