jQuery(function($){
  // 初期起動時
  $('#result').html("ファイルを選択してください。");
  
  // File APIが使用できるかどうか判定
  if (!window.File){
    $('#result').html("File API 使用不可");
    return;
  }
  
  // ファイルが選択／画像ファイルが変更された場合に実行
  $("#imageFile").on("change", function(){
    // ローカルファイル読み込み用
    var reader = new FileReader();
    
    // 画像ファイル選択時にソースURLを指定する
    reader.onload = function(event){
      document.getElementById("image").src = reader.result;
    }
    
    // 画像ファイルをURLから読み込み、画面表示する
    var file = document.getElementById("imageFile").files[0];
    reader.readAsDataURL(file);
    
    // 画像解析準備
    $('#result').html("解析しています。しばらくお待ちください。<br />この処理には30秒～1分ほどかかります。");
    
    // 画像解析
    analyze(file);
  });

  // 画像から文字を解析する
  function analyze(image){
    Tesseract
      // (読み込む画像, 言語) jpeg || png
      .recognize(image, {lang: 'jpn'}) //exp: jpn, eng
      //.ImageLike('media', lang)  //* browser only img || video || canvas
      .progress(function(p) {
        // 進歩状況の表示
        console.log('progress', p)
      })
      // 結果のコールバック
      .then(function(result) {
        console.log(result);
        // 結果から検索リンクの生成
        $('#result').html("<a href='https://www.google.co.jp/search?q="+result.text+"' target='_blank'>"+result.text+"</a>");
    });
  }
});



