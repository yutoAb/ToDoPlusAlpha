## 構成

- Dockerfile : 「どんなデータベースを使うか」と「初期設定をどこから読み込むか」を指定するファイル

- compose.yml : 「データベースをどのように動かすか」を定義するファイル
  - ポート番号 : 自分のパソコン(5432 番)とデータベースを接続する窓口
  - 初期ユーザーやパスワード : データベースにアクセスするための情報
  - 永続化 : データベースのデータを保存する仕組み

## すべて停止/起動/再起動
```
# 停止
docker compose stop

# 起動
docker compose start

# 再起動
docker compose restart
```

### 停止/起動/再起動

```
# 停止
docker compose stop server
docker compose stop db

# 起動
docker compose start server
docker compose start db

# 再起動（一発）
docker compose restart server
docker compose restart db
```

### 再ビルドして再起動（コードや Dockerfile を変えた時）

```
# server だけ再ビルド & 起動
docker compose up -d --build server

# db は公式イメージなので通常は不要
docker compose up -d db
```

### コンテナの削除（停止後）

```
# 停止中のコナを削除（イメージやボリュームは残す）
docker compose rm -f server
docker compose rm -f db
```
