# GitHub Commit Status Notifier

Pull Request に紐づく CI などの Status を定期的にチェックして、CI が終わったら通知してくれる Chrome 拡張です

# セットアップ

## 拡張のインストール

拡張のストアに出していないので、開発者モードにして追加します。
まずはこのリポジトリをcloneします。  

次にchromeの拡張機能のページを表示し、デベロッパーモードにチェックを入れます

![image](https://user-images.githubusercontent.com/2083116/33885741-8a3a7bc4-df87-11e7-95c3-7c4b6130510b.png)

すると「パッケージ化されていない拡張機能を読み込む」というボタンがでるので、clone したこのリポジトリのフォルダを選択します。

![image](https://user-images.githubusercontent.com/2083116/33885791-b3713316-df87-11e7-8abb-75ea3783a22d.png)


## API トークンを取得する

まずステータスの取得に必要なAPIトークンを取得します。

[GitHub「Personal access tokens」の設定方法](https://qiita.com/kz800/items/497ec70bff3e555dacd0)

を参考に取得してください

scope は repo:status にチェックを入れてください

![image](https://user-images.githubusercontent.com/2083116/33912825-b437b25e-dfda-11e7-9c62-e385fb6ac2e0.png)

## API トークンを設定する

オプションをクリック

![image](https://user-images.githubusercontent.com/2083116/33885867-fd079ad8-df87-11e7-91f6-f99c4c8dc2c1.png)

「GitHub Token」の右のテキストボックスにさきほど取得したトークンを貼り付け、Saveを押します。

# 使い方

「Update branch」を押したりすると、CIが走ると思います。

画像のような状態になったら

![image](https://user-images.githubusercontent.com/2083116/33886025-81fe637a-df88-11e7-92f9-5efb7e8477d7.png)

「G」アイコンを押します。

![image](https://user-images.githubusercontent.com/2083116/33886038-8f28c96e-df88-11e7-9451-1569c95114a2.png)

するとチェックを開始する旨の通知が表示され、
CI が終了すると、終了結果を通知してくれます。

チェックを開始する旨の通知がこない場合は、一旦PRのページをリロードした後、もう一度「G」ボタンを押してみてください
