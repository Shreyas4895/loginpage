import React, { useState } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  Grid,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";

import { useTranslation, Trans } from "react-i18next";
import { languages } from "../../constants";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const Login = (props) => {
  const { handleColorChange } = props;
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [isArabic, setIsArabic] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data?.email, data?.password);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("User login failed");
    }
  };

  const handleButton = (language) => {
    if (language === "ar-AE") {
      setIsArabic(true);
    } else {
      setIsArabic(false);
    }
    i18n.changeLanguage(language);
    handleColorChange(language);
  };

  const theme = (outerTheme) =>
    createTheme({
      direction: "rtl",
      palette: {
        mode: outerTheme.palette.mode,
      },
    });

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  return (
    <>
      <Grid container md={12} sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1536599018102-9f803c140fc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8d2FsbHBhcGVyc3x8fHx8fDE3MDU2NDUzNTg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5}>
          <Container
            maxWidth="sm"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
              {Object.keys(languages).map((lng) => (
                <Button
                  variant="outlined"
                  key={lng}
                  style={{
                    fontWeight:
                      i18n.resolvedLanguage === lng ? "bold" : "normal",
                  }}
                  type="submit"
                  sx={{ mb: "2%" }}
                  onClick={() => handleButton(lng)}
                >
                  {languages?.[lng]?.language}
                </Button>
              ))}
            </Grid>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ textAlign: isArabic ? "end" : "" }}
            >
              <Typography variant="h2" gutterBottom sx={{ mt: "2%" }}>
                <Box sx={{ fontWeight: "bold", m: 1 }}>
                  <Trans i18nKey="description.login">
                    {t("description.login")}
                  </Trans>
                </Box>
              </Typography>
              <Box
                component="div"
                sx={{ display: "flex", flexDirection: "column" }}
              >
                {isArabic ? (
                  <CacheProvider value={cacheRtl}>
                    <ThemeProvider theme={theme}>
                      <div dir="rtl">
                        <TextField
                          fullWidth
                          label={t("description.email")}
                          name="email"
                          {...register("email", {
                            required: t("description.errorEmail"),
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address",
                            },
                          })}
                          error={Boolean(errors.email)}
                          variant="outlined"
                        />
                      </div>
                    </ThemeProvider>
                  </CacheProvider>
                ) : (
                  <TextField
                    label={t("description.email")}
                    fullWidth
                    name="email"
                    {...register("email", {
                      required: t("description.errorEmail"),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    error={Boolean(errors.email)}
                  />
                )}
                {errors.email && (
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ mt: "2%", color: "red" }}
                  >
                    {errors.email.message}
                  </Typography>
                )}
                {isArabic ? (
                  <CacheProvider value={cacheRtl}>
                    <ThemeProvider theme={theme}>
                      <div dir="rtl">
                        <TextField
                          label={t("description.password")}
                          type={showPassword ? "text" : "password"}
                          fullWidth
                          margin="normal"
                          name="password"
                          {...register("password", {
                            required: t("description.errorPassword"),
                          })}
                          error={Boolean(errors.password)}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={handleTogglePassword}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                    </ThemeProvider>
                  </CacheProvider>
                ) : (
                  <TextField
                    label={t("description.password")}
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    margin="normal"
                    name="password"
                    {...register("password", {
                      required: t("description.errorPassword"),
                    })}
                    error={Boolean(errors.password)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleTogglePassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
                {errors.password && (
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ mt: "2%", color: "red" }}
                  >
                    {errors.password.message}
                  </Typography>
                )}
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                <Trans i18nKey="description.login">
                  {t("description.login")}
                </Trans>
              </Button>
              <p>
                <Trans i18nKey="description.noAccount">
                  {t("description.noAccount")}?
                </Trans>{" "}
                <NavLink to="/signup">
                  <Trans i18nKey="description.signup">
                    {t("description.signup")}
                  </Trans>
                </NavLink>
              </p>
            </form>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
