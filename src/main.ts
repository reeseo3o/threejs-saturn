import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";

class App {
  private domApp: Element;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private saturn?: THREE.Group;
  private rings?: THREE.Mesh;

  constructor() {
    this.domApp = document.querySelector("#app")!;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.domApp.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000); // 우주 배경

    this.setupCamera();
    this.setupLight();
    this.setupSaturn();
    this.setupControls();
    this.setupEvents();
  }

  private setupCamera() {
    const width = this.domApp.clientWidth;
    const height = this.domApp.clientHeight;
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.set(12, 3, 12);
    this.camera.lookAt(0, 0, 0);
  }

  private setupLight() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    this.scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.0);
    mainLight.position.set(10, 5, 10);
    this.scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-5, -2, -5);
    this.scene.add(fillLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.2);
    backLight.position.set(0, -5, -10);
    this.scene.add(backLight);
  }

  private setupSaturn() {
    this.saturn = new THREE.Group();

    const saturnGeometry = new THREE.SphereGeometry(1.5, 128, 128);
    const saturnMaterial = new THREE.MeshPhysicalMaterial({
      map: this.createSaturnTexture(),
      color: 0xf4e4bc,
      roughness: 0.5,
      metalness: 0.1,
      clearcoat: 0.3,
      clearcoatRoughness: 0.4,
    });
    const saturnMesh = new THREE.Mesh(saturnGeometry, saturnMaterial);

    const createRing = (
      innerRad: number,
      outerRad: number,
      color: number,
      opacity: number
    ) => {
      const ringGeometry = new THREE.RingGeometry(innerRad, outerRad, 256);
      const ringMaterial = new THREE.MeshPhysicalMaterial({
        color: color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: opacity,
        roughness: 0.6,
        metalness: 0.2,
        clearcoat: 0.3,
        clearcoatRoughness: 0.5,
      });
      return new THREE.Mesh(ringGeometry, ringMaterial);
    };

    const rings = [
      createRing(2.0, 2.3, 0x3c3c3c, 0.9),
      createRing(2.3, 2.8, 0xb0a89b, 0.8),
      createRing(2.8, 3.2, 0x8b7355, 0.7),
      createRing(3.2, 3.5, 0x6d6152, 0.6),
      createRing(3.5, 3.7, 0x4a4a4a, 0.4),
    ];

    const tilt = (15 * Math.PI) / 180;
    saturnMesh.rotation.z = tilt;

    rings.forEach((ring) => {
      ring.rotation.x = Math.PI / 2;
      ring.rotation.z = tilt;
      this.saturn!.add(ring);
    });

    this.saturn.rotation.y = Math.PI * 0.5;
    this.saturn.rotation.x = Math.PI * 0.05;

    this.saturn.add(saturnMesh);
    this.scene.add(this.saturn);
  }

  private setupControls() {
    new OrbitControls(this.camera!, this.domApp as HTMLElement);
  }

  private setupEvents() {
    window.onresize = this.resize.bind(this);
    this.resize();
    this.renderer.setAnimationLoop(this.render.bind(this));
  }

  private resize() {
    const width = this.domApp.clientWidth;
    const height = this.domApp.clientHeight;

    if (this.camera) {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    }

    this.renderer.setSize(width, height);
  }

  private render() {
    if (this.saturn) {
      this.saturn.rotation.y += 0.002;

      if (this.rings) {
        this.rings.rotation.z += 0.001;
      }
    }

    this.renderer.render(this.scene, this.camera!);
  }

  private createSaturnTexture(): THREE.Texture {
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 1024;
    const context = canvas.getContext("2d")!;

    // 기본 배경색
    context.fillStyle = "#f4e4bc";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // 수평 줄무늬
    const stripeCount = 200;
    for (let i = 0; i < stripeCount; i++) {
      const x = (i / stripeCount) * canvas.width; // x 좌표로 변경
      const thickness = Math.random() * 2 + 1;

      context.fillStyle = `rgba(0,0,0,${0.1 + Math.random() * 0.1})`;
      context.fillRect(x, 0, thickness, canvas.height); // 세로 방향 줄무늬
    }

    const polarGradient = context.createLinearGradient(0, 0, canvas.width, 0); // 수평 그라데이션
    polarGradient.addColorStop(0, "rgba(200, 180, 160, 0.4)");
    polarGradient.addColorStop(0.3, "rgba(200, 180, 160, 0)");
    polarGradient.addColorStop(0.7, "rgba(200, 180, 160, 0)");
    polarGradient.addColorStop(1, "rgba(200, 180, 160, 0.4)");

    context.fillStyle = polarGradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }
}

new App();
