document.addEventListener('DOMContentLoaded', function () {
  if (typeof gsap === 'undefined') {
    console.error('GSAP is not loaded!');
    return;
  }

  if (typeof ScrollTrigger === 'undefined') {
    console.error('ScrollTrigger is not loaded!');
    return;
  }

  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);
  if (typeof MotionPathPlugin !== 'undefined') {
    gsap.registerPlugin(MotionPathPlugin);
  }

  // Initialize the enhanced timeline renderer
  const timelineRenderer = new TimelineRenderer('.horizontal-section-content');

  // Load timeline data from JSON file
  async function loadTimelineData() {
    try {
      const response = await fetch('./timeline-data.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error loading timeline data:', error);
      // Fallback to empty array if loading fails
      return { sections: [] };
    }
  }

  // Load and render timeline data
  loadTimelineData().then(timelineData => {
    timelineRenderer.setSectionsData(timelineData);
    timelineRenderer.render();

    // Initialize GSAP animations after timeline is rendered
    initializeGSAPAnimations();
  }).catch(error => {
    console.error('Failed to load timeline data:', error);
  });
});

// initializeGSAPAnimations
function initializeGSAPAnimations() {
  setTimeout(() => {
    console.log('Initializing GSAP animations...');
    const tl = gsap.timeline();
    const windowWidth = window.innerWidth;
    const horizontalSection = document.querySelector('.horizontal-section');
    const horizontalSectionWidth = horizontalSection.offsetWidth;
    const horizontalTransform = -horizontalSectionWidth + windowWidth;
    // Setup horizontal scroll animation for timeline
    const horizontalSectionContainer = document.querySelector('.horizontal-section-container');
    if (horizontalSection) {
      // Kill any existing ScrollTrigger animations for horizontal section
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === horizontalSectionContainer) {
          trigger.kill();
        }
      });
      // Main horizontal scroll tween
      const horizontalScrollTween = gsap.to('.horizontal-section', {
        // x: horizontalTransform,
        // ease: "none",
        // scrollTrigger: {
        //   trigger: ".horizontal-section-container",
        //   start: "top top",
        //   scroller: "body",
        //   end: () => `+=${horizontalSectionWidth}`,
        //   pin: true,
        //   scrub: 2,
        //   invalidateOnRefresh: true,
        // }
        x: horizontalTransform,
        ease: "none",
        scrollTrigger: {
          trigger: ".horizontal-section-container",
          scroller: "body",
          start: "top 0%",
          end: `top -700%`,
          pin: true,
          scrub: 2,
          invalidateOnRefresh: true,
        }
      });

      // Animate each child element (.history-item) as it enters viewport during horizontal scroll
      gsap.utils.toArray('.history-item').forEach(item => {
        gsap.fromTo(item,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            // ease: "power1.in",
            scrollTrigger: {
              trigger: item,
              scroller: "body",
              containerAnimation: horizontalScrollTween,
              start: "left center+=400px",
              toggleActions: "play reverse play reverse",
              markers: false,         // set to true to debug
            }
          }
        );
      });
      // gsap.to('.horizontal-section-container .horizontal-section', {
      //   x: horizontalTransform,
      //   scrollTrigger: {
      //     trigger: ".horizontal-section-container",
      //     scroller: "body",
      //     start: "top 0%",
      //     end: `top -700%`,
      //     pin: true,
      //     scrub: 2,
      //   }
      // })
      ScrollTrigger.create({
        trigger: ".horizontal-section-container",
        scroller: "body",
        start: "top top",
        end: `top -700%`,
        onEnter: () => {
          gsap.set(".ruler", {
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 51,
          });
        },
        onLeave: () => {
          gsap.set(".ruler", {
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 51,
          });
        },
        onEnterBack: () => {
          gsap.set(".ruler", {
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 51,
          });
        },
        onLeaveBack: () => {
          gsap.set(".ruler", {
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 51,
          });
        },
      });

      gsap.to(".event-gallery-text p", {
        transform: "translateX(-145%)",
        scrollTrigger: {
          trigger: ".event-gallery-text",
          scroller: "body",
          start: "top 90%",
          end: "top 30%",
          scrub: 2,
        }
      })

      gsap.to(".years-gallery-text p", {
        transform: "translateX(-43%)",
        scrollTrigger: {
          trigger: ".years-gallery-text",
          scroller: "body",
          start: "top 90%",
          end: "top 30%",
          scrub: 2,
        }
      })
    }
    console.log('GSAP animations initialized successfully!');
  }, 500);
}