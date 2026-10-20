// # 文節単位の折り返し（BudouX）
//------------------------------------------------

(function () {
  // ## 設定
  //------------------------------------------------

  const TARGET_SELECTORS = [
    '.u-phrase-wrap',
  ];

  // ## 適用処理
  //------------------------------------------------

  function apply() {
    const budoux = window.BudouxJa;

    if (!budoux) {
      return;
    }

    const parser = new budoux.HTMLProcessingParser(budoux.jaModel, {
      separator: document.createElement('wbr'),
    });

    document.querySelectorAll(TARGET_SELECTORS.join(', ')).forEach(function (element) {
      element.style.wordBreak = 'keep-all';
      element.style.overflowWrap = 'anywhere';
      parser.applyToElement(element);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
})();
