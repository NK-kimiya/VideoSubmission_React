import React, { useReducer } from "react";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { withCookies } from "react-cookie";


import {
    START_FETCH,
    FETCH_SUCCESS,
    ERROR_CATCHED,
    INPUT_EDIT,
    TOGGLE_MODE,
  } from "./actionTypes";

import axios from "axios";

// Material-UIのテーマ
const defaultTheme = createTheme();

//ログイン画面で管理したい状態をまとめる
const initialState = {
  isLoading: false,// 読み込み中かどうか（スピナー表示など）
  isLoginView: true,// 表示モード（true: ログイン画面、false: 新規登録画面）
  error: "",// エラーメッセージ
  credentialsLog: {// 入力されたメールアドレス・パスワード
    email: "",
    password: "",
  },
};

//ログイン画面の状態を更新するための関数
/*
✅仕組み
・state：今の状態（initialState の内容）
・action：何をしたいかという指示(type で種類を判定)
switch 文で action.type の種類ごとに状態を更新する。
*/
const loginReducer = (state, action) => {
  switch (action.type) {
    case START_FETCH: {//状態が読み込み開始の場合
      return {//isLoading: true にする
        ...state,
        isLoading: true,
      };
    }
    case FETCH_SUCCESS: {//状態が読み込み完了の場合
      return {//isLoading: false に戻す
        ...state,
        isLoading: false,
      };
    }
    case ERROR_CATCHED: {//状態がエラー発生の場合
      return {//error にエラーメッセージを入れて isLoading を止める
        ...state,
        error: "Email or password is not correct !",
        isLoading: false,
      };
    }
    case INPUT_EDIT: {//入力フォームの変更を反映
      return {//credentialsLog の email や password を更新し、エラーを消す
        ...state,//
        //[action.inputName]: action.payload,
        credentialsLog: {
          ...state.credentialsLog,
          [action.inputName]: action.payload,
        },
        error: "",
      };
    }
    case TOGGLE_MODE: {//ログイン画面と新規登録画面の切り替え
      return {//sLoginView を反転する (true ⇔ false)
        ...state,
        isLoginView: !state.isLoginView,
      };
    }
    default://どれにも当てはまらなければ、そのままの状態を返す
      return state;
  }
};

const Login = (props) => {
  //状態管理と状態更新の関数を使用できる用に定義
  const [state, dispatch] = useReducer(loginReducer, initialState);

  const inputChangedLog = (event) => {
    //const cred = state.credentialsLog;//現在のemailとpasswordを取り出す
    //cred[event.target.name] = event.target.value;//入力された値を、入力欄の name 属性を使って email や password に代入
    dispatch({//INPUT_EDIT アクションを発行して、更新を reducer に伝える
      type:INPUT_EDIT,
      inputName: event.target.name,
      payload: event.target.value,
    });
  };
  
  const login = async (event) => {
    event.preventDefault();//ページのリロードを防ぐ
    if (state.isLoginView) {
      try {
        dispatch({ type: START_FETCH });//START_FETCHアクション
        const res = await axios.post(//同期処理でPOST通信：処理が終了するまで次の処理を待機させる
          `http://127.0.0.1:8000/authen/jwt/create/`,//jwtログインのURL
          state.credentialsLog,//POST通信でemailとpasswordを送信
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        props.cookies.set("jwt-token", res.data.access);//クッキーにjwtを保存
        res.data.access
          ? (window.location.href = "/youtube")//ログインが成功したら、/youtubeにリダイレクト
          : (window.location.href = "/");//ログインが失敗したら、/にリダイレクト
        dispatch({ type: FETCH_SUCCESS });//FETCH_SUCCESSアクションを実行
      } catch {//ログイン失敗時
        dispatch({ type: ERROR_CATCHED });//FETCH_SUCCESSアクションを実行
      }
    } else {//アカウント作成の場合
      try {
        dispatch({ type: START_FETCH });//START_FETCHアクションを実行
        await axios.post(//同期処理でpost通信でアカウントを作成
          `http://127.0.0.1:8000/api/create/`,//アカウント作成のAPIエンドポイント
          state.credentialsLog,//フォームで入力した、emailとpasswordを送信
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        //同期処理でログイン
        const res = await axios.post(
          `http://127.0.0.1:8000/authen/jwt/create/`,
          state.credentialsLog,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        props.cookies.set("jwt-token", res.data.access);
        res.data.access
          ? (window.location.href = "/youtube")
          : (window.location.href = "/");
        dispatch({ type: FETCH_SUCCESS });
      } catch {
        dispatch({ type: ERROR_CATCHED });
      }
    }
  };

  //ログイン画面とアカウント作成画面の切り替え
  const toggleView = () => {
    dispatch({ type: TOGGLE_MODE });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {state.isLoginView ? 'Login':'Register'}
          </Typography>
          <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="メールアドレス"
              name="email"
              autoComplete="email"
              autoFocus
              value={state.credentialsLog.email}
              onChange={inputChangedLog}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={state.credentialsLog.password}
              label="パスワード"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={inputChangedLog}
            />

            <span onClick={()=>toggleView()}>
              {state.isLoginView ? 'Create Account' : 'Back to login'}
            </span>

            {state.isLoginView ?
                          <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Login
                        </Button>
                        :
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Register
                      </Button>
            }


            <span>{state.error}</span>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  パスワードを忘れた場合
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"アカウントをお持ちでない場合は登録"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default withCookies(Login);
