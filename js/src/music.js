var lastIndex;
var musicJsons;
$.getJSON("/json/music.json", function (data) {
  musicJsons = data;
    for(var i = 0; i < musicJsons.length; i++){
       musicJsons[i].loop = false;
       var $li = $('<li><span>' + musicJsons[i].title + '</span> ---- [' + musicJsons[i].author + ']</li>')
       $li.attr('id', i);
       $li.css('list-style-type', 'none');
       $li.css('height', '40px');
       $li.css('color', '#888888');
       $li.click(function(event){
          playMusic(musicJsons[this.id]);
          $('#musiclist #' +lastIndex).css('color', '#888888');
          $(this).css('color','#FF6932');
          lastIndex = this.id;
          mePlayerMethod.play();
       });
       var $musiclist = $('#musiclist');
       $musiclist.append($li);
    }
    var $loopbutton = $('#musicarea #music-loop');
    $loopbutton.text('列表循环')
    $loopbutton.click(function(){
      if(window.Notification && Notification.permission !== "denied" && Notification.permission !== "granted") {
        Notification.requestPermission(function(status) { });
      }
      if('单曲循环' == $(this).text()){
        $(this).text('列表循环')
        for(var j = 0; j < musicJsons.length; j++){
          musicJsons[j].loop = true;
        }
      }else{
        if('列表循环' == $(this).text()){
          $(this).text('随机播放');
        }else{
          $(this).text('单曲循环');
        }
        for(var j = 0; j < musicJsons.length; j++){
            musicJsons[j].loop = false;
        }
      }
    })
    var index = Math.floor(Math.random()*musicJsons.length);
    $('#musiclist #' + index).css('color','#FF6932');
    lastIndex = index;
    playMusic(musicJsons[index]);
    //document.querySelector('button').addEventListener('click', function() {
    //  mePlayerMethod.toggleTheme()
    //})
});

function playMusic(data, playendcallback){
  document.title = data.title + '--' + data.author;
  mePlayer({
    theme: 'default',
    music: data,
    target: '.music',
    autoplay: false
  }, function(){
      if('单曲循环' == $('#musicarea #loop').text()){
        playMusic(musicJsons[lastIndex]);
      } else {
        var index;
        if('列表循环' == $('#musicarea #loop').text()){
          index = lastIndex+1;
          if(index >= musicJsons.length){
            index = 0;
          }
        }else{
          index = Math.floor(Math.random()*musicJsons.length);
        }
        playMusic(musicJsons[index]);
        $('#musiclist #' +lastIndex).css('color', '#888888');
        $('#musiclist #' +index).css('color','#FF6932');
        lastIndex = index;
      }
      mePlayerMethod.play();
  });
  //$('#musiclrc').html($(lyricArea).html());
  //window.setTimeout(mePlayerMethod.play, 500);
}