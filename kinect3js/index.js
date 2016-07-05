//var v = document.getElementById("video");
/*

function getDuration() {
//動画の長さ（秒）を表示
document.getElementById("nagasa").innerHTML = v.duration;
}

function playVideo() {
//再生完了の表示をクリア
document.getElementById("kanryou").innerHTML = "";
//動画を再生
v.play();
//現在の再生位置（秒）を表示
v.addEventListener("timeupdate", function(){
document.getElementById("ichi").innerHTML = v.currentTime;
}, false);
//再生完了を知らせる
v.addEventListener("ended", function(){
document.getElementById("kanryou").innerHTML = "動画の再生が完了しました。";
}, false);
}

function pauseVideo() {
//動画を一時停止
v.pause();
}

function upVolume() {
//音量を上げる
v.volume = v.volume + 0.25;
}

function downVolume() {
//音量を下げる
v.volume = v.volume - 0.25;
}

*/

var data = csv2Array('HDFaceVertex.csv');
//var data2 = csv2Array('Test2.csv');

var g,h,i,j;
h=0;
g=0;
var position=9; //10は割といい。548?8?9!

var N=2;
var NoseTip=17;//5はあごっぽい？？ 21が正解っぽい?478
var M=1347;
var face = [];
let zMin,zMax;
let ozMin=[];
let ozMax=[];
zMin=0;
zMax=data[0][position*5+2+1]-data[0][NoseTip*5+2+1];
/*
var TrueNoseTipI;
var TrueNoseTipZ = data[0][position*5+2+1];
var TruePositionI;
var TruePositionZ = 0; //data[0][position*5+2+1];
*/
let face2=[];

data.forEach(() => {
  face[h]=[];
  face2[h]=[];
  for(i=0;i<M;i++){
    face[h][i]=[];
    for(j=0;j<5;j++){

      if(j==2){
        face[h][i][j]=data[h][i*5+j+1]-data[h][NoseTip*5+2+1];
        face2[h][i]=face[h][i][2]-face[0][i][2];
      }else{
        face[h][i][j]=data[h][i*5+j+1];
      }




      /*  if(j==2 && data[h][NoseTip*5+2+1]-face[h][i][2] > TruePositionZ ){
      TruePositionI = i;
      TruePositionZ = data[h][NoseTip*5+2+1]-face[h][i][2];
      *}*/
    }

    if(h==0){
      ozMin[i]=0;
      ozMax[i]=0;
    }else if(face[h][i][2]-face[0][i][2] > ozMax[i]){
      ozMax[i] = face[h][i][2]-face[0][i][2];
    }else if(face[h][i][2]-face[0][i][2] < ozMin[i]){
      ozMin[i] = face[h][i][2]-face[0][i][2];
    }

    if(i==position){
      if(face[h][i][2]-data[h][NoseTip*5+2+1]<zMin){
        zMin=face[h][i][2]-data[h][NoseTip*5+2+1];
      }else if(face[h][i][2]-data[h][NoseTip*5+2+1]>zMax){
        zMax=face[h][i][2]-data[h][NoseTip*5+2+1];
      }
    }

  }
  h++;
});

let number=0;

face.forEach(()=>{
  //Array2CSVここから
  console.log(number);

  var file_name = 'face'+number+'.csv';
  var csv_array = face[number];

  //配列をTAB区切り文字列に変換
  var csv_string = "";
  for (let x=0; x<csv_array.length; x++) {
      csv_string += csv_array[x].join("\t");
      csv_string += '\r\n';
  }

  //BOM追加
  csv_string = "\ufffe" + csv_string; //UTF-16
  console.log (csv_string);

  //UTF-16に変換...(1)
  var array = [];
  for (let x=0; x<csv_string.length; x++){
     array.push(csv_string.charCodeAt(x));
  }
  var csv_contents = new Uint16Array(array);

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

  number++;
});



//console.log(h);

const ozMaxMax=Math.max.apply(null, ozMax);
const ozMinMin=Math.min.apply(null, ozMin);


//console.info(TruePositionI);
//console.info(zMin);
//console.info(zMax);

var mouth=[];
//var mouthset=[]
/*for(h=0;h<=574;h++){
*  mouth[h]=[];
*  data2.forEach((item) => {
*    if(item[3]==h){
*      mouth[h]+=item;
*    }
*  });
*}*/
console.info(mouth);


//var getCSV = d3.dsv(',', 'text/csv; charset=shift_jis');
//var mouthdata= new Object();
//mouthdata = getCSV('Test2_3.csv', (d) => {
//});

/*
let grad=[];
let zPoint=[];
*/
/*
for(i=0; i<M; i++){
  zPoint[i]=[];
  zPoint[i][0] = ozMin[i];
  zPoint[i][1] = ozMin[i]+(0-ozMin[i])/4;
  zPoint[i][2] = ozMin[i]+(0-ozMin[i])/2;
  zPoint[i][3] = ozMin[i]+(0-ozMin[i])*5/8;
  zPoint[i][4] = 0;
  zPoint[i][5] = ozMax[i];

  grad[i]=[];
  grad[i][0] = d3.scale.linear().domain([zPoint[i][0],zPoint[i][1]]).range(["#ff0000","#ffff00"]);
  grad[i][1] = d3.scale.linear().domain([zPoint[i][1],zPoint[i][2]]).range(["#ffff00","#00ff00"]);
  grad[i][2] = d3.scale.linear().domain([zPoint[i][2],zPoint[i][3]]).range(["#00ff00","#00ffff"]);
  grad[i][3] = d3.scale.linear().domain([zPoint[i][3],zPoint[i][4]]).range(["#00ffff","#0000ff"]);
  grad[i][4] = d3.scale.linear().domain([zPoint[i][4],zPoint[i][5]]).range(["#0000ff","#ffffff"]);

}
*/
const z0 = ozMinMin;
const z1 = ozMinMin+(0-ozMinMin)*1/2;
const z2 = ozMinMin+(0-ozMinMin)*9/16;
const z3 = ozMinMin+(0-ozMinMin)*5/8;
const z4 = 0;
const z5 = ozMaxMax;


let grad4 = d3.scale.linear().domain([z4,z5]).range(["#0000ff","#ffffff"]);
let grad3 = d3.scale.linear().domain([z3,z4]).range(["#00ffff","#0000ff"]);
let grad2 = d3.scale.linear().domain([z2,z3]).range(["#00ff00","#00ffff"]);
let grad1 = d3.scale.linear().domain([z1,z2]).range(["#ffff00","#00ff00"]);
let grad0 = d3.scale.linear().domain([z0,z1]).range(["#ff0000","#ffff00"]);

h=0;


// global variables
var renderer;
var scene;
var camera;
var control;
var cameraControl;
var stats;
var sphere =[];

/**
* Initializes the scene, camera and objects. Called when the window is
* loaded by using window.onload (see below)
*/
function init() {

  // create a scene, that will hold all our elements such as objects, cameras and lights.


  scene = new THREE.Scene();

  // create a camera, which defines where we're looking at.
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.lookAt(scene.position);

  // add controls
  cameraControl = new THREE.OrbitControls(camera);


  // setup the control object for the control gui
  control = new function () {
    this.rotationSpeed = 0.005;
    this.opacity = 0.6;
  };

  // add extras
  addControlGui(control);
  addStatsObject();

  // create a render, sets the background color and the size
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x000000, 1.0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  //renderer.shadowMapEnabled = true;

  // create the ground plane
  var planeGeometry = new THREE.PlaneGeometry(20, 20);
  var planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  //plane.receiveShadow = true;

  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 0;
  plane.position.y = -2;
  plane.position.z = 0;

  // add the plane to the scene
  //scene.add(plane);

  // create a cube
  var cubeGeometry = new THREE.BoxGeometry(6, 4, 6);
  var cubeMaterial = new THREE.MeshLambertMaterial({color: 'red'});
  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

  //cube.castShadow = true;
  cube.position.x = 0.1;
  cube.position.y = 0;
  cube.position.z = 0;

  // add the cube to the scene
  //scene.add(cube);


  var sphereGeo = new THREE.SphereGeometry(0.10);  // 半径10の球

  //for文の外でgreanMaterial宣言して配列にすりゃいいんじゃね
  for(i=0;i<M;i++){
    let greanMaterial;
    if( face2[h][i] > z4 ){
      greanMaterial = new THREE.MeshLambertMaterial( { color: grad4(face2[h][i]) } );
    }else if( face2[h][i] < z1 ){
      greanMaterial = new THREE.MeshLambertMaterial( { color: grad0(face2[h][i]) } );
    }else if(face2[h][i] > z3 ){
      greanMaterial = new THREE.MeshLambertMaterial( { color: grad3(face2[h][i]) } );
    }else if(face2[h][i] < z2 ){
      greanMaterial = new THREE.MeshLambertMaterial( { color: grad1(face2[h][i]) } );
    }else{
      greanMaterial = new THREE.MeshLambertMaterial( { color: grad2(face2[h][i]) } );
    }
    sphere[i] = new THREE.Mesh( sphereGeo, greanMaterial );
    sphere[i].position.x = (face[h][i][0])*50;
    sphere[i].position.y = (face[h][i][1])*50;
    sphere[i].position.z = (face[h][i][2]-data[h][NoseTip*5+2+1])*50-60;
    sphere[i].geometry.name = i;
    scene.add( sphere[i] );

    //show solarSystemName
    /*var textGeo = new THREE.TextGeometry(
    *i,
    *{
    font: "helvetiker",
    size: 2,
    curveSegments: 8,
    height:10,
    bevelEnabled: false, bevelSize: 3, bevelThickness: 5, bevelSegments: 2
    *}
    *);
    var textMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff } );
    sText[i] = new THREE.Mesh( textGeo, textMaterial );
    sText[i].position = sphere[i].position;
    //star_text.push(sText);
    scene.add(sText);*/
  }



  // position and point the camera to the center of the scene
  camera.position.x = 15;
  camera.position.y = 16;
  camera.position.z = 13;
  camera.lookAt(scene.position);

  // add spotlight for the shadows
  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(10, 20, 20);
  //spotLight.shadowCameraNear = 20;
  //spotLight.shadowCameraFar = 50;
  //spotLight.castShadow = true;

  scene.add(spotLight);

  var spotLight2 = new THREE.SpotLight(0xffffff);
  spotLight2.position.set(-10, -20, -20);
  scene.add(spotLight2);

  // add the output of the renderer to the html element
  document.body.appendChild(renderer.domElement);

  // call the render function, after the first render, interval is determined
  // by requestAnimationFrame
  render();
}

/**
* Called when the scene needs to be rendered. Delegates to requestAnimationFrame
* for future renders
*/

function addStatsObject() {
  stats = new Stats();
  stats.setMode(0);

  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';

  document.body.appendChild(stats.domElement);
}

function addControlGui(controlObject) {
  var gui = new dat.GUI();
  gui.add(controlObject, 'rotationSpeed', -0.01, 0.01);
}

function render() {
  // render using requestAnimationFrame
  stats.update();
  requestAnimationFrame(render);

  if(g<face.length*N){g++;}
  if(g%N==0){h++;
    for(i=0;i<M;i++){
      if(face2[h][i] > z4){
        sphere[i].material.color.r = parseInt(grad4(face2[h][i]).substr(1,2),16)/256; //16進最初の2けたを抜き出して10進に戻し、256で割る;
        sphere[i].material.color.g = parseInt(grad4(face2[h][i]).substr(3,2),16)/256;
        sphere[i].material.color.b = parseInt(grad4(face2[h][i]).substr(5,2),16)/256;
      }else if( face2[h][i] < z1 ){
        sphere[i].material.color.r = parseInt(grad0(face2[h][i]).substr(1,2),16)/256; //16進最初の2けたを抜き出して10進に戻し、256で割る;
        sphere[i].material.color.g = parseInt(grad0(face2[h][i]).substr(3,2),16)/256;
        sphere[i].material.color.b = parseInt(grad0(face2[h][i]).substr(5,2),16)/256;
      }else if(face2[h][i] > z3 ){
        sphere[i].material.color.r = parseInt(grad3(face2[h][i]).substr(1,2),16)/256; //16進最初の2けたを抜き出して10進に戻し、256で割る;
        sphere[i].material.color.g = parseInt(grad3(face2[h][i]).substr(3,2),16)/256;
        sphere[i].material.color.b = parseInt(grad3(face2[h][i]).substr(5,2),16)/256;
      }else if(face2[h][i] < z2 ){
        sphere[i].material.color.r = parseInt(grad1(face2[h][i]).substr(1,2),16)/256; //16進最初の2けたを抜き出して10進に戻し、256で割る;
        sphere[i].material.color.g = parseInt(grad1(face2[h][i]).substr(3,2),16)/256;
        sphere[i].material.color.b = parseInt(grad1(face2[h][i]).substr(5,2),16)/256;
      }else{
        sphere[i].material.color.r = parseInt(grad2(face2[h][i]).substr(1,2),16)/256; //16進最初の2けたを抜き出して10進に戻し、256で割る;
        sphere[i].material.color.g = parseInt(grad2(face2[h][i]).substr(3,2),16)/256;
        sphere[i].material.color.b = parseInt(grad2(face2[h][i]).substr(5,2),16)/256;
      }

      sphere[i].position.x = (face[h][i][0])*50;
      sphere[i].position.y = (face[h][i][1])*50;
      sphere[i].position.z = (face[h][i][2])*50;
      scene.add( sphere[i] );
    }
  }

  cameraControl.update();
  renderer.render(scene, camera);
}

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


/**
* Function handles the resize event. This make sure the camera and the renderer
* are updated at the correct moment.
*/
function handleResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// calls the init function when the window is done loading.
window.onload = init;
// calls the handleResize function when the window is resized
window.addEventListener('resize', handleResize, false);
