# はじめに
このリポジトリは、Google Chromeの拡張をNext.jsで書くためのテンプレートリポジトリになります。

# 使い方

## 1. リポジトリをcloneする

```bash
git clone https://github.com/cti1650/tailwindcss-extension.git
```

## 2. ライブラリをインストールする

```bash
yarn
```

## 3. Chrome Extensionを作成する

```bash
yarn export
```

## 4. Chrome Extensionを登録する

#### a. Chrome拡張機能ページにアクセス  
  ```
  chrome://extensions/
  ```
#### b. 拡張機能をパッケージ化  
#### c. extensionsディレクトリをアップロード  


# 開発について

- `Link`は可能ですが、`URL`の指定を`.html`まで記述する必要があります.
- アプリ名などを指定する場合には`dist/manifest.json`を書き換えます.

## 1. 公開用ファイルの生成

```bash
yarn export
```

## 2. 各オプション機能の実行

#### a. 拡張機能のZIP化

```bash
yarn zip
```

#### b. 拡張機能用アイコンの自動生成

manifest.jsonと同一階層にicons/icon.pngファイル(サイズ128px以上)を格納してから以下のコマンドを実行してください。  
実行すると各サイズ(16px,19px,48px,128px)のアイコン生成とmanifest.jsonへのパス設定を自動的に行います！

```bash
yarn mkicon
```

## 3. 拡張機能のバージョン管理

#### a. メジャーアップデート（機能に大きな変更があった場合）  

```bash
yarn major
```

#### b. マイナーアップデート（後方互換性を保つ変更があった場合）  

```bash
yarn minor
```

#### c. パッチアップデート（バグ修正が行われた場合）  

```bash
yarn patch
```
※ `yarn export`時にはパッチアップデートが自動実行されます！
