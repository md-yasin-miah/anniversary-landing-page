// GSAP Animation for Nulsen Logo Leaf Shapes
document.addEventListener('DOMContentLoaded', function () {
  // Get all the leaf shape paths from the SVG
  const leafShapes = document.querySelectorAll('.logo path[fill="#8F64AA"], .logo path[fill="#F48066"]');

  // Create a curved path that matches the animation sequence
  const curvedPath = {
    curviness: 1.2,
    values: [
      { x: -120, y: -40 },
      { x: -80, y: -60 },
      { x: -40, y: -50 },
      { x: 0, y: -30 },
      { x: 40, y: -10 },
      { x: 80, y: 10 },
      { x: 120, y: 30 },
      { x: 160, y: 50 },
      { x: 200, y: 70 }
    ]
  };

  // Set initial scattered positions (matching the scattered state from your images)
  const scatteredPositions = [
    { x: -150, y: -20, scale: 0.7, rotation: -20 },
    { x: -100, y: -50, scale: 0.8, rotation: 15 },
    { x: -50, y: -30, scale: 0.6, rotation: -10 },
    { x: 0, y: -60, scale: 0.9, rotation: 25 },
    { x: 50, y: -10, scale: 0.7, rotation: -15 },
    { x: 100, y: -40, scale: 0.8, rotation: 20 },
    { x: 150, y: 10, scale: 0.6, rotation: -5 },
    { x: 200, y: -20, scale: 0.9, rotation: 30 },
    { x: 250, y: 30, scale: 0.7, rotation: -25 },
    { x: 300, y: 0, scale: 0.8, rotation: 10 },
    { x: 350, y: 50, scale: 0.6, rotation: -20 },
    { x: 400, y: 20, scale: 0.9, rotation: 15 }
  ];

  // Create the main timeline
  const tl = gsap.timeline({
    // repeat: -1,
    repeatDelay: 4
  });

  // Set initial scattered state (this represents the scattered leaves from your images)
  leafShapes.forEach((leaf, index) => {
    const pos = scatteredPositions[index] || scatteredPositions[0];
    gsap.set(leaf, {
      x: pos.x,
      y: pos.y,
      scale: pos.scale,
      rotation: pos.rotation,
      opacity: 1
    });
  });

  // Animation sequence: scattered -> move along curve -> cluster together
  tl.to(leafShapes, {
    duration: 0.3,
    opacity: 0.7,
    scale: 0.8,
    ease: "power2.in"
  })
    .to(leafShapes, {
      duration: 2.5,
      motionPath: {
        path: curvedPath.values,
        curviness: curvedPath.curviness,
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
      },
      ease: "power2.inOut",
      stagger: 0.08
    }, "-=0.2")
    .to(leafShapes, {
      duration: 1.2,
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      opacity: 1,
      ease: "power2.out",
      stagger: 0.05
    }, "-=1.5");

  // Add a burst effect for some leaves (like the scattering effect in your images)
  const burstLeaves = leafShapes.slice(0, 8); // First 8 leaves will have burst effect
  tl.to(burstLeaves, {
    duration: 0.4,
    scale: 1.15,
    ease: "power2.out"
  }, "+=0.3")
    .to(burstLeaves, {
      duration: 0.3,
      scale: 1,
      ease: "power2.in"
    });

  // Add subtle floating animation for all leaves
  leafShapes.forEach((leaf, index) => {
    gsap.to(leaf, {
      duration: 4 + Math.random() * 3,
      y: -2 + Math.random() * 4,
      rotation: -0.5 + Math.random() * 1,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
      delay: index * 0.1
    });
  });

  // Add click to restart animation
  const logoContainer = document.querySelector('.logo');
  if (logoContainer) {
    logoContainer.style.cursor = 'pointer';
    logoContainer.addEventListener('click', () => {
      tl.restart();
    });
  }

  // Add hover effect
  if (logoContainer) {
    logoContainer.addEventListener('mouseenter', () => {
      gsap.to(leafShapes, {
        duration: 0.4,
        scale: 1.08,
        ease: "power2.out"
      });
    });

    logoContainer.addEventListener('mouseleave', () => {
      gsap.to(leafShapes, {
        duration: 0.4,
        scale: 1,
        ease: "power2.out"
      });
    });
  }
});

gsap.to(".event-gallery-text p", {
  transform: "translateX(-90%)",
  scrollTrigger: {
    trigger: ".event-gallery-text p",
    scroller: "body",
    start: "top 60%",
    end: "top 10%",
    // markers: true,
    scrub: 2,
    smoothScroll: true,
  }
})