# アプリケーション名
Piggybank 365


# アプリケーション概要
365日の貯蓄履歴をアプリケーション内で記録することができる。


# URL
https://piggy-bank-365-front.vercel.app/


# テスト用アカウント
Email: test@test.com
Password: aaa111

# バックエンドのGithub
https://github.com/s-yamauchi07/piggy_bank_356


# 利用方法
## ユーザー登録
[![Image from Gyazo](https://i.gyazo.com/3c75e07bbe3c69228b7e7bfdbadbbdc8.gif)](https://gyazo.com/3c75e07bbe3c69228b7e7bfdbadbbdc8)

1. ヘッダーの「SIGNUP」ボタンをクリックし、新規登録ページへ移動する。
2. nickname、email、 password、確認用passwordを入力し、「SUBMIT」ボタンをクリックすることでユーザーを登録できる。

## ログイン機能
[![Image from Gyazo](https://i.gyazo.com/d3cb0c6949c42fe116fe46c6958b4e4c.gif)](https://gyazo.com/d3cb0c6949c42fe116fe46c6958b4e4c)
1. ヘッダーの「SIGNIN」ボタンをクリックし、ログインページへ移動する。
2. email、 passwordを入力し、「SUBMIT」ボタンをクリックすることでログインできる。

## 貯蓄の登録
[![Image from Gyazo](https://i.gyazo.com/40b5861f2c0d7c28d71b6ee17c0a6090.gif)](https://gyazo.com/40b5861f2c0d7c28d71b6ee17c0a6090)
1. 貯蓄したい金額をクリックすることで、貯蓄の記録ができる。
2. 謝って押した金額は、再度クリックすることで取り消しができる。
3. 今までの貯蓄を全てリセットしたい場合は、画面上部の「RESET」ボタンをクリックすることで履歴の全消去が可能。


## 貯蓄日の確認
[![Image from Gyazo](https://i.gyazo.com/02bc8f666751c8dca146bf894f0990f7.gif)](https://gyazo.com/02bc8f666751c8dca146bf894f0990f7)
1. ヘッダーの「ユーザー名」のボタンをクリックし、ユーザー詳細ページへ移動する。
2. 貯蓄した日付にはカレンダー内で豚のアイコンが表示されているため、貯蓄日が確認できる。


## ユーザー編集
[![Image from Gyazo](https://i.gyazo.com/3a7e0634f1bef67b89bfa7481e3480c6.gif)](https://gyazo.com/3a7e0634f1bef67b89bfa7481e3480c6)

[![Image from Gyazo](https://i.gyazo.com/94098ab3e17bf191637ca73ee7187398.gif)](https://gyazo.com/94098ab3e17bf191637ca73ee7187398)

1. ヘッダーの「ユーザー名」のボタンをクリックし、ユーザー詳細ページへ移動する。
2. 「EDIT」ボタンをクリックし、変更したい項目を入力する(passwordと確認用passwordは変更時に必ず入力が必要)
3. 「UPDATE」ボタンをクリックしてユーザー情報編集ができる。

## アカウント削除
[![Image from Gyazo](https://i.gyazo.com/e19652439cdcb20438fa308dc9f5ed62.gif)](https://gyazo.com/e19652439cdcb20438fa308dc9f5ed62)

1. ヘッダーの「ユーザー名」のボタンをクリックし、ユーザー詳細ページへ移動する。
2. 「DELETE」ボタンをクリックし、passwordと確認用passwordを入力し、「DELETE」ボタンを再度クリックすることでアカウント削除ができる。

## ログアウト機能
[![Image from Gyazo](https://i.gyazo.com/d8f12af8a9873fdf6c61ce5011579148.gif)](https://gyazo.com/d8f12af8a9873fdf6c61ce5011579148)
1. ヘッダーの「LOGOUT」のボタンをクリックすると、ログアウトができる。

# アプリケーションを作成した背景
毎日貯蓄履歴を紙で管理していたのですが、以下の点が継続を妨げていました。
- 何日まで貯蓄をしたのかが分からなくなる。
- 今どれくらいの貯蓄が溜まっているのかを把握できない。

これらの課題を解決するためにワンタッチで貯蓄履歴を管理でき、貯蓄合計金額を把握できるアプリケーションを作成しようと考えました。

# 画面遷移図
[![Image from Gyazo](https://i.gyazo.com/8a8e8cd5aa6ac453c149cd5c8a7ae959.png)](https://gyazo.com/8a8e8cd5aa6ac453c149cd5c8a7ae959)

# 開発環境
* フロントエンド
  * React(v18.2.0)
  * Matetial-UI(V5.13.3)

* バックエンド
  * rails(v6.0.6)

* インフラ
  * Vercel
  * render



