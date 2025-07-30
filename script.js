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
  transform: "translateX(-145%)",
  scrollTrigger: {
    trigger: ".event-gallery-text",
    scroller: "body",
    start: "top 70%",
    end: "top 5%",
    // markers: true,
    scrub: 2,
    smoothScroll: true,
  }
})

gsap.to(".years-gallery-text p", {
  transform: "translateX(-43%)",
  scrollTrigger: {
    trigger: ".years-gallery-text",
    scroller: "body",
    start: "top 60%",
    end: "top 10%",
    scrub: 2,
    smoothScroll: true,
  }
})
gsap.to(".horizontal-section-container .horizontal-section", {
  transform: "translateX(-100%)",
  scrollTrigger: {
    trigger: ".horizontal-section-container",
    scroller: "body",
    start: "top 0%",
    end: "top -7000%",
    markers: true,
    pin: true,
    scrub: 2,
    smoothScroll: true,
  }
})



// gallery carousel
const wrapper = document.querySelector(".wrapper");

const boxes = gsap.utils.toArray(".box");

let activeElement;
let isAutoScrolling = true;
let isDragging = false;

const loop = horizontalLoop(boxes, {
  paused: false, // Start with auto-scroll enabled
  draggable: true, // make it draggable
  center: true, // active element is the one in the center of the container rather than th left edge
  speed: 1.4, // Control auto-scroll speed (lower = slower)
  repeat: -1, // Infinite repeat
  onChange: (element, index) => { // when the active element changes, this function gets called.
    activeElement && activeElement.classList.remove("active");
    element.classList.add("active");
    activeElement = element;
  },
  paddingRight: 0 // Add some padding to ensure smooth transition
});

// Add rotation animation during drag
if (loop.draggable) {
  const cards = document.querySelectorAll('.card');
  let startX = 0;

  // Function to apply directional rotation based on drag
  function applyDirectionalRotation(dragDistance) {
    const rotationAmount = Math.min(Math.abs(dragDistance) * 0.1, -1); // Max 3 degrees
    const direction = dragDistance > 0 ? 1 : -1;

    cards.forEach((card, index) => {
      // Apply rotation based on drag direction and card position
      const cardRotation = rotationAmount * direction * (1 + index * 0.1);

      gsap.to(card, {
        rotation: cardRotation,
        duration: 0.5,
        ease: "power2.out",
        scrub: 2,
      });
    });
  }

  // Function to reset rotation with bouncy effect
  function resetRotationWithBounce() {
    cards.forEach((card, index) => {
      gsap.to(card, {
        rotation: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: index * 0.05, // Stagger the bounce effect
        onComplete: () => {
          // Ensure exact reset
          gsap.set(card, { rotation: 0 });
        }
      });
    });
  }

  // Track drag start
  loop.draggable.addEventListener("press", () => {
    startX = loop.draggable.x;
    currentDragDirection = 0;
  });

  // Update rotation during drag
  loop.draggable.addEventListener("drag", () => {
    const dragDistance = loop.draggable.x - startX;
    currentDragDirection = dragDistance;
    applyDirectionalRotation(dragDistance);
  });

  // Bouncy reset on drag end
  loop.draggable.addEventListener("release", () => {
    resetRotationWithBounce();
  });
}
// boxes.forEach((box, i) => box.addEventListener("click", () => loop.toIndex(i, { duration: 0.8, ease: "power1.inOut" })));

// document.querySelector(".toggle").addEventListener("click", () => wrapper.classList.toggle("show-overflow"));
// document.querySelector(".next").addEventListener("click", () => loop.next({ duration: 0.4, ease: "power1.inOut" }));
// document.querySelector(".prev").addEventListener("click", () => loop.previous({ duration: 0.4, ease: "power1.inOut" }));




/*
This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

Features:
 - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
 - When each item animates to the left or right enough, it will loop back to the other side
 - Optionally pass in a config object with values like draggable: true, center: true, speed (default: 1, which travels at roughly 100 pixels per second), paused (boolean), repeat, reversed, and paddingRight.
 - The returned timeline will have the following methods added to it:
   - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
   - current() - returns the current index (if an animation is in-progress, it reflects the final index)
   - times - an Array of the times on the timeline where each element hits the "starting" spot.
 */
function horizontalLoop(items, config) {
  let timeline;
  items = gsap.utils.toArray(items);
  config = config || {};
  gsap.context(() => { // use a context so that if this is called from within another context or a gsap.matchMedia(), we can perform proper cleanup like the "resize" event handler on the window
    let onChange = config.onChange,
      lastIndex = 0,
      tl = gsap.timeline({
        repeat: config.repeat, onUpdate: onChange && function () {
          let i = tl.closestIndex();
          if (lastIndex !== i) {
            lastIndex = i;
            onChange(items[i], i);
          }
        }, paused: config.paused, defaults: { ease: "none" }, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
      }),
      length = items.length,
      startX = items[0].offsetLeft,
      times = [],
      widths = [],
      spaceBefore = [],
      xPercents = [],
      curIndex = 0,
      indexIsDirty = false,
      center = config.center,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
      timeOffset = 0,
      container = center === true ? items[0].parentNode : gsap.utils.toArray(center)[0] || items[0].parentNode,
      totalWidth,
      getTotalWidth = () => items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + spaceBefore[0] + items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX") + (parseFloat(config.paddingRight) || 0),
      populateWidths = () => {
        let b1 = container.getBoundingClientRect(), b2;
        items.forEach((el, i) => {
          widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
          xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / widths[i] * 100 + gsap.getProperty(el, "xPercent"));
          b2 = el.getBoundingClientRect();
          spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
          b1 = b2;
        });
        gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
          xPercent: i => xPercents[i]
        });
        totalWidth = getTotalWidth();
      },
      timeWrap,
      populateOffsets = () => {
        timeOffset = center ? tl.duration() * (container.offsetWidth / 2) / totalWidth : 0;
        center && times.forEach((t, i) => {
          times[i] = timeWrap(tl.labels["label" + i] + tl.duration() * widths[i] / 2 / totalWidth - timeOffset);
        });
      },
      getClosest = (values, value, wrap) => {
        let i = values.length,
          closest = 1e10,
          index = 0, d;
        while (i--) {
          d = Math.abs(values[i] - value);
          if (d > wrap / 2) {
            d = wrap - d;
          }
          if (d < closest) {
            closest = d;
            index = i;
          }
        }
        return index;
      },
      populateTimeline = () => {
        let i, item, curX, distanceToStart, distanceToLoop;
        tl.clear();
        for (i = 0; i < length; i++) {
          item = items[i];
          curX = xPercents[i] / 100 * widths[i];
          distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
          distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
          tl.to(item, { xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
            .fromTo(item, { xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100) }, { xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond)
            .add("label" + i, distanceToStart / pixelsPerSecond);
          times[i] = distanceToStart / pixelsPerSecond;
        }
        timeWrap = gsap.utils.wrap(0, tl.duration());
      },
      refresh = (deep) => {
        let progress = tl.progress();
        tl.progress(0, true);
        populateWidths();
        deep && populateTimeline();
        populateOffsets();
        deep && tl.draggable && tl.paused() ? tl.time(times[curIndex], true) : tl.progress(progress, true);
      },
      onResize = () => refresh(true),
      proxy;
    gsap.set(items, { x: 0 });
    populateWidths();
    populateTimeline();
    populateOffsets();
    window.addEventListener("resize", onResize);
    function toIndex(index, vars) {
      vars = vars || {};
      (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];
      if (time > tl.time() !== index > curIndex && index !== curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      if (time < 0 || time > tl.duration()) {
        vars.modifiers = { time: timeWrap };
      }
      curIndex = newIndex;
      vars.overwrite = true;
      gsap.killTweensOf(proxy);
      return vars.duration === 0 ? tl.time(timeWrap(time)) : tl.tweenTo(time, vars);
    }
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.closestIndex = setCurrent => {
      let index = getClosest(times, tl.time(), tl.duration());
      if (setCurrent) {
        curIndex = index;
        indexIsDirty = false;
      }
      return index;
    };
    tl.current = () => indexIsDirty ? tl.closestIndex(true) : curIndex;
    tl.next = vars => toIndex(tl.current() + 1, vars);
    tl.previous = vars => toIndex(tl.current() - 1, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true); // pre-render for performance
    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }
    if (config.draggable && typeof (Draggable) === "function") {
      proxy = document.createElement("div")
      let wrap = gsap.utils.wrap(0, 1),
        ratio, startProgress, draggable, dragSnap, lastSnap, initChangeX, wasPlaying,
        align = () => tl.progress(wrap(startProgress + (draggable.startX - draggable.x) * ratio)),
        syncIndex = () => tl.closestIndex(true);
      typeof (InertiaPlugin) === "undefined" && console.warn("InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/club");
      draggable = Draggable.create(proxy, {
        trigger: items[0].parentNode,
        type: "x",
        onPressInit() {
          let x = this.x;
          gsap.killTweensOf(tl);
          wasPlaying = !tl.paused();
          tl.pause();
          startProgress = tl.progress();
          refresh();
          ratio = 1 / totalWidth;
          initChangeX = (startProgress / -ratio) - x;
          gsap.set(proxy, { x: startProgress / -ratio });
        },
        onDrag: align,
        onThrowUpdate: align,
        overshootTolerance: 0,
        inertia: true,
        snap(value) {
          //note: if the user presses and releases in the middle of a throw, due to the sudden correction of proxy.x in the onPressInit(), the velocity could be very large, throwing off the snap. So sense that condition and adjust for it. We also need to set overshootTolerance to 0 to prevent the inertia from causing it to shoot past and come back
          if (Math.abs(startProgress / -ratio - this.x) < 10) {
            return lastSnap + initChangeX
          }
          let time = -(value * ratio) * tl.duration(),
            wrappedTime = timeWrap(time),
            snapTime = times[getClosest(times, wrappedTime, tl.duration())],
            dif = snapTime - wrappedTime;
          Math.abs(dif) > tl.duration() / 2 && (dif += dif < 0 ? tl.duration() : -tl.duration());
          lastSnap = (time + dif) / tl.duration() / -ratio;
          return lastSnap;
        },
        onRelease() {
          syncIndex();
          draggable.isThrowing && (indexIsDirty = true);
        },
        onThrowComplete: () => {
          syncIndex();
          wasPlaying && tl.play();
        }
      })[0];
      tl.draggable = draggable;
    }
    tl.closestIndex(true);
    lastIndex = curIndex;
    onChange && onChange(items[curIndex], curIndex);
    timeline = tl;
    return () => window.removeEventListener("resize", onResize); // cleanup
  });
  return timeline;
}