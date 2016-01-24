



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


//var video, texture, geometry, material, mesh;



var Chicken = (function () {
  function Chicken(id, x, z, message, scale, reference, scene) {
    _classCallCheck(this, Chicken);

//以下のthisはchickenインスタンスのこと。以下でchickenインスタンスのプロパティの設定を行うことで初期定義をしている。
    this.id = id;
    this.scale = scale;
    this.position = new THREE.Vector3(x, 0, z);
    this.group = new THREE.Group();
    this.scene = scene;
    this.speed = 12;
    this.rotation = 0;
    this.moving = false;
    this.rotating = false;
    this.body = reference.body.clone();
//    this.foot1 = reference.foot1.clone();
//    this.foot2 = reference.foot2.clone();
    this.name = "Dave";
    this.message = message;
    this.options = {
      size: 2,
      height: 10,
      curveSegments: 2,
      font: "07yasashisagothicbold",
      bevelEnabled: false  
    };
      
    var textShapes = THREE.FontUtils.generateShapes(this.message, this.options);
    var text = new THREE.ShapeGeometry(textShapes);
    this.textMesh = new THREE.Mesh(text, new THREE.MeshBasicMaterial({
      color: "#000000",
      side: THREE.DoubleSide
    }));
    this.textMesh.position.y = 20;
    this.textMesh.position.x = 0;
    this.group.add(this.textMesh);
    this.loadModel();
  }
    
    

  Chicken.prototype.rotate = function rotate(deg) {
    this.group.children.forEach(function (mesh) {
      if (mesh instanceof THREE.Mesh) {
        mesh.rotation.y += deg;
      }
    });
  };

  Chicken.prototype.setText = function setText(val) {
    this.group.remove(this.textMesh);
    var y = this.textMesh.position.y;
    var x = this.textMesh.position.x;
    var z = this.textMesh.position.z;
    var rotation = this.textMesh.rotation.y;
    var textShapes = THREE.FontUtils.generateShapes(val, this.options);
    var text = new THREE.ShapeGeometry(textShapes);
    this.message = val;
    this.textMesh = new THREE.Mesh(text, new THREE.MeshBasicMaterial({
      color: "#000000",
      side: THREE.DoubleSide
    }));
    this.textMesh.position.set(x, y, z);
    this.textMesh.rotation.y = rotation;
    this.group.add(this.textMesh);
  };
    
    

  Chicken.prototype.setposition = function setposition(x, z, rot) {
    this.group.children.forEach(function (mesh) {
      if (mesh instanceof THREE.Mesh) {
        mesh.rotation.y = rot;
        mesh.position.x = x;
        mesh.position.z = z;
      }
    });
  };

  Chicken.prototype.remove = function remove() {
    this.scene.remove(this.group);
  };

  Chicken.prototype.loadModel = function loadModel() {
    this.group.add(this.body);
 //   this.group.add(this.foot1);
//    this.group.add(this.foot2);
    this.group.scale.set(this.scale, this.scale, this.scale);
    this.setposition(this.position.x, this.position.z, 0);
    this.scene.add(this.group);
  };

  return Chicken;
})();





var LoadModels = (function () {
  function LoadModels() {
    _classCallCheck(this, LoadModels);

//    this.foot1 = null;
//    this.foot2 = null;
    this.body = null;
  }

//  LoadModels.prototype.load = function load() {
//    var self = this;
//    return new Promise(function (fulfill, reject) {
//      var loader = new THREE.JSONLoader();
// //     loader.load('https://api.myjson.com/bins/3h2lg', function (geometry, materials) {
//        loader.load('obj/standard-male-figure 2.json', function (geometry, materials) {
//        materials.forEach(function (e) {
//          e.morphTargets = true;
//        });
//        var material = new THREE.MeshFaceMaterial(materials);
//        self.body = new THREE.MorphAnimMesh(geometry, material);
//        self.body.duration = 700;


LoadModels.prototype.load = function load() {
    var self = this;
    return new Promise(function (fulfill, reject) {
      var loader = new THREE.ObjectLoader();
//     loader.load('https://api.myjson.com/bins/3h2lg', function (geometry, materials) {
        loader.load('obj/standard-male-figure 2.json', function (obj) {
            
//        materials.forEach(function (e) {
//          e.morphTargets = true;
//        });
//       var material = new THREE.MeshFaceMaterial();
            obj.rotation.set(0,30,0);

        self.body = new THREE.MorphAnimMesh();
        self.body.add(obj);
//        self.body.rotation.set(0,45,0);
        self.body.duration = 700;
//       
            
            
            
////        loader.load('https://api.myjson.com/bins/5bikk', function (geometry, materials) {
////          materials.forEach(function (e) {
////            e.morphTargets = true;
////          });
////          var material = new THREE.MeshFaceMaterial(materials);
////          self.foot1 = new THREE.MorphAnimMesh(geometry, material);
////          self.foot1.duration = 700;
////
////          loader.load('https://api.myjson.com/bins/19zdg', function (geometry, materials) {
////            materials.forEach(function (e) {
////              e.morphTargets = true;
////            });
////            var material = new THREE.MeshFaceMaterial(materials);
////            self.foot2 = new THREE.MorphAnimMesh(geometry, material);
////            self.foot2.duration = 700;
            fulfill();
////          });
 //       });
      });
    });
  };

  return LoadModels;
})();


//
//
////衝突判定の処理  
//setInterval(function () {
//for (var i = 0; i < 10; i++) {
//        if (self.chickens[i].id != this.id) {
//            if(data.intersect(self.chickens[i])) {
//                chat_display = true;
//                console.log("成功です");
// }else{
//     chat_display = false;
//      }
//}}}, 60);
//  
//        
// 


//世界そのものを創る関数。シーンの生成やカメラのセットなどはここで行っている
var Playground = (function () {
  function Playground() {
    _classCallCheck(this, Playground);

    var self = this;

    this.socket = null;

    this.chicken = null;
    this.chickens = [];
    this.clock = new THREE.Clock();
    this.scene = new THREE.Scene(); //シーンオブジェクトの生成
    this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);

    
      
    //床のcubeを生成  
    var geometry2 = new THREE.BoxGeometry(6000, 0, 4000);
    var material2 = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('img/bg_6x_pieces01_w1.jpg') });
      
    var mesh2 = new THREE.Mesh(geometry2, material2);
      mesh2.position.set(0,0,0);
    this.scene.add(mesh2); 
      
      
      
      
    var geometry3 = new THREE.SphereGeometry(200,40,20);
    var material3 = new THREE.MeshBasicMaterial({
//    map: texture
      color: 0x000000
    });
    var mesh3 = new THREE.Mesh(geometry3, material3);
    mesh3.position.set(-300,200,0);
    this.scene.add(mesh3);

      
    //videoの処理を追加  
    var video = document.getElementById( 'video' );
//    video.src = 'http://threejs.org/examples/textures/sintel.mp4';
    video.load();
    video.play();

    var texture = new THREE.VideoTexture( video );
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;  
    
      
    var parameters = { color: 0xffffff, map: texture };  
    var material4 = new THREE.MeshLambertMaterial( parameters );  
    var geometry4 = new THREE.BoxGeometry( 10, 800, 800 );  
    var mesh4 = new THREE.Mesh( geometry4, material4 );
    mesh4.position.set(-700,300,500);
    this.scene.add( mesh4 );

      
      
//// 立方体を用意
//var geometry5 = new THREE.BoxGeometry( 1000, 1000, 10 );
//
//// videoタグの用意
//var video = document.createElement( 'video' );
//video.src = 'mp4/sintel.mp4';
//video.load();
//video.play();
//
//// three.js用のテクスチャに変換
//var texture = new THREE.VideoTexture( video );
//texture.minFilter = THREE.LinearFilter;
//texture.magFilter = THREE.LinearFilter;
//texture.format = THREE.RGBFormat;
//
//// マテリアルに動画を貼る
//var material5 = new THREE.MeshPhongMaterial( { map: texture } );
//
//// オブジェクトを生成
//var mesh5 = new THREE.Mesh( geometry5, material5 ); 
//mesh5.position.set(0,500,-1000);
//this.scene.add( mesh5 );      
//      
      
//        //壁のcubeを生成  
//    var geometry3 = new THREE.BoxGeometry(6000, 3000, 0);
//    var material3 = new THREE.MeshBasicMaterial({
//        color: 0xFFFFFF
//    });
//      
//    var mesh3 = new THREE.Mesh(geometry3, material3);
//      mesh3.position.set(0,1500,2000);
//    this.scene.add(mesh3);  
//      
//    var mesh4 = new THREE.Mesh(geometry3, material3);
//      mesh4.position.set(0,1500,-2000);
//    this.scene.add(mesh4); 
//      
//      
//        //壁のcubeを生成  
//    var geometry5 = new THREE.BoxGeometry(0, 3000, 4000);
//    var material5 = new THREE.MeshBasicMaterial({
//        color: 0xFFFFFF
//    });
//      
//    var mesh5 = new THREE.Mesh(geometry5, material5);
//      mesh5.position.set(3000,1500,0);
//    this.scene.add(mesh5);  
//       
//    var mesh6 = new THREE.Mesh(geometry5, material5);
//      mesh6.position.set(-3000,1500,0);
//    this.scene.add(mesh6);  
//  
      
 
      
//    3Dモデルデータ読み込み：失敗
//    var obj2;    
//    var loader2 = new THREE.ObjectLoader();
//    loader2.load("obj/bedroom1.json",function ( obj2 ) {
//    obj2.scale.set( 500, 500, 500 );
//    obj2.position.set(0,0,0);
//    this.scene.add(obj2);
//      
//    });
      
      
      
    this.ambientLight = new THREE.AmbientLight("#FFFFF3");
    this.scene.add(this.ambientLight);
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    this.directionalLight.position.set(1, 0.75, 0.5).normalize();
    this.scene.add(this.directionalLight);
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    });
     
    this.camera.position.set(80, 80, 80);
    this.camera.target = new THREE.Vector3(0, 0, 0);
    this.camera.lookAt(this.camera.target);

    this.setrenderer();
      
    this.textbox = document.querySelectorAll(".chat")[0];
    this.textboxIsActive = false;
      
    this.textbox.addEventListener("focus", function () {
      self.textboxIsActive = true;
    }, true);
      
    this.textbox.addEventListener("mouseover", function () {
      self.textbox.focus();
    }, true);
      
    this.textbox.addEventListener("mouseleave", function () {
      self.textbox.blur();
    }, true);

    this.textbox.addEventListener("blur", function () {
      self.textboxIsActive = false;
    }, true);
      
      
    // 4. マウスによる操作の設定
    var controls = new THREE.OrbitControls(this.camera);

    window.addEventListener("resize", function () {
      self.onWindowResize();
    }, false);
      
    window.addEventListener("keydown", function (event) {
      self.onKeyDown(event);
    }, false);
    window.addEventListener("keyup", function (event) {
      self.onKeyUp(event);
    }, false);
    this.reference = new LoadModels();
    this.reference.load().then(function () {
      self.socket = io.connect("http://95.85.6.49:3000/");
      self.initialize();
    });
  }

  Playground.prototype.initialize = function initialize() {
    var _this = this;
    var self = this;
      
      
      
    this.socket.on("giveid", function (id) {
      self.chicken = new Chicken(id, 0, 0, "", 15, self.reference, self.scene);
      self.socket.emit("new chicken", {
        x: self.chicken.body.position.x,
        y: self.chicken.body.position.y,
        z: self.chicken.body.position.z
      });
      self.chicken.group.add(self.camera);

      self.draw();
    });
    self.socket.on("allplayers", function (data) {
      data.forEach(function (chicken) {
        var c = new Chicken(chicken.id, chicken.x, chicken.z, chicken.message, 15, self.reference, self.scene);
        c.setposition(chicken.x, chicken.z, chicken.roty);
        self.chickens.push(c);
        document.querySelector("#chickencount").textContent = self.chickens.length + 1;   
          
      });
    });
      
      
   
    self.socket.on("newplayer", function (chicken) {
      console.log(chicken.id + " is in!");
      self.chickens.push(new Chicken(chicken.id, chicken.x, chicken.z, "", 15, self.reference, self.scene));
      document.querySelector("#chickencount").textContent = self.chickens.length + 1;
    });

    self.socket.on("removeplayer", function (data) {
      for (var i = 0; i < self.chickens.length; i++) {
        if (self.chickens[i].id == data.id) {
          self.chickens[i].remove();
          self.chickens.splice(i, 1);
          break;
        }
      }
      document.querySelector("#chickencount").textContent = self.chickens.length + 1;
        
    });

    self.socket.on("message", function (chicken) {
      var movingchicken = self.chickens.find(function (chick) {
        return chick.id === chicken.id;
      });
      movingchicken.setText(chicken.message);
    });

    self.socket.on("move", function (chicken) {
      var movingchicken = self.chickens.find(function (chick) {
        return chick.id === chicken.id;
      });
      if (typeof movingchicken !== "undefined") {
        (function () {
          movingchicken.setposition(chicken.x, chicken.z, chicken.roty);
          var delta = _this.clock.getDelta();
          movingchicken.group.children.forEach(function (mesh) {
            if (mesh instanceof THREE.MorphAnimMesh) {
              mesh.updateAnimation(3000 * delta);
            }
          });
        })();
      }
    });

    setInterval(function () {
      if (self.chicken.moving || self.chicken.rotating) {
        self.socket.emit('move chicken', {
          x: self.chicken.body.position.x,
          y: self.chicken.body.position.y,
          z: self.chicken.body.position.z,
        
          roty: self.chicken.body.rotation.y
        });
      }
    }, 60);
      
      
         
        //衝突判定のメソッド     
//    setInterval(function () {
//    for (var i = 0; i < self.chickens.length; i++) {
//        if (self.chickens[i].id != data.id) {
//            if(self.chickens[i].intersect(data)) {
//                chat_display = true;
//                console.log("成功です");
// }else{
//     chat_display = false;
//      }
//}}}, 60);
      
      
      
      
  };

     
 
          
    
    
  Playground.prototype.onKeyDown = function onKeyDown(event) {
    var self = this;
    var keyCode = event.keyCode;
    if (!this.textboxIsActive) {
      switch (keyCode) {
        case 68:
          //d
          self.chicken.rotate(-0.2);
          self.chicken.rotating = true;
          break;
        case 83:
          //s
          self.chicken.moving = true;
          self.chicken.speed = -12;
          break;
        case 65:
          //a
          self.chicken.rotate(0.2);
          self.chicken.rotating = true;
          break;
        case 87:
          //w
          self.chicken.moving = true;
          self.chicken.speed = 12;
          break;
      }
        
        
    }
    if (this.textboxIsActive && keyCode === 13) {
      self.chicken.setText(self.textbox.value);
      self.socket.emit("new message", {
        message: self.chicken.message
      });
      self.textbox.value = "";
      self.textbox.blur();
    }
  };

  Playground.prototype.onKeyUp = function onKeyUp(event) {
    var self = this;
    var keyCode = event.keyCode;
    switch (keyCode) {
      case 68:
        //d
        self.chicken.rotating = false;
        break;
      case 83:
        //s
        self.chicken.moving = false;
        break;
      case 65:
        //a
        self.chicken.rotating = false;
        break;
      case 87:
        //w
        self.chicken.moving = false;
        break;
    }
  };

  Playground.prototype.onWindowResize = function onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
      
  
  };

  Playground.prototype.setrenderer = function setrenderer() {
    this.renderer.setClearColor("#FFFFFF");
    this.renderer.sortObjects = false;
    this.renderer.autoClear = false;
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    var container = document.createElement('div');
    document.body.appendChild(container);
    container.appendChild(this.renderer.domElement);
      
            

  };

  Playground.prototype.draw = function draw() {
    var self = this;
    window.requestAnimationFrame(function () {
      self.draw();
    });

    var delta = this.clock.getDelta();
    this.chicken.group.children.forEach(function (mesh) {
      if (mesh instanceof THREE.Mesh) {
        if (self.chicken.moving) {  
//          if (typeof mesh.updateAnimation !== "undefined") {
//            mesh.updateAnimation(1000 * delta);
            self.camera.position.set(mesh.position.x + 80, mesh.position.y + 80, mesh.position.z + 80);
//          }
    
          mesh.translateX(self.chicken.speed * delta);
        }
      }
    });
  

    this.renderer.clear();
    this.renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
    this.renderer.render(this.scene, this.camera);
  };
    
   

  return Playground;
})();

new Playground();

