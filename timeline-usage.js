
// Timeline Usage Example
// This file shows how to use the enhanced TimelineRenderer class

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM loaded, initializing enhanced timeline...');

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

  // Example: Add a new timeline section dynamically
  function addNewTimelineSection() {
    const newTimelineSection = {
      type: 'timeline-section',
      data: [
        {
          type: 'timeline-header',
          title1: '1995-2000',
          title2: 'New Era'
        },
        {
          type: 'history-area',
          items: [
            {
              itemType: 'basic',
              title: '1995',
              description: 'Example of a dynamically added timeline section.'
            }
          ]
        }
      ]
    };
    timelineRenderer.addSection(newTimelineSection);
  }

  // Example: Add a new content section dynamically
  function addNewContentSection() {
    const newContentSection = {
      type: 'content-section',
      data: {
        type: 'full-video',
        videoSrc: 'https://www.youtube.com/embed/example?start=6&autoplay=1&mute=1',
        class: 'mr-[120px]'
      }
    };
    timelineRenderer.addSection(newContentSection);
  }

  // Example: Add a text content section
  function addTextContentSection() {
    const textContentSection = {
      type: 'content-section',
      data: {
        type: 'text-content',
        title: 'Important Milestone',
        description: 'This is a significant moment in our history that deserves special attention.',
        class: 'max-w-[600px] flex flex-col gap-6'
      }
    };
    timelineRenderer.addSection(textContentSection);
  }

  // Example: Update a section
  function updateSection() {
    timelineRenderer.updateSection(0, {
      type: 'timeline-section',
      data: [
        {
          type: 'timeline-header',
          title1: '1954-1972 (Updated)',
          title2: 'The foundations of Nulsen (Updated)'
        }
      ]
    });
  }

  // Example: Remove a section
  function removeSection() {
    const sectionsCount = timelineRenderer.getSectionsData().length;
    if (sectionsCount > 0) {
      timelineRenderer.removeSection(sectionsCount - 1);
    }
  }

  // Example: Insert section at specific position
  function insertSectionAtPosition() {
    const newSection = {
      type: 'content-section',
      data: {
        type: 'image-content',
        imageSrc: './assets/vector/example.svg',
        imageAlt: 'Example image',
        caption: 'This is an example caption',
        class: 'flex justify-center items-center'
      }
    };
    timelineRenderer.insertSection(1, newSection); // Insert at index 1
  }

  // Make functions available globally for testing
  window.timelineRenderer = timelineRenderer;
  window.addNewTimelineSection = addNewTimelineSection;
  window.addNewContentSection = addNewContentSection;
  window.addTextContentSection = addTextContentSection;
  window.updateSection = updateSection;
  window.removeSection = removeSection;
  window.insertSectionAtPosition = insertSectionAtPosition;

  // Example: Add a complete new timeline section with multiple items
  window.addCompleteTimelineSection = function () {
    const newTimelineSection = {
      type: 'timeline-section',
      data: [
        {
          type: 'timeline-header',
          title1: '2000-2010',
          title2: 'Digital Transformation Era'
        },
        {
          type: 'history-area',
          items: [
            {
              itemType: 'basic',
              title: '2000',
              description: 'Nulsen embraces digital transformation and modern technology.'
            },
            {
              itemType: 'with-figure',
              imageSrc: './assets/vector/mica-logo.svg',
              imageAlt: 'Digital logo',
              figureWidth: '200px',
              title: 'New digital systems implemented'
            },
            {
              itemType: 'with-video',
              title: 'The Digital Age',
              videoSrc: 'https://www.youtube.com/embed/example?start=6&autoplay=1&mute=1'
            }
          ]
        }
      ]
    };
    timelineRenderer.addSection(newTimelineSection);
  };

  // Example: Add a mixed content section
  window.addMixedContentSection = function () {
    const mixedSection = {
      type: 'content-section',
      data: {
        type: 'text-content',
        title: 'Special Achievement',
        description: 'This section demonstrates how you can add custom content between timeline sections. It can contain any type of content including text, images, videos, or custom HTML.',
        class: 'max-w-[800px] flex flex-col gap-8 p-8 bg-white/10 rounded-[20px] backdrop-blur-sm'
      }
    };
    timelineRenderer.addSection(mixedSection);
  };

  console.log('Timeline functions available globally:');
  console.log('- addNewTimelineSection() - Add a simple timeline section');
  console.log('- addNewContentSection() - Add a video content section');
  console.log('- addTextContentSection() - Add a text content section');
  console.log('- addCompleteTimelineSection() - Add a complete timeline section with multiple items');
  console.log('- addMixedContentSection() - Add a mixed content section');
  console.log('- updateSection(index, data) - Update a specific section');
  console.log('- removeSection(index) - Remove a specific section');
  console.log('- insertSectionAtPosition() - Insert section at specific position');
});

// Helper function to create timeline data from API or other sources
function createTimelineDataFromAPI(apiData) {
  const sections = apiData.map(item => {
    // Transform API data to timeline format
    switch (item.contentType) {
      case 'timeline':
        return {
          type: 'timeline-section',
          data: [
            {
              type: 'timeline-header',
              title1: item.period,
              title2: item.subtitle
            },
            {
              type: 'history-area',
              items: item.events.map(event => ({
                itemType: 'basic',
                title: event.date,
                description: event.description
              }))
            }
          ]
        };
      case 'video':
        return {
          type: 'content-section',
          data: {
            type: 'full-video',
            videoSrc: item.videoUrl,
            class: item.class || ''
          }
        };
      case 'text':
        return {
          type: 'content-section',
          data: {
            type: 'text-content',
            title: item.title,
            description: item.description,
            class: item.class || ''
          }
        };
      case 'image':
        return {
          type: 'content-section',
          data: {
            type: 'image-content',
            imageSrc: item.imageUrl,
            imageAlt: item.imageAlt,
            caption: item.caption,
            class: item.class || ''
          }
        };
      default:
        return null;
    }
  }).filter(Boolean); // Remove null items

  return { sections };
}

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
      gsap.to(horizontalSection, {
        // transform: "translateX(-100%)",
        x: horizontalTransform,
        scrollTrigger: {
          trigger: horizontalSectionContainer,
          scroller: "body",
          start: "top 0%",
          end: `top -${horizontalSectionWidth * 2 / 3}px`,
          pin: true,
          scrub: 2,
        }
      })
      ScrollTrigger.create({
        trigger: horizontalSectionContainer,
        scroller: "body",
        start: "top top",
        end: `top -${horizontalSectionWidth * 2 / 3}px`,
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

    // Setup animations for timeline sections
    const timelineSections = document.querySelectorAll('.timeline-section');
    timelineSections.forEach((section, index) => {
      // Add entrance animation for timeline sections
      gsap.fromTo(section,
        {
          opacity: 0,
          x: 100,
          scale: 0.95
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: index * 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Setup animations for content sections
    const contentSections = document.querySelectorAll('.text-content-section, .image-content-section');
    contentSections.forEach((section, index) => {
      gsap.fromTo(section,
        {
          opacity: 0,
          y: 50,
          rotation: -2
        },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Setup animations for history items
    // const historyItems = document.querySelectorAll('.history-item');
    // historyItems.forEach((item, index) => {
    //   // Add entrance animation
    //   gsap.fromTo(item,
    //     {
    //       opacity: 0,
    //       y: 30,
    //       scale: 0.9
    //     },
    //     {
    //       opacity: 1,
    //       y: 0,
    //       scale: 1,
    //       duration: 0.5,
    //       ease: "power2.out",
    //       delay: index * 0.05,
    //       scrollTrigger: {
    //         trigger: item,
    //         start: "top 85%",
    //         end: "top 15%",
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

    // Setup timeline indicator animations
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
      gsap.fromTo(indicator,
        {
          scale: 0,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(1.7)",
          delay: index * 0.05 + 0.2,
          scrollTrigger: {
            trigger: indicator,
            start: "top 85%",
            end: "top 15%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Setup video animations
    const videos = document.querySelectorAll('iframe');
    videos.forEach((video, index) => {
      gsap.fromTo(video,
        {
          opacity: 0,
          scale: 0.8,
          rotation: -3
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: index * 0.1 + 0.3,
          scrollTrigger: {
            trigger: video,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    console.log('GSAP animations initialized successfully!');
  }, 500);
}