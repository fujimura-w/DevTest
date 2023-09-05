AWS.config.update({
  accessKeyId: 'key',
  secretAccessKey: 'key',
  region: 'region'
});

var s3 = new AWS.S3();

var bucketParams = {
  Bucket : 'bucketname',
  Key: 'filename'
};

var ModelURL = "";
s3.getSignedUrl('getObject', bucketParams, function(err, url) {
  if (err) {
    console.log("Error", err);
  } else {
      console.log("Success", url);
      ModelURL = url;
    }
});

const width = 960;
const height = 540;

const canvas = document.getElementById("canvas");

const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
camera.position.set(0, 10, 20);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);

const loader = new THREE.GLTFLoader();
loader.load(ModelURL, function(gltf) { // glb file load
  scene.add(gltf.scene);
});

function tick() {
  renderer.render(scene, camera);

  requestAnimationFrame(tick);
}

tick();