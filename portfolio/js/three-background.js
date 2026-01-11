// Three.js 3D Background Effect
// Now enabled on all devices including mobile
document.addEventListener('DOMContentLoaded', function () {
    // Initialize 3D backgrounds for all sections
    initThreeBackground('three-canvas', 'hero');
    initThreeBackground('three-canvas-about', 'about');
    initThreeBackground('three-canvas-services', 'services');
    initThreeBackground('three-canvas-projects', 'projects');
    initThreeBackground('three-canvas-contact', 'contact');
});

function initThreeBackground(canvasId, sectionName) {
    // Get the canvas container
    const container = document.getElementById(canvasId);
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 50;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
        canvas: container,
        alpha: true,
        antialias: true
    });

    // Get container dimensions
    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width || window.innerWidth;
    const containerHeight = containerRect.height || window.innerHeight;

    renderer.setSize(containerWidth, containerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle system - adaptive count based on device
    const particlesGeometry = new THREE.BufferGeometry();
    // Reduce particles on smaller screens for performance
    const isMobile = window.innerWidth < 768;
    const particlesCount = isMobile ? 800 : 1500;

    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    // Define colors from the portfolio theme
    const colors = [
        new THREE.Color(0xEB5E28), // Orange
        new THREE.Color(0xFFFFCF2), // Cream
        new THREE.Color(0xCCC5B9), // Light Gray
        new THREE.Color(0xff7a4d)  // Orange variant
    ];

    for (let i = 0; i < particlesCount * 3; i += 3) {
        // Position
        posArray[i] = (Math.random() - 0.5) * 100;     // x
        posArray[i + 1] = (Math.random() - 0.5) * 100; // y
        posArray[i + 2] = (Math.random() - 0.5) * 100; // z

        // Color - randomly pick from theme colors
        const color = colors[Math.floor(Math.random() * colors.length)];
        colorArray[i] = color.r;
        colorArray[i + 1] = color.g;
        colorArray[i + 2] = color.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    // Particle material - adaptive size for mobile
    const particlesMaterial = new THREE.PointsMaterial({
        size: isMobile ? 0.25 : 0.15, // Larger particles on mobile for visibility
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });

    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Add connecting lines between nearby particles
    const linesGeometry = new THREE.BufferGeometry();
    const linesMaterial = new THREE.LineBasicMaterial({
        color: 0xEB5E28,
        transparent: true,
        opacity: 0.1,
        blending: THREE.AdditiveBlending
    });

    // Mouse and touch interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    // Mouse events
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Touch events for mobile
    document.addEventListener('touchmove', (event) => {
        if (event.touches.length > 0) {
            const touch = event.touches[0];
            mouseX = (touch.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(touch.clientY / window.innerHeight) * 2 + 1;
        }
    });

    // Animation
    let frame = 0;
    function animate() {
        requestAnimationFrame(animate);
        frame += 0.001;

        // Smooth mouse follow
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        // Rotate particles
        particlesMesh.rotation.y = frame * 0.5;
        particlesMesh.rotation.x = frame * 0.3;

        // Mouse parallax effect
        particlesMesh.rotation.y += targetX * 0.3;
        particlesMesh.rotation.x += targetY * 0.3;

        // Animate individual particles (wave effect)
        const positions = particlesGeometry.attributes.position.array;
        for (let i = 0; i < particlesCount; i++) {
            const i3 = i * 3;
            const x = positions[i3];
            const y = positions[i3 + 1];

            // Create wave motion
            positions[i3 + 2] = Math.sin(frame * 2 + x * 0.1) * 2 + Math.cos(frame * 2 + y * 0.1) * 2;
        }
        particlesGeometry.attributes.position.needsUpdate = true;

        // Update connecting lines
        updateLines();

        renderer.render(scene, camera);
    }

    // Function to create lines between nearby particles
    function updateLines() {
        const positions = particlesGeometry.attributes.position.array;
        const linePositions = [];
        const maxDistance = 8; // Maximum distance to connect particles

        // Adjust step based on device for performance
        const step = isMobile ? 15 : 10; // Fewer connections on mobile
        for (let i = 0; i < particlesCount; i += step) {
            const i3 = i * 3;
            const x1 = positions[i3];
            const y1 = positions[i3 + 1];
            const z1 = positions[i3 + 2];

            // Check nearby particles
            for (let j = i + step; j < Math.min(i + 100, particlesCount); j += step) {
                const j3 = j * 3;
                const x2 = positions[j3];
                const y2 = positions[j3 + 1];
                const z2 = positions[j3 + 2];

                const dx = x2 - x1;
                const dy = y2 - y1;
                const dz = z2 - z1;
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (distance < maxDistance) {
                    linePositions.push(x1, y1, z1);
                    linePositions.push(x2, y2, z2);
                }
            }
        }

        // Update lines geometry
        if (linePositions.length > 0) {
            linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

            // Remove old lines mesh if exists
            const oldLines = scene.getObjectByName('connectionLines');
            if (oldLines) {
                scene.remove(oldLines);
            }

            // Add new lines
            const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
            linesMesh.name = 'connectionLines';
            scene.add(linesMesh);
        }
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        const containerRect = container.getBoundingClientRect();
        const containerWidth = containerRect.width || window.innerWidth;
        const containerHeight = containerRect.height || window.innerHeight;

        camera.aspect = containerWidth / containerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(containerWidth, containerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        particlesGeometry.dispose();
        particlesMaterial.dispose();
        linesGeometry.dispose();
        linesMaterial.dispose();
        renderer.dispose();
    });
}
