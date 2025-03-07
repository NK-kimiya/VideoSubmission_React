import React from 'react';
import { withCookies } from 'react-cookie';
//Material UIで使用するアイコンとパーツを読み込む
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { FiLogOut } from 'react-icons/fi';
import { FaYoutube } from 'react-icons/fa';

const NavBar = (props) => {

  const Logout = () =>  {
    props.cookies.remove('jwt-token');//jwt-tokenのクッキーを削除
    window.location.href = '/';
  }

  return (
    <AppBar position="static">{/*上部に固定するバー*/}
      <Toolbar>{/*ナビバー内のレイアウト調整用コンテナ*/}
        <IconButton edge="start" color="inherit" aria-label="logo">{/*アイコン付きのボタン*/}
          <FaYoutube />{/*YouTubeのロゴアイコン*/}
        </IconButton>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>{/*タイトル表示：sx={{ flexGrow: 1 }}：中央にタイトルを広げて配置。*/}
          Youtube App
        </Typography>
        <IconButton className='logout' color="inherit" aria-label="logout" onClick={()=>Logout()}>
          <FiLogOut />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default withCookies(NavBar)
