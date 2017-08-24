window.addEventListener("load", function(){
   
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
  }, true);
}, true);

Tesseract
  // (読み込む画像, 言語) jpeg || png
  .recognize('sampleImage.jpg', {lang: 'language'}) //exp: jpn, eng
  //.ImageLike('media', lang)  //* browser only img || video || canvas
  .progress(function(p) {
    // 進歩状況の表示
    console.log('progress', p)
  })
  // 結果のコールバック
  .then(function(result) {
    console.log(result)
});

