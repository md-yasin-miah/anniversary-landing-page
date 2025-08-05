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
    console.log('Timeline data loaded:', timelineData);
    timelineRenderer.setSectionsData(timelineData);
    timelineRenderer.render();

    // Initialize GSAP animations after timeline is rendered
    initializeGSAPAnimations();
  }).catch(error => {
    console.error('Failed to load timeline data:', error);
  });
});
// Example of loading timeline data from a JSON file
async function loadTimelineDataFromFile(filePath) {
  try {
    const response = await fetch(filePath);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading timeline data:', error);
    return { sections: [] };
  }
}

// Example usage with async data loading
async function initializeTimelineWithData() {
  const timelineRenderer = new TimelineRenderer('.horizontal-section-content');

  // Load data from file or API
  const data = await loadTimelineDataFromFile('./timeline-data.json');

  // Set and render
  timelineRenderer.setSectionsData(data);
  timelineRenderer.render();
}

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
      gsap.to('.horizontal-section-container .horizontal-section', {
        // transform: "translateX(-100%)",
        x: horizontalTransform,
        scrollTrigger: {
          trigger: ".horizontal-section-container",
          scroller: "body",
          start: "top 0%",
          end: `top -${horizontalSectionWidth * 3 / 5}px`,
          pin: true,
          scrub: 2,
        }
      })
      ScrollTrigger.create({
        trigger: ".horizontal-section-container",
        scroller: "body",
        start: "top top",
        end: `top -${horizontalSectionWidth * 3 / 5}px`,
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

    // // Setup animations for timeline sections
    // const timelineSections = document.querySelectorAll('.timeline-section');
    // // timelineSections.forEach((section, index) => {
    // //   // Add entrance animation for timeline sections
    // //   gsap.fromTo(section,
    // //     {
    // //       opacity: 0,
    // //       x: 100,
    // //       scale: 0.95
    // //     },
    // //     {
    // //       opacity: 1,
    // //       x: 0,
    // //       scale: 1,
    // //       duration: 0.8,
    // //       ease: "power2.out",
    // //       delay: index * 0.2,
    // //       scrollTrigger: {
    // //         trigger: section,
    // //         start: "right 100%",
    // //         end: "right 0%",
    // //         toggleActions: "play none none reverse",
    // //         // markers: true
    // //       }
    // //     }
    // //   );
    // // });

    // // Setup animations for content sections
    // const contentSections = document.querySelectorAll('.text-content-section, .image-content-section');
    // contentSections.forEach((section, index) => {
    //   gsap.fromTo(section,
    //     {
    //       opacity: 0,
    //       y: 50,
    //       rotation: -2
    //     },
    //     {
    //       opacity: 1,
    //       y: 0,
    //       rotation: 0,
    //       duration: 0.6,
    //       ease: "power2.out",
    //       delay: index * 0.1,
    //       scrollTrigger: {
    //         trigger: section,
    //         start: "top 80%",
    //         end: "top 20%",
    //         toggleActions: "play none none reverse"
    //       }
    //     }
    //   );
    // });

    // Setup animations for history items
    document.querySelectorAll('.history-item').forEach((item, index) => {
      const indicator = item.querySelector('.indicator');
      const content = item.querySelector('.history-item-content');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          containerAnimation: ScrollTrigger.getById('parentHorizontal'), // nest into parent scroll
          start: "left center",
          end: "left center-=100px",
          scrub: true,
          toggleActions: "play reverse play reverse",
          markers: true
        }
      });

      tl.from(indicator, {
        scale: 0,
        opacity: 0,
        transformOrigin: "center center",
        duration: 0.4,
        ease: "back.out(1.7)"
      });

      tl.from(content, {
        opacity: 0,
        scale: 0.95,
        duration: 0.4,
        ease: "power2.out"
      }, "<0.1");
    });


    // // Add hover animations
    // item.addEventListener('mouseenter', () => {
    //   gsap.to(item, {
    //     scale: 1.02,
    //     duration: 0.3,
    //     ease: "power2.out"
    //   });
    // });

    // item.addEventListener('mouseleave', () => {
    //   gsap.to(item, {
    //     scale: 1,
    //     duration: 0.3,
    //     ease: "power2.out"
    //   });
    // });
    // });

    // Setup timeline indicator animations
    // const indicators = document.querySelectorAll('.indicator');
    // indicators.forEach((indicator, index) => {
    //   gsap.fromTo(indicator,
    //     {
    //       scale: 0,
    //       opacity: 0
    //     },
    //     {
    //       scale: 1,
    //       opacity: 1,
    //       duration: 0.4,
    //       ease: "back.out(1.7)",
    //       delay: index * 0.05 + 0.2,
    //       scrollTrigger: {
    //         trigger: indicator,
    //         start: "top 85%",
    //         end: "top 15%",
    //         toggleActions: "play none none reverse"
    //       }
    //     }
    //   );
    // });

    // Setup video animations
    // const videos = document.querySelectorAll('iframe');
    // videos.forEach((video, index) => {
    //   gsap.fromTo(video,
    //     {
    //       opacity: 0,
    //       scale: 0.8,
    //       rotation: -3
    //     },
    //     {
    //       opacity: 1,
    //       scale: 1,
    //       rotation: 0,
    //       duration: 0.8,
    //       ease: "power2.out",
    //       delay: index * 0.1 + 0.3,
    //       scrollTrigger: {
    //         trigger: video,
    //         start: "top 80%",
    //         end: "top 20%",
    //         toggleActions: "play none none reverse"
    //       }
    //     }
    //   );
    // });

    console.log('GSAP animations initialized successfully!');
  }, 500);
}