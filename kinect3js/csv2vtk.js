


var data = csv2Array('HDFaceData.csv');
//var data2 = csv2Array('Test2.csv');

var h,i,j;
h=0;

var NoseTip=17;//5はあごっぽい？？ 21が正解っぽい?478
var M=36;
let N=53;
var face = [];

data.forEach(() => {
  face[h]=[];
  //face[h][0]=['x','y','z','vx','vy'];
  //face[h][0]=['x','y','z'];
  for(i=0;i<M;i++){
    face[h][i]=[];
    for(j=0;j<3;j++){
      if(j==2){
        face[h][i][j]=1000*data[h][i*5+j+13]-1000*data[h][NoseTip*5+2+13];
      }else{
        face[h][i][j]=1000*data[h][i*5+j+13];
      }
    }
  }
  h++;
});

let number=0;

face.forEach(()=>{

  let filename ="fxxx";
  let file_name=filename+number+".vtk";

  var content="# vtk DataFile Version 2.0\n";
  content +="# "+filename+"\n";
  content +="ASCII\n";
  content +="DATASET POLYDATA\n";
  content +="POINTS 36 double\n";

  for(i=0;i<M;i++){
    content +=face[number][i][0]+" "+face[number][i][1]+" "+face[number][i][2]+"\n";
  }

  content +="POLYGONS "+N+" "+N*4+"\n";
  content +="3 0 1 34\n";

  content +="3 1 2 34\n3 2 3 9\n3 2 3 21\n3 2 9 34\n3 4 6 9\n3 4 6 21\n3 4 9 12\n3 4 12 25\n3 4 21 25\n3 5 7 12\n3 5 7 25\n3 5 12 25\n3 6 9 30\n3 6 21 30\n3 7 11 12\n3 7 11 13\n3 7 13 16\n3 7 16 26\n3 7 24 25\n3 7 24 27\n3 7 26 27\n3 8 14 16\n3 8 16 26\n3 8 26 28\n3 9 12 18\n3 9 17 18\n3 9 17 34\n3 10 14 16\n3 10 15 16\n3 10 15 19\n3 10 18 19\n3 11 12 13\n3 12 13 32\n3 13 15 16\n3 18 12 32\n3 18 19 32\n3 20 21 25\n3 20 21 29\n3 20 23 33\n3 20 25 31\n3 20 31 33\n3 22 23 26\n3 22 23 33\n3 22 26 27\n3 23 26 28\n3 24 25 27\n3 25 27 31\n3 1 2 35\n3 0 1 35\n3 2 21 35\n3 21 29 35\n3 0 1 34\n";
  //とWriteメソッドを呼び出します。非常に簡単です。開いたファイルは必ず閉じます：
  /*
  content+="\nCELL_DATA "+N+"\nSCALARS cell-scalar float 3\nLOOKUP_TABLE default";
  for(i=0;i<N;i++){
    content+="\n0.0 1.0 0.3";
  *}
  */
  content+="\nPOINT_DATA "+M+"\nSCALARS cell-scalar float 3\nLOOKUP_TABLE default";
  for(i=0;i<M;i++){
    content +="\n"+face[number][i][0]-face[number][0][0]+" "+face[number][i][1]-face[number][0][1]+" "+face[number][i][2]-face[number][0][2];
  }




  //file.Close();
  //基本はこれだけ。異常に簡単です。

  var blob = new Blob([ content ], { "type" : "text/plain" });

  /*if (window.navigator.msSaveBlob) {
  window.navigator.msSaveBlob(blob, "f"+number+".vtk");

  // msSaveOrOpenBlobの場合はファイルを保存せずに開ける
  window.navigator.msSaveOrOpenBlob(blob, "f"+number+".vtk");
  *} else {
  document.getElementById("download").href = window.URL.createObjectURL(blob);
  *}**/


  //var fs = WScript.CreateObject("Scripting.FileSystemObject");
  //この人がファイル操作を担当してくれます。

  //FileSystemObjectから新規のテキストファイルを作ってみます：

  //var file = fs.CreateTextFile("f"+number+".vtk");
  //FileSystemObject.CreateTextFileメソッドの第1引数にファイル名を与えると新しいテキストファイルがさくっとできます。ちなみに、戻り値の型はTextStreamクラスです。このファイルに文字を書き込むには、










  //Array2CSVここから

  //var file_name = 'face.csv.'+number;
  //var file_name = 'faceShiftjis36noSpaceMath100ceil'+number+'.csv';
  //var csv_array = face[number];

  //配列をTAB区切り文字列に変換
  //var csv_string = "";

  //for (let x=0; x<csv_array.length; x++) {
  //  csv_string += csv_array[x].join(" ");
  //csv_string += "\n";
  //}

  //BOM追加
  //csv_string = "\ufffe" + csv_string; //UTF-16


  //UTF-16に変換...(1)
  //var array = [];
  //for (let x=0; x<csv_string.length; x++){
  //   array.push(csv_string.charCodeAt(x));
  //}
  //var csv_contents = new Uint16Array(array);
  //var csv_contents = array;

  //ファイル作成
  //var blob = new Blob([csv_contents] , {
  //    type: "text/csv;charset=utf-16;"
  //});

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

  number=number+1;
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
