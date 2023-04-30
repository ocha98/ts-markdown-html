# これは何
これはmarkdownをhtmlに変換するものです。unifiedのプラグインを組み合わせて作っています。

# 自作プラグイン
## rehype-image-size
画像のサイズを`=高さx横`で指定できるようにするものです。`=x100`のように横のみ、縦のみもできます。

例
```
![alt](https://example.com/img.png "=100x100")
```

## rehype-wrap-table
tableタグをdivで囲うものです。

## rehype-to-String
hastを文字列に変換するものです。エスケープ処理を修正した`hast-util-to-html`を使用してます。

# XSS
`rehype-sanitize`で不正なhmlt要素や属性をサニタイズし、`hast-util-to-html`で文字列をエスケープしています。

テストコード`xss.test.ts`でテストしていますが、不備があれば教えて下さい。

