# TakeyariViewer

容易にポートフォリオサイトを作成する為のプログラム。

## 詳細

このプロジェクトは[Angular CLI](https://github.com/angular/angular-cli) version 7.3.3 によって作成されている。

このプログラムを使用することで容易にポートフォリオサイトを作成することができる。
基本的な作成手順は以下のとおり。

1. CONTENTディレクトリ内に表示したいファイルを入れたディレクトリを作成
2. 1.で作成したディレクトリ内にbookinfo.txtというテキストファイルを作成し、そのテキストファイルにそのディレクトリの題名を記入
3. ビルド手順に従いビルドする
4. dist/TakeyariViewer/にポートフォリオサイトが生成されるので、そこにアクセスする

表示したいファイルとbookinfo.txtというテキストファイルを入れたディレクトリをCONTENT内に入れることで、そのディレクトリ内のファイルを表示することができる。
そのディレクトリが複数あればそれらは一覧として表示される。(bookinfo.txtはそれぞれのディレクトリ内に入れる必要がある。)
ディレクトリの中にディレクトリを入れていても、ツリー状ではなく一覧にある要素のひとつとして表示される。


## 依存パッケージ

npm nodejs


## 動作確認

Ubuntuでのデモンストレーション。
以下のコマンドを実行したあと、webブラウザで`http://localhost:4200/`へアクセスすることで見ることができる。
なお、デモンストレーションを実行するにはgit, unzip, wgetコマンドが必要。

```
$ git clone https://github.com/Hayakuchi0/TakeyariViewer.git
$ cd TakeyariViewer
$ wget https://hinesm.info/TakeyariViewer/demo/example.zip
$ unzip example.zip
$ mv example CONTENT
$ ./build.sh
$ ng serve
```


## ビルド手順

プロジェクトディレクトリ内で`./build.sh`を実行してください。
そうすると`dist/`ディレクトリ内にポートフォリオサイトが生成されます。


## 開発中の動作テスト

ビルドをした上でプロジェクトディレクトリ内で`ng serve`コマンドを実行し、その状態で`http://localhost:4200/`へアクセスすることで開発中の動作テストが可能。


## 作成したサイトを編集する

作成したサイトは、ある程度カスタマイズすることができる。
以下はカスタマイズ可能な項目の全てである。

### サイトの情報を設定する

サイトの情報について、CONFIGディレクトリ内のファイルを編集することで設定することができる。

#### サイト名

sitename.txt内に記入された文字列が、サイト名として使用される。
デフォルトは「TakeyariViewer」

#### 著作権表記

copyright.txtに記入された文字列が、著作権表記として使用される。
デフォルトは「(C) Example」

#### サイトの説明文

about.txtに記入された文字列が、サイトの説明文として使用される。
なお、その際にマークダウン記法として記入することとなる。

また、aboutimage.pngという画像ファイルが、サイトの説明文の背景画像として使用される。

#### サイトのイメージ画像

topimage.pngという画像ファイルが、サイトのトップページとして使用される。

favicon.icoという画像ファイルが、サイトのfaviconとして使用される。

#### 文字コード

encodint.txt内に記入された文字コードが、CONFIGディレクトリ内のファイルで使用される。
これは「詳細」におけるbookinfo.txt及び「ディレクトリをまとめる」におけるbookspace.txtでも適用される。
デフォルトは「utf-8」

#### 送信設定

build.shの実行時、コマンドライン引数に通信プロトコルを指定する(つまり`./build.sh <protocol>`を実行する)と、`CONFIG/send/<protocol>.json`内に記述された送信先へFTP通信でサイトを送信する。
例えば、ftp通信でサイトを送信したい場合、`./build.sh ftp`と指定すると、`CONFIG/send/ftp.json`内の設定に従いサイトを送信する。
現在使用可能なプロトコルはftpのみ。

##### ftp

[ftp-deploy](https://www.npmjs.com/package/ftp-deploy)に基づいて設定可能。
設定可能な項目は以下の通り。
* host
* port
* user
* password
* remoteRoot

### ディレクトリをまとめる

表示の際に「詳細」で作成した要素をツリー状にまとめることもできる。
bookspace.txtを入れたディレクトリがツリーの枝として機能する。

1. CONTENTディレクトリ内のディレクトリに、「詳細」の1で格納したディレクトリとbookspace.txtというテキストファイルを格納
2. bookspace.txt内にツリー枝としての題名を記入
3. ビルド手順に従いビルドすることでその変更が適用される


## ライセンス

[MIT](https://github.com/Hayakuchi0/TakeyariViewer/blob/master/LICENSE)


## 作者

[Hayakuchi0](https://github.com/Hayakuchi0/)
