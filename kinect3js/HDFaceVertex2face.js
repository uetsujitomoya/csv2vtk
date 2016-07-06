


var data = csv2Array('HDFaceData.csv');
//var data2 = csv2Array('Test2.csv');

var h,i,j;
h=0;

var NoseTip=17;//5はあごっぽい？？ 21が正解っぽい?478
var M=36;
var face = [];

data.forEach(() => {
  face[h]=[];
  //face[h][0]=['x','y','z','vx','vy'];
  face[h][0]=['x','y','z'];
  for(i=0;i<M;i++){
    face[h][i+1]=[];
    for(j=0;j<3;j++){
      if(j==2){
        face[h][i+1][j]=data[h][i*5+j+13]-data[h][NoseTip*5+2+13];
      }else{
        face[h][i+1][j]=data[h][i*5+j+13];
      }
    }
  }
  h++;
});

let number=0;

face.forEach(()=>{
  //Array2CSVここから

  //var file_name = 'face.csv.'+number;
  var file_name = 'faceShiftjisCommaBOMnashiRNnohazuJusan'+number+'.csv';
  var csv_array = face[number];

  //配列をTAB区切り文字列に変換
  var csv_string = "";
  let XMAX=36;
  //XMAX=csv_array.length
  for (let x=0; x<XMAX; x++) {
      csv_string += csv_array[x].join(",");
      csv_string += "\n";
  }

  //BOM追加
  //csv_string = "\ufffe" + csv_string; //UTF-16


  //UTF-16に変換...(1)
  var array = [];
  for (let x=0; x<csv_string.length; x++){
     array.push(csv_string.charCodeAt(x));
  }
  var csv_contents = new Uint16Array(array);
  //var csv_contents = array;

  //ファイル作成
  var blob = new Blob([csv_contents] , {
      type: "text/csv;charset=utf-16;"
  });

  //ダウンロード実行...(2)
  if (window.navigator.msSaveOrOpenBlob) {
      //IEの場合
      navigator.msSaveBlob(blob, file_name);
  } else {
      //IE以外(Chrome, Firefox)
      var downloadLink = $('<a></a>');
      downloadLink.attr('href', window.URL.createObjectURL(blob));
      downloadLink.attr('download', file_name);
      downloadLink.attr('target', '_blank');

      $('body').append(downloadLink);
      downloadLink[0].click();
      downloadLink.remove();
  }

  //Array2CSVここまで

  number=number+10;
});


function csv2Array(filePath) { //csvﾌｧｲﾙﾉ相対ﾊﾟｽor絶対ﾊﾟｽ
  var csvData = [];
  var data = new XMLHttpRequest();
  data.open("GET", filePath, false); //true:非同期,false:同期
  data.send(null);

  var LF = String.fromCharCode(10); //改行ｺｰﾄﾞ
  var lines = data.responseText.split(LF);
  for (var i = 0; i < lines.length;++i) {
    var cells = lines[i].split(",");
    if( cells.length != 1 ) {
      csvData.push(cells);
    }
  }
  return csvData;
}
