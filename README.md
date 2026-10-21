## 概要

見出しやボタンなどの文言が、単語の途中で改行されるのを防ぐためのパーツです。  
要素に`u-phrase-wrap`クラスを付けると、文節の切れ目で改行されるようになります。

```
【適用前】
水の道をつくり、地域の暮らしを支え
る。

【適用後】
水の道をつくり、
地域の暮らしを支える。
```

```html
<h2 class="u-phrase-wrap">水の道をつくり、地域の暮らしを支える。</h2>
```

## 仕組み

`<br>`は「必ず改行する」、`<wbr>`は「1行に収まらないときだけ、ここで改行してよい」という意味のタグです。文節の切れ目に`<wbr>`を入れ、次のCSSで`<wbr>`以外の位置での改行を止めると、どの画面幅でも文節の切れ目で改行されます。

```css
.text {
  word-break: keep-all;
  overflow-wrap: anywhere;
}
```

`keep-all`は日本語の途中での改行を止めます。`overflow-wrap: anywhere`は、そのままでははみ出す場合に限り、`<wbr>`のない位置でも改行を許可する保険です。文節が要素の幅より長い場合や、URL・長い英単語が含まれる場合でも、文字がはみ出さずに改行されます。

ただし、<wbr>を手作業で入れる方法では、文言を変えるたびに入れ直す必要があります。phrase-wrapでは、Google製のJavaScriptライブラリBudouXが文節の切れ目を自動で判定し、`<wbr>`の挿入と上記CSSの付与を行います。

BudouXは日本語専用の軽量版（約11KB）のため、ページのパフォーマンスへの影響はほぼありません。

## 導入手順（WordPress）

### 1. ファイルのコピー

`css/`と`js/`を有効化中のテーマ（子テーマを使う場合は子テーマ）の直下にコピーします。

`js/vendor/`の3ファイルは、BudouXのライセンス（Apache License 2.0）の再配布条件を満たすため、必ずセットで扱ってください。

### 2. functions.phpへの追記

`inc/phrase-wrap.php`の内容を`functions.php`に追記します。

```php
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_script('budoux-ja', get_stylesheet_directory_uri() . '/js/vendor/budoux-ja.js', array(), '0.7.0', true);
    wp_enqueue_script('phrase-wrap', get_stylesheet_directory_uri() . '/js/phrase-wrap.js', array('budoux-ja'), '1.0.0', true);
});
```

### 3. CSSの追加

`css/phrase-wrap.css`の内容を、テーマのCSS / SCSSに書き写します。

```css
.u-phrase-wrap {
  word-break: auto-phrase;
}

.u-phrase-wrap--balance {
  text-wrap: balance;
}
```

### 4. クラスの指定

```html
<h2 class="u-phrase-wrap">水の道をつくり、地域の暮らしを支える。</h2>
```

ブロックエディターでは、ブロックの「高度な設定 → 追加 CSS クラス」に指定します。

## HTMLを編集できない（したくない）要素に使う場合

親テーマが出力する見出しなど、HTMLを直接編集しにくい要素には、`js/phrase-wrap.js`の`TARGET_SELECTORS`にセレクタを追記します。

```js
const TARGET_SELECTORS = [
  '.u-phrase-wrap',
  '.headline',
  '.sub_headline',
  '.split_content .desc',
];
```

## 行の長さを揃える

`u-phrase-wrap--balance`を追加すると、`text-wrap: balance`により文節の切れ目を保ったまま各行の長さが揃います。必ず`u-phrase-wrap`と併記します。

```
【u-phrase-wrapのみ】
地域の暮らしを支える水道の仕事、
始めてみませんか？

【u-phrase-wrap--balanceを追加】
地域の暮らしを支える
水道の仕事、始めてみませんか？
```

```html
<h2 class="u-phrase-wrap u-phrase-wrap--balance">地域の暮らしを支える水道の仕事、始めてみませんか？</h2>
```

## flex / grid要素に使う場合

flex / grid要素に直接付けると、文言が`<wbr>`の位置で別々のアイテムに分かれ、`gap`の余白も文節間に入ります。文言を`<span>`などで包み、その要素に付けてください。

```html
<a class="c-button" href="/contact/">
  <span class="u-phrase-wrap">メールでのお問い合わせ</span>
</a>
```

## 参考リンク

- [wbrタグを使った改行制御のテクニック｜株式会社アテンド](https://www.attend.jp/html-250623)
- [CSSで文節の折り返しを！ br・wbrとauto-phraseの活用術 - ICS MEDIA](https://ics.media/entry/241105/)
