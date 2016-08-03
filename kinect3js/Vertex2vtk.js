


var data = csv2Array('HDFaceVertex.csv');
//var data2 = csv2Array('Test2.csv');

var h,i,j;
h=0;

var NoseTip=17;//5はあごっぽい？？ 21が正解っぽい?478
var M=1347;
//let N=53;
var face = [];

data.forEach(() => {
  face[h]=[];
  //face[h][0]=['x','y','z','vx','vy'];
  //face[h][0]=['x','y','z'];
  for(i=0;i<M;i++){
    face[h][i]=[];
    for(j=0;j<3;j++){
      if(j==2){
        face[h][i][j]=1000*data[h][i*5+j+1]-1000*data[h][NoseTip*5+2+1];
      }else{
        face[h][i][j]=1000*data[h][i*5+j+1];
      }
    }
  }
  h++;
});

let number=0;

face.forEach(()=>{

  let filename ="vc";
  let file_name=filename+number+".vtk";

  var content="# vtk DataFile Version 4.0\n";
  content +="# "+filename+"\n";
  content +="ASCII\n";
  content +="DATASET POLYDATA\n";
  content +="POINTS "+M+" double\n";

  for(i=0;i<M;i++){
    content +=face[number][i][0]+" "+face[number][i][1]+" "+face[number][i][2]+"\n";
  }

  content +="LINES "+12+" "+212+"\n";
  content +="16 130 686 704 964 762 761 814 813 19 191 155 485 264 117 310 99\n";

  content +="15 710 723 963 965 812 809 829 22 202 165 270 523 130 311 104\n";
  content +="13 740 966 967 811 810 853 1072 215 179 522 143 312 116\n";
  content +="13 1154 1153 1146 1145 1150 1132 1130 1126 1129 1136 1135 1124 1122\n";
  content +="14 661 700 699 698 679 678 10 225 190 272 521 80 313 89\n";
  content +="12 1152 1147 1148 1149 1133 1131 1127 1128 1137 1134 1125 1123\n";
  content +="11 650 660 659 9 355 365 375 520 75 385 81\n";
  content +="16 625 622 649 647 644 634 631 8 356 366 376 519 70 386 76 1320\n";
  content +="19 636 652 1339 624 623 648 646 645 633 632 7 357 367 377 518 62 387 66 1319\n";

  //左目
  content +="16 1115 1114 1107 1112 1104 1103 1108 1111 210 187 121 244 137 188 287 1115\n";
//右目
  content +="15 843 1097 1096 1090 1099 1093 1101 1016 1012 987 749 733 728 777 843\n";
//輪郭
  content +="40 245 246 247 250 445 295 29 891 890 889 886 884 879 988 1059 1065 1028 1244 1030 596 595 1031 1043 1036 1038 1039 531 529 530 41 48 57 65 129 280 478 141 462 335 245\n";
  //とWriteメソッドを呼び出します。非常に簡単です。開いたファイルは必ず閉じます：
  /*
  content+="\nCELL_DATA "+N+"\nSCALARS cell-scalar float 3\nLOOKUP_TABLE default";
  for(i=0;i<N;i++){
    content+="\n0.0 1.0 0.3";
  *}
  */
  /*content+="\nPOINT_DATA "+M+"\nSCALARS cell-scalar float 3\nLOOKUP_TABLE default";
  for(i=0;i<M;i++){
    content +="\n"+face[number][i][0]+" "+face[number][i][1]+" "+face[number][i][2];
  *}
  */




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
