import React from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components";

import theme from "./src/global/styles/theme";
import { Routes } from "./src/routes";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Routes />
    </ThemeProvider>
  );
}
