import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          description: {
            login: "Login",
            signup: "Sign up",
            signin: "Sign In",
            noAccount: "Dont have an account",
            email: "Email",
            password: "Password",
            errorEmail: "Email is Required!!!",
            errorPassword: "Password is Required!!!",
            dashboardGreeting: "Welcome to Dashboard",
            userDetails: "User Details",
            logout: "Logout",
            languages: "Languages",
            name: "Name",
          },
        },
      },
      de: {
        translation: {
          description: {
            login: "Anmeldung",
            signup: "sich registrieren",
            signin: "sich In",
            noAccount: "Hab keinen Konto",
            email: "E-mail",
            password: "Passwort",
            errorEmail: "E-Mail ist erforderlich!!!",
            errorPassword: "Passwort wird benötigt!!!",
            dashboardGreeting: "Willkommen im Dashboard",
            userDetails: "Ihre E -Mail ist",
            logout: "Ausloggen",
            languages: "Sprachen",
            name: "Name",
          },
        },
      },
      "ar-AE": {
        translation: {
          description: {
            login: "تسجيل الدخول",
            signup: "سجل",
            signin: "تسجيل الدخول",
            noAccount: "ليس لديك حساب",
            email: "البريد الإلكتروني",
            password: "كلمه السر",
            errorEmail: "البريد الالكتروني مطلوب!!!",
            errorPassword: "كلمة المرور مطلوبة!!!",
            dashboardGreeting: "مرحبا بكم في لوحة القيادة",
            userDetails: "تفاصيلك",
            logout: "الخروج",
            languages: "اللغات",
            name: "اسم",
          },
        },
      },
      hi: {
        translation: {
          description: {
            login: "लॉग इन करें",
            signup: "साइन अप करें",
            signin: "साइन इन करें",
            noAccount: "एक खाता नहीं है",
            email: "ईमेल",
            password: "पारण शब्द",
            errorEmail: "ईमेल की जरूरत है!!!",
            errorPassword: "पासवर्ड की आवश्यकता है!!!",
            dashboardGreeting: "डैशबोर्ड में आपका स्वागत है",
            userDetails: "आपका विवरण",
            logout: "लोग आउट",
            languages: "भाषाओं",
            name: "नाम",
          },
        },
      },
    },
  });

export default i18n;
