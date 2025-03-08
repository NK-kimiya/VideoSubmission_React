インストールライブラリ

| ライブラリ | 目的 |
| --- | --- |
| react-router-dom | 画面遷移（ルーティング）|
| axios | API通信（バックエンドとのデータ通信） |
| react-icons | アイコンの使用（AiFillLike など）|
| @mui/material | Material-UI（コンポーネントUI）|
| @mui/icons-material | Material-UI のアイコンを使用 |
| react-cookie | Cookie の管理（JWT認証などに使用）|


各ファイルの役割

✅src/
| ファイル | 役割 |
| --- | --- |
| index.js | Reactアプリのエントリーポイント(画面遷移やCookieの管理) |
| index.css | グローバルなスタイル定義 |
| App.js | メインコンポーネント、全体のレイアウト管理 |
| App.css | App.js 用のスタイル |
| App.test.js | 	テスト用ファイル |
| reportWebVitals.js | パフォーマンス測定用（オプション）|
| setupTests.js | テスト設定ファイル |

✅components/
| ファイル | 役割 |
| --- | --- |
| Login.js | ログイン画面（認証機能） |
| Main.js | メイン画面（動画リストや詳細の表示）|
| NavBar.js | ナビゲーションバー（ヘッダー部分） |
| VideoDetail.js | 選択された動画の詳細表示 |
| VideoItem.js | 	個別の動画アイテム（リスト表示用） |
| VideoList.js | 動画の一覧表示 |

✅components/context/
| ファイル | 役割 |
| --- | --- |
| ApiContext.js | React Context API でグローバルな状態管理 |

✅components/

| ファイル | 役割 |
| --- | --- |
| actionTypes.js | useReducer を使った状態管理 |

