class TimelineRenderer {
  constructor(
    containerSelector = '.horizontal-section-content'
  ) {
    this.container = document.querySelector(containerSelector);
    this.sectionsData = [];
  }

  // Set sections data
  setSectionsData(data) {
    this.sectionsData = data.sections || data;
  }

  // Render all sections
  render() {
    if (!this.container) {
      console.error('Container not found:', this.containerSelector);
      return;
    }

    // Clear existing content
    // this.container.innerHTML = '';

    // Render each section
    this.sectionsData.forEach((section, index) => {
      this.renderSection(section, index);
    });
  }

  // Render individual section based on type
  renderSection(section, index) {
    switch (section.type) {
      case 'timeline-section':
        this.renderTimelineSection(section, index);
        break;
      case 'content-section':
        this.renderContentSection(section, index);
        break;
      default:
        console.warn(`Unknown section type: ${section.type}`);
    }
  }

  // Render timeline section
  renderTimelineSection(section, index) {
    // Create timeline section container
    const timelineSectionHTML = `
      <div class="timeline-section relative flex h-full items-end" data-section-index="${index}">
        <div class="w-full h-[1px] bg-purple absolute top-1/2 -translate-y-1/2 left-0"></div>
      </div>
    `;
    this.container.insertAdjacentHTML('beforeend', timelineSectionHTML);

    // Get the newly created timeline section
    const timelineSection = this.container.querySelector(`[data-section-index="${index}"]`);

    // Render timeline content
    section.data.forEach((timelineItem, itemIndex) => {
      this.renderTimelineItem(timelineItem, timelineSection, itemIndex);
    });
  }

  // Render content section (non-timeline content)
  renderContentSection(section, index) {
    const contentHTML = this.renderContentItem(section.data);
    this.container.insertAdjacentHTML('beforeend', contentHTML);
  }

  // Render timeline item
  renderTimelineItem(item, container, index) {
    switch (item.type) {
      case 'timeline-header':
        this.renderTimelineHeader(item, container);
        break;
      case 'history-area':
        this.renderHistoryArea(item, container);
        break;
      case 'full-video':
        return this.renderFullVideo(item, container);
      default:
        console.warn(`Unknown timeline item type: ${item.type}`);
    }
  }

  // Render content item
  renderContentItem(item) {
    switch (item.type) {
      case 'text-content':
        return this.renderTextContent(item);
      case 'image-content':
        return this.renderImageContent(item);
      default:
        console.warn(`Unknown content item type: ${item.type}`);
        return '';
    }
  }

  // Render timeline header section
  renderTimelineHeader(data, container) {
    const headerHTML = `
      <div class="pl-[170px] pr-[340px] h-full flex items-center">
        <div>
          <div class="timeline-title-1">${data.title1}</div>
          <div class="timeline-title-2">${data.title2}</div>
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', headerHTML);
  }

  // Render history area with multiple items
  renderHistoryArea(data, container) {
    const historyAreaHTML = `
      <div class="history-area">
        ${data.items.map(item => this.renderHistoryItem(item)).join('')}
      </div>
    `;
    container.insertAdjacentHTML('beforeend', historyAreaHTML);
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
      <div class="history-item ${item?.class || ''}">
        <div class="history-item-content">
          <div class="indicator"></div>
          <h6 class="timeline-title-3">${item?.title}</h6>
          <p class="description">${item?.description}</p>
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
      <div class="additional-content-col shrink-0">
        <figure class="${item.additionalContent.figureClass || ''}" style="min-width: ${item.additionalContent.figureWidth || 'auto'};">
          <img src="${item.additionalContent.imageSrc}" alt="${item.additionalContent.imageAlt || ''}">
        </figure>
        <p class="description">${item?.additionalContent?.description || ''}</p>
      </div>
    ` : '';

    return `
      <div class="history-item have-additional-content">
        <div class="history-item-content">
          ${item?.title ? `
            <div class="indicator"></div>
            <h6 class="timeline-title-3">${item?.title}</h6>
          ` : ''}
          ${item?.description ? `<p class="description">${item.description}</p>` : ''}
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

  // Render graphical section
  renderGraphicalSection(data, container) {
    const graphicalSectionHTML = `
      <div class="h-full z-10 ${data?.class || ''}">
        <img src="${data?.imageSrc}" alt="${data?.imageAlt || ''}">
      </div>
    `;
    container.insertAdjacentHTML('beforeend', graphicalSectionHTML);
  }

  // Render full-width video section
  renderFullVideo(data, container) {
    console.log('renderFullVideo', data);
    const fullVideoHTML = `
      <div class="h-full ml-12 z-10 ${data.class || ''} py-8">
        <iframe class="aspect-video rounded-[20px]" width="auto" height="100%"
          src="${data.videoSrc}" title="YouTube video player" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', fullVideoHTML);
  }

  // Render text content section
  renderTextContent(data) {
    return `
      <div class="text-content-section ${data.class || ''}">
        <h2 class="text-title">${data.title}</h2>
        <p class="text-description">${data.description}</p>
      </div>
    `;
  }

  // Render image content section
  renderImageContent(data) {
    return `
      <div class="image-content-section px-20 ${data.class || ''}">
        <img src="${data.imageSrc}" alt="${data.imageAlt || ''}" class="content-image">
        ${data.caption ? `<p class="image-caption">${data.caption}</p>` : ''}
      </div>
    `;
  }

  // Add new section
  addSection(section) {
    this.sectionsData.push(section);
    this.renderSection(section, this.sectionsData.length - 1);
  }

  // Update specific section
  updateSection(index, newData) {
    if (index >= 0 && index < this.sectionsData.length) {
      this.sectionsData[index] = { ...this.sectionsData[index], ...newData };
      this.render();
    }
  }

  // Remove section
  removeSection(index) {
    if (index >= 0 && index < this.sectionsData.length) {
      this.sectionsData.splice(index, 1);
      this.render();
    }
  }

  // Get sections data
  getSectionsData() {
    return this.sectionsData;
  }

  // Insert section at specific index
  insertSection(index, section) {
    if (index >= 0 && index <= this.sectionsData.length) {
      this.sectionsData.splice(index, 0, section);
      this.render();
    }
  }

  // Move section from one position to another
  moveSection(fromIndex, toIndex) {
    if (fromIndex >= 0 && fromIndex < this.sectionsData.length &&
      toIndex >= 0 && toIndex < this.sectionsData.length) {
      const section = this.sectionsData.splice(fromIndex, 1)[0];
      this.sectionsData.splice(toIndex, 0, section);
      this.render();
    }
  }
}