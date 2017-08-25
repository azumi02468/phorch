window.addEventListener("load", function(){
  result.innerHTML = "準備中";
  
  if (!window.File){
    result.innerHTML = "File API 使用不可";
    return;
  }
   
  document.getElementById("imageFile").addEventListener("change", function(){
    var reader = new FileReader();
     
    reader.onload = function(event){
      document.getElementById("image").src = reader.result;
    }
    var file = document.getElementById("imageFile").files[0];
    reader.readAsDataURL(file);
    
    // 画像解析開始
    analyze(file);
    
  }, true);
}, true);

// 画像から文字を解析する
function analyze(image){
  var ret;
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
      document.getElementById("result").innerHTML = "<a href='https://www.google.co.jp/search?q='"+result.text+">result.text</a>";
  });
  return ret;
}

