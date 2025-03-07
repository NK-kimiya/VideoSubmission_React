//状態（state）を変えるときに使う「名前付き定数」

export const START_FETCH = 'START_FETCH'//データ取得の開始（読み込み中）
export const FETCH_SUCCESS = 'FETCH_SUCCESS'//データ取得成功
export const ERROR_CATCHED = 'ERROR_CATCHED'//	エラーが発生
export const INPUT_EDIT = 'INPUT_EDIT'//入力フォームが編集された
export const TOGGLE_MODE = 'TOGGLE_MODE'//表示モードの切り替え（ログイン⇔新規登録）