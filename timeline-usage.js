
// Timeline Usage Example
// This file shows how to use the TimelineRenderer class

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM loaded, initializing timeline...');

  // Check if GSAP is available
  if (typeof gsap === 'undefined') {
    console.error('GSAP is not loaded!');
    return;
  }

  // Check if ScrollTrigger is available
  if (typeof ScrollTrigger === 'undefined') {
    console.error('ScrollTrigger is not loaded!');
    return;
  }

  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);
  if (typeof MotionPathPlugin !== 'undefined') {
    gsap.registerPlugin(MotionPathPlugin);
  }

  // Initialize the timeline renderer
  const timelineRenderer = new TimelineRenderer('.timeline-section');

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
      return [];
    }
  }

  // Load and render timeline data
  loadTimelineData().then(timelineData => {
    console.log('Timeline data loaded:', timelineData);
    timelineRenderer.setTimelineData(timelineData);
    timelineRenderer.render();

    // Initialize GSAP animations after timeline is rendered
    initializeGSAPAnimations();
  }).catch(error => {
    console.error('Failed to load timeline data:', error);
  });



  // Example: Add a new section dynamically
  function addNewSection() {
    const newSection = {
      type: 'history-area',
      items: [
        {
          itemType: 'basic',
          title: '1985',
          description: 'Example of a dynamically added timeline item.'
        }
      ]
    };
    timelineRenderer.addSection(newSection);
  }

  // Example: Update a section
  function updateSection() {
    timelineRenderer.updateSection(0, {
      title1: '1954-1972 (Updated)',
      title2: 'The foundations of Nulsen (Updated)'
    });
  }

  // Example: Remove a section
  function removeSection() {
    timelineRenderer.removeSection(timelineRenderer.getTimelineData().length - 1);
  }

  // Make functions available globally for testing
  window.timelineRenderer = timelineRenderer;
  window.addNewSection = addNewSection;
  window.updateSection = updateSection;
  window.removeSection = removeSection;
});

// Helper function to create timeline data from API or other sources
function createTimelineDataFromAPI(apiData) {
  return apiData.map(item => {
    // Transform API data to timeline format
    switch (item.contentType) {
      case 'header':
        return {
          type: 'timeline-header',
          title1: item.period,
          title2: item.subtitle
        };
      case 'event':
        return {
          type: 'history-area',
          items: [{
            itemType: 'basic',
            title: item.date,
            description: item.description
          }]
        };
      case 'image':
        return {
          type: 'history-area',
          items: [{
            itemType: 'with-figure',
            imageSrc: item.imageUrl,
            imageAlt: item.imageAlt,
            figureWidth: item.width || '185px',
            title: item.title
          }]
        };
      case 'video':
        return {
          type: 'history-area',
          items: [{
            itemType: 'with-video',
            title: item.title,
            videoSrc: item.videoUrl
          }]
        };
      default:
        return null;
    }
  }).filter(Boolean); // Remove null items
}

// Example of loading timeline data from a JSON file
async function loadTimelineDataFromFile(filePath) {
  try {
    const response = await fetch(filePath);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading timeline data:', error);
    return [];
  }
}

// Example usage with async data loading
async function initializeTimelineWithData() {
  const timelineRenderer = new TimelineRenderer('.timeline-section');

  // Load data from file or API
  const data = await loadTimelineDataFromFile('./timeline-data.json');

  // Set and render
  timelineRenderer.setTimelineData(data);
  timelineRenderer.render();
}

// initializeGSAPAnimations
function initializeGSAPAnimations() {
  setTimeout(() => {
    console.log('Initializing GSAP animations...');

    // Setup horizontal scroll animation for timeline
    const timelineSection = document.querySelector('.timeline-section');
    if (timelineSection) {
      // Kill any existing ScrollTrigger animations for timeline
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === timelineSection) {
          trigger.kill();
        }
      });

      gsap.to(".horizontal-section-container .horizontal-section", {
        transform: "translateX(-100%)",
        scrollTrigger: {
          trigger: ".horizontal-section-container",
          scroller: "body",
          start: "top 0%",
          end: "top -700%",
          pin: true,
          scrub: 2,
        }
      })

      gsap.to(".event-gallery-text p", {
        transform: "translateX(-145%)",
        scrollTrigger: {
          trigger: ".event-gallery-text",
          scroller: "body",
          start: "top 70%",
          end: "top 5%",
          scrub: 2,
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
        }
      })
    }

    // // Setup animations for history items
    // const historyItems = document.querySelectorAll('.history-item');
    // historyItems.forEach((item, index) => {
    //   // Add entrance animation
    //   gsap.fromTo(item,
    //     {
    //       opacity: 0,
    //       y: 50,
    //       scale: 0.9
    //     },
    //     {
    //       opacity: 1,
    //       y: 0,
    //       scale: 1,
    //       duration: 0.6,
    //       ease: "power2.out",
    //       delay: index * 0.1,
    //       scrollTrigger: {
    //         trigger: item,
    //         start: "top 80%",
    //         end: "top 20%",
    //         toggleActions: "play none none reverse"
    //       }
    //     }
    //   );

    //   // Add hover animations
    //   item.addEventListener('mouseenter', () => {
    //     gsap.to(item, {
    //       scale: 1.02,
    //       duration: 0.3,
    //       ease: "power2.out"
    //     });
    //   });

    //   item.addEventListener('mouseleave', () => {
    //     gsap.to(item, {
    //       scale: 1,
    //       duration: 0.3,
    //       ease: "power2.out"
    //     });
    //   });
    // });

    // // Setup timeline indicator animations
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
    //       delay: index * 0.1 + 0.2,
    //       scrollTrigger: {
    //         trigger: indicator,
    //         start: "top 80%",
    //         end: "top 20%",
    //         toggleActions: "play none none reverse"
    //       }
    //     }
    //   );
    // });

    // // Setup video animations
    // const videos = document.querySelectorAll('iframe');
    // videos.forEach((video, index) => {
    //   gsap.fromTo(video,
    //     {
    //       opacity: 0,
    //       scale: 0.8,
    //       rotation: -5
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