import React from "react";
import "./App.css";

import { indigo } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavBar from "./components/NavBar";

import ApiContextProvider from "./components/context/ApiContext";
import Main from "./components/Main";


//アプリ全体の色やフォントを指定(「MUIのパーツだけ」に適用される)
const theme = createTheme({
  palette: {
    primary: indigo,// メインカラー
    secondary: {
      main: "#f44336", // サブカラー
    },
  },
  typography: {
    fontFamily: '"Comic Neue", cursive',// フォント設定
  },
});

function App() {
  return (
    <ApiContextProvider>{/*ApiContextProviderの変数や関数を囲まれたコンポーネント内で使用でできるようにする*/}
    <ThemeProvider theme={theme}>{/*ThemeProvider で作成したテーマを適用*/}
      <NavBar />
      <Main/>
    </ThemeProvider>
    </ApiContextProvider>
  );
}

export default App;
