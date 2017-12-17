# GitHub Commit Status Notifier

Pull Request に紐づく CI などの Status を定期的にチェックして、CI が終わったら通知してくれる Chrome 拡張です

# セットアップ

## 拡張のインストール

[こちら](https://goo.gl/mGbWsi) からインストールしてください

## API トークンを取得する

まずステータスの取得に必要なAPIトークンを取得します。

[GitHub「Personal access tokens」の設定方法](https://qiita.com/kz800/items/497ec70bff3e555dacd0)

を参考に取得してください

scope は repo:status にチェックを入れてください

![image](https://user-images.githubusercontent.com/2083116/33912825-b437b25e-dfda-11e7-9c62-e385fb6ac2e0.png)

## API トークンを設定する

オプションをクリック

![image](https://user-images.githubusercontent.com/2083116/34080632-c80b93ec-e384-11e7-8f3e-80aa35ed6f8c.png)

「GitHub Token」の右のテキストボックスにさきほど取得したトークンを貼り付け、Saveを押します。

# 使い方

「Update branch」を押したりすると、CIが走ると思います。

画像のような状態になったら

![image](https://user-images.githubusercontent.com/2083116/34080290-d98cea04-e37e-11e7-80f2-35ba1d36754c.png)

アイコンを押します。

![image](https://user-images.githubusercontent.com/2083116/34080660-0031d81c-e385-11e7-9a53-86d3911e0930.png)


するとチェックを開始する旨の通知が表示され、
CI が終了すると、終了結果を通知してくれます。

チェックを開始する旨の通知がこない場合は、一旦PRのページをリロードした後、もう一度アイコンを押してみてください
