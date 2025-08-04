// GSAP Animation for Nulsen Logo Leaf Shapes
document.addEventListener('DOMContentLoaded', function () {
  //********* menu animation START *********/
  const menuBtn = document.querySelector("#nav-burgar-btn");
  const menuSection = document.querySelector(".menu-section");
  const navigation = document.querySelector("#navigation");
  const windowHeight = window.innerHeight - navigation.offsetHeight;

  window.addEventListener("scroll", () => {
    if (window.scrollY >= windowHeight) {
      navigation.classList.add("fixed");
      navigation.classList.remove("sticky");
    } else {
      navigation.classList.remove("fixed");
      navigation.classList.add("sticky");
    }
  });
  // on toggle menu
  menuBtn.addEventListener("click", () => {
    if (menuBtn.classList.contains("active")) {
      const containerWidth = menuSection.offsetWidth;
      const offset = 63.11;
      const finalX = containerWidth - offset;
      gsap.to(menuSection, {
        x: `${finalX}px`,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(menuSection.querySelector(":first-child"), {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
      menuBtn.classList.remove("active");
    } else {
      gsap.to(menuSection, {
        x: "0%",
        duration: 0.5,
        ease: "power2.out",
      })
      gsap.to(menuSection.querySelector(":first-child"), {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });
      menuBtn.classList.add("active");
    }
  });
  // on close menu
  menuSection.addEventListener("click", () => {
    console.log("menuSection clicked");
    gsap.to(menuSection, {
      x: "100%",
      duration: 0.5,
      ease: "power2.out",
    });
  });
  //********* menu animation END *********/
  //********* gallery slider animation START *********/
  const boxes = gsap.utils.toArray(".box");
  let activeElement;
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
  //********* gallery slider animation END *********/
});
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
