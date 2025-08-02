class TimelineRenderer {
  constructor(
    containerSelector = '.timeline-section'
  ) {
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
      case 'graphical-section':
        this.renderGraphicalSection(section);
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
    const fullVideoHTML = `
      <div class="h-full ml-12 z-10 ${data.class || ''}">
        <iframe class="aspect-video rounded-[20px]" width="auto" height="100%"
          src="${data.videoSrc}" title="YouTube video player" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    `;
    this.container.insertAdjacentHTML('beforeend', fullVideoHTML);
  }

  // render graphical section
  renderGraphicalSection(data) {
    const graphicalSectionHTML = `
      <div class="h-full z-10 ${data?.class || ''}">
        <img src="${data?.imageSrc}" alt="${data?.imageAlt || ''}">
      </div>
    `;
    this.container.insertAdjacentHTML('beforeend', graphicalSectionHTML);
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
}