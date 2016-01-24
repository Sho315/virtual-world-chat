var milkcocoa = new MilkCocoa('flagih07v7v3.mlkcca.com');
var chatDataStore = milkcocoa.dataStore("chat");
var textArea, board, editortext;



this.textbox1 = document.querySelectorAll(".myname")[0];
    this.textboxIsActive = false;
      
    this.textbox1.addEventListener("focus", function () {
      self.textboxIsActive = true;
    }, true);
      
    this.textbox1.addEventListener("mouseover", function () {
      self.textbox1.focus();
    }, true);
      
    this.textbox1.addEventListener("mouseleave", function () {
      self.textbox1.blur();
    }, true);

    this.textbox1.addEventListener("blur", function () {
      self.textboxIsActive = false;
    }, true);





this.textbox2 = document.querySelectorAll(".msg")[0];
    this.textboxIsActive = false;
      
    this.textbox2.addEventListener("focus", function () {
      self.textboxIsActive = true;
    }, true);
      
    this.textbox2.addEventListener("mouseover", function () {
      self.textbox2.focus();
    }, true);
      
    this.textbox2.addEventListener("mouseleave", function () {
      self.textbox2.blur();
    }, true);

    this.textbox2.addEventListener("blur", function () {
      self.textboxIsActive = false;
    }, true);



//ページ読み込み時に実行させる
window.onload = function(){
　nameArea = document.getElementById("myname");
  textArea = document.getElementById("msg");
  board = document.getElementById("board");
    
    var txtEl = document.getElementById('msg'),
        outputEl = document.getElementById('output');

//    txtEl.addEventListener('keyup', function() {
//
//        var txt = txtEl.value;
//        outputEl.innerText = txt;
//
//    }, false);
    
}
 
//クリックした時に呼び出される関数
function clickEvent(){
  var text2 = textArea.value;
　var username = nameArea.value;
  sendText(text2,username);
}

 
//データベースにテキストを送信する関数
function sendText(text2,username){
  chatDataStore.push({message : text2,namae : username},function(data){
    console.log("送信完了!");
    textArea.value = "";
  });
}
 
chatDataStore.on("push",function(data){
　  addText(data.value.message);
    addName(data.value.namae);
});
 
//ユーザー名を表示させる関数
function addName(namaevalue){
  var msgDom = document.createElement("li");
  msgDom.innerHTML =  '<p class="add-name">' +namaevalue+ '</p>';
  board.insertBefore(msgDom, board.firstChild);
}


//テキストの内容を表示させる関数
function addText(text){
  var msgDom = document.createElement("li");
  msgDom.innerHTML = '<p class="add-text">' +text+ '</p>';
  board.insertBefore(msgDom, board.firstChild);
}

