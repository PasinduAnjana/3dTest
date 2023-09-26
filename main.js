import * as THREE from 'three'
import "./style.css"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

const scene=new THREE.Scene()

//screen size
const sizes={
  width:window.innerWidth,
  height:window.innerHeight,
}


const geometry =new THREE.SphereGeometry(1,32,32)
const geoCube=new THREE.BoxGeometry(1,1,1)

const material= new THREE.MeshStandardMaterial({
    color:"blue",
    roughness:.5,
    metalness:0
});


const mesh= new  THREE.Mesh(geometry,material)
const mesh1= new  THREE.Mesh(geoCube,material)

mesh1.position.set(10,0,0)

scene.add(mesh)
scene.add(mesh1)

const light=new THREE.PointLight(0xffffff,500,100)
light.position.set(0,20,10)
scene.add(light)

//camera
const camera=new THREE.PerspectiveCamera(45,sizes.width/sizes.height)
camera.position.z=60
scene.add(camera)



const canvas=document.querySelector('.webgl')
const renderer=new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width,sizes.height)

renderer.render(scene,camera)

//controls
const controls=new OrbitControls(camera,canvas)
controls.enableDamping=true;
controls.dampingFactor=.1;

//resize
window.addEventListener("resize",()=>{
  //update size
  sizes.width=window.innerWidth;
  sizes.height=window.innerHeight;

  //update camera
  camera.aspect=sizes.width/sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width,sizes.height)

})

const g=9.81
var speed=.1

const loop=()=>{
  speed+=g
  mesh.position.y-=speed/600
  //light.position.y-=.1
  controls.update()
  renderer.render(scene,camera)
  window.requestAnimationFrame(loop)
}

loop();