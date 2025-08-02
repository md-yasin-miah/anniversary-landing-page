class TimelineRenderer {
  constructor(containerSelector = '.timeline-section') {
    this.container = document.querySelector(containerSelector);
    this.timelineData = [];
  }

  // Set timeline data
  setTimelineData(data) {
    this.timelineData = data;
  }

  // Render the entire timeline
  render() {
    if (!this.container) {
      console.error('Timeline container not found');
      return;
    }

    // Clear existing content except the purple line
    const purpleLine = this.container.querySelector('.bg-purple');
    this.container.innerHTML = '';
    if (purpleLine) {
      this.container.appendChild(purpleLine);
    }

    // Render each section
    this.timelineData.forEach((section, index) => {
      this.renderSection(section, index);
    });

    // GSAP animations will be initialized by timeline-usage.js
    // No need to initialize here to avoid duplicates
  }

  // Render individual section based on type
  renderSection(section, index) {
    switch (section.type) {
      case 'timeline-header':
        this.renderTimelineHeader(section);
        break;
      case 'history-area':
        this.renderHistoryArea(section);
        break;
      case 'full-video':
        this.renderFullVideo(section);
        break;
      default:
        console.warn(`Unknown section type: ${section.type}`);
    }
  }

  // Render timeline header section
  renderTimelineHeader(data) {
    const headerHTML = `
      <div class="pl-[170px] pr-[340px] h-full flex items-center">
        <div>
          <div class="timeline-title-1">${data.title1}</div>
          <div class="timeline-title-2">${data.title2}</div>
        </div>
      </div>
    `;
    this.container.insertAdjacentHTML('beforeend', headerHTML);
  }

  // Render history area with multiple items
  renderHistoryArea(data) {
    const historyAreaHTML = `
      <div class="history-area">
        ${data.items.map(item => this.renderHistoryItem(item)).join('')}
      </div>
    `;
    this.container.insertAdjacentHTML('beforeend', historyAreaHTML);
  }

  // Render individual history item
  renderHistoryItem(item) {
    switch (item.itemType) {
      case 'basic':
        return this.renderBasicHistoryItem(item);
      case 'with-figure':
        return this.renderFigureHistoryItem(item);
      case 'with-video':
        return this.renderVideoHistoryItem(item);
      case 'with-additional-content':
        return this.renderAdditionalContentHistoryItem(item);
      case 'row-content':
        return this.renderRowContentHistoryItem(item);
      default:
        return this.renderBasicHistoryItem(item);
    }
  }

  // Render basic history item (title + description)
  renderBasicHistoryItem(item) {
    return `
      <div class="history-item">
        <div class="history-item-content">
          <div class="indicator"></div>
          <h6 class="timeline-title-3">${item.title}</h6>
          <p class="description">${item.description}</p>
        </div>
      </div>
    `;
  }

  // Render history item with figure/image
  renderFigureHistoryItem(item) {
    return `
      <div class="history-item have-figure">
        <figure class="w-[${item.figureWidth || '185px'}]">
          <img src="${item.imageSrc}" alt="${item.imageAlt || ''}">
        </figure>
        <h6 class="timeline-title-3">${item.title}</h6>
      </div>
    `;
  }

  // Render history item with embedded video
  renderVideoHistoryItem(item) {
    return `
      <div class="history-item">
        <div class="history-item-content have-figure">
          <div class="indicator"></div>
          <h6 class="timeline-title-3">${item.title}</h6>
          <iframe class="aspect-video rounded-[20px]" width="350" height="200"
            src="${item.videoSrc}" title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
          </iframe>
        </div>
      </div>
    `;
  }

  // Render history item with additional content (column layout)
  renderAdditionalContentHistoryItem(item) {
    const additionalContent = item.additionalContent ? `
      <div class="additional-content-col">
        <figure style="min-width: ${item.additionalContent.figureWidth || 'auto'};">
          <img src="${item.additionalContent.imageSrc}" alt="${item.additionalContent.imageAlt || ''}">
        </figure>
        <p class="description">${item.additionalContent.description}</p>
      </div>
    ` : '';

    return `
      <div class="history-item have-additional-content">
        <div class="history-item-content">
          <div class="indicator"></div>
          <h6 class="timeline-title-3">${item.title}</h6>
          ${item.description ? `<p class="description">${item.description}</p>` : ''}
        </div>
        ${additionalContent}
      </div>
    `;
  }

  // Render history item with row content (no title/description, just additional content)
  renderRowContentHistoryItem(item) {
    return `
      <div class="history-item have-additional-content row-content">
        <div class="additional-content-row">
          <figure>
            <img src="${item.imageSrc}" alt="${item.imageAlt || ''}">
          </figure>
          <p class="description">${item.description}</p>
        </div>
      </div>
    `;
  }

  // Render full-width video section
  renderFullVideo(data) {
    console.log('full-video type called', data);
    const fullVideoHTML = `
      <div class="h-full ml-12 z-10">
        <iframe class="aspect-video rounded-[20px]" width="auto" height="100%"
          src="${data.videoSrc}" title="YouTube video player" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    `;
    this.container.insertAdjacentHTML('beforeend', fullVideoHTML);
  }

  // Add new section to timeline
  addSection(section) {
    this.timelineData.push(section);
    this.renderSection(section, this.timelineData.length - 1);
  }

  // Update specific section
  updateSection(index, newData) {
    if (index >= 0 && index < this.timelineData.length) {
      this.timelineData[index] = { ...this.timelineData[index], ...newData };
      this.render();
    }
  }

  // Remove section
  removeSection(index) {
    if (index >= 0 && index < this.timelineData.length) {
      this.timelineData.splice(index, 1);
      this.render();
    }
  }

  // Get timeline data
  getTimelineData() {
    return this.timelineData;
  }

  // // Initialize GSAP animations for the timeline
  // initializeGSAPAnimations() {
  //   // Wait a bit for DOM to be ready
  //   setTimeout(() => {
  //     if (window.timelineGSAPManager) {
  //       window.timelineGSAPManager.refreshAnimations();
  //     } else {
  //       // Fallback to direct GSAP setup if manager is not available
  //       this.setupTimelineScrollAnimation();
  //       this.setupHistoryItemAnimations();
  //     }
  //   }, 100);
  // }

  // // Setup horizontal scroll animation for timeline
  // setupTimelineScrollAnimation() {
  //   const timelineSection = this.container;
  //   if (!timelineSection) return;

  //   // Kill any existing ScrollTrigger animations
  //   ScrollTrigger.getAll().forEach(trigger => {
  //     if (trigger.vars.trigger === timelineSection) {
  //       trigger.kill();
  //     }
  //   });

  //   // Create new horizontal scroll animation
  //   gsap.to(timelineSection, {
  //     transform: "translateX(-100%)",
  //     scrollTrigger: {
  //       trigger: ".horizontal-section-container",
  //       scroller: "body",
  //       start: "top 0%",
  //       end: "top -700%",
  //       pin: true,
  //       scrub: 2,
  //     }
  //   });
  // }

  // // Setup animations for history items
  // setupHistoryItemAnimations() {
  //   const historyItems = this.container.querySelectorAll('.history-item');

  //   historyItems.forEach((item, index) => {
  //     // Add entrance animation
  //     gsap.fromTo(item,
  //       {
  //         opacity: 0,
  //         y: 50,
  //         scale: 0.9
  //       },
  //       {
  //         opacity: 1,
  //         y: 0,
  //         scale: 1,
  //         duration: 0.6,
  //         ease: "power2.out",
  //         delay: index * 0.1,
  //         scrollTrigger: {
  //           trigger: item,
  //           start: "top 80%",
  //           end: "top 20%",
  //           toggleActions: "play none none reverse"
  //         }
  //       }
  //     );

  //     // Add hover animations
  //     item.addEventListener('mouseenter', () => {
  //       gsap.to(item, {
  //         scale: 1.02,
  //         duration: 0.3,
  //         ease: "power2.out"
  //       });
  //     });

  //     item.addEventListener('mouseleave', () => {
  //       gsap.to(item, {
  //         scale: 1,
  //         duration: 0.3,
  //         ease: "power2.out"
  //       });
  //     });
  //   });

  //   // Setup timeline indicator animations
  //   const indicators = this.container.querySelectorAll('.indicator');
  //   indicators.forEach((indicator, index) => {
  //     gsap.fromTo(indicator,
  //       {
  //         scale: 0,
  //         opacity: 0
  //       },
  //       {
  //         scale: 1,
  //         opacity: 1,
  //         duration: 0.4,
  //         ease: "back.out(1.7)",
  //         delay: index * 0.1 + 0.2,
  //         scrollTrigger: {
  //           trigger: indicator,
  //           start: "top 80%",
  //           end: "top 20%",
  //           toggleActions: "play none none reverse"
  //         }
  //       }
  //     );
  //   });

  //   // Setup video animations
  //   const videos = this.container.querySelectorAll('iframe');
  //   videos.forEach((video, index) => {
  //     gsap.fromTo(video,
  //       {
  //         opacity: 0,
  //         scale: 0.8,
  //         rotation: -5
  //       },
  //       {
  //         opacity: 1,
  //         scale: 1,
  //         rotation: 0,
  //         duration: 0.8,
  //         ease: "power2.out",
  //         delay: index * 0.1 + 0.3,
  //         scrollTrigger: {
  //           trigger: video,
  //           start: "top 80%",
  //           end: "top 20%",
  //           toggleActions: "play none none reverse"
  //         }
  //       }
  //     );
  //   });
  // }
}