class TimelineRenderer {
  constructor(
  ) {
    this.sectionsData = [];
  }

  // Set sections data
  setSectionsData(data) {
    this.sectionsData = data;
  }

  // Render all sections
  render() {
    const horizontalScrollContainer = document.querySelector('#horizontalScroll');
    // Render each section
    // this.sectionsData.forEach((section, index) => {
    //   this.renderSection(section, index);
    // });
    const horizontalScrollHtml = `
    <div class="w-fit h-full flex justify-center items-center horizontal-section-content">
          <div class="pr-[300px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="139" height="362" viewBox="0 0 139 362" fill="none">
              <path
                d="M0 231.988C13.7788 239.235 28.1249 249.557 39.9307 263.691C72.803 303.048 73.2665 356.226 68.3486 360.963C64.4662 364.715 30.3477 358.747 0 336.429V288.536C7.40698 291.078 13.4216 291.144 15.2305 288.765C18.7586 284.124 14.6634 265.666 0.0126953 251.443C0.00842569 251.439 0.00427054 251.434 0 251.43V231.988Z"
                fill="#8F64AA" />
              <path
                d="M32.6504 218.468C35.4194 212.764 69.2472 208.678 98.4756 225.016C127.704 241.355 142.021 272.209 138.458 277.702C134.894 283.195 101.855 287.548 72.6416 271.182C43.4282 254.817 29.8819 224.173 32.6504 218.468Z"
                fill="#F48066" />
              <path
                d="M0 182.01C19.3807 184.461 33.9067 195.573 33.7051 200.646C33.5089 205.566 18.7289 214.745 0 215.713V182.01Z"
                fill="#F48066" />
              <path
                d="M104.219 187.344C119.882 186.321 133.386 193.406 133.439 197.679C133.493 202.02 121.499 211.356 105.515 212.662C89.5296 213.968 75.7695 207.647 75.5742 202.374C75.3796 197.1 87.4861 188.675 103.5 187.391L104.219 187.344Z"
                fill="#8F64AA" />
              <path
                d="M60.9941 125.227C99.496 119.883 134.726 140.612 134.873 145.954C135.019 151.295 107.923 180.66 69.3994 186.01C38.6045 190.289 10.6 178.88 0 170.599V156.641C9.32205 145.654 32.297 129.211 60.9941 125.227Z"
                fill="#8F64AA" />
              <path
                d="M0 11.8278C9.18047 3.94355 16.8682 -0.0784312 19.1826 0.561202C24.9378 2.15268 43.6191 45.9688 31.1318 89.7819C24.8665 111.69 12.0173 129.324 0 141.342V11.8278Z"
                fill="#8F64AA" />
              <path
                d="M59.9961 68.6852C77.038 55.451 98.1327 53.7511 101.266 58.2028C104.398 62.6548 97.9171 82.3776 80.9209 95.5837C63.9248 108.79 43.5988 110.609 39.6299 106.072C35.6613 101.535 42.9927 81.8934 59.9961 68.6852Z"
                fill="#F48066" />
            </svg>
          </div>
          <div class="max-w-[565px] flex flex-col gap-9 pr-[153px]">
            <div class="title">
              In 1954, a father speaks up for some the world forgets...</div>
            <p class="description">
              Gwen was a young mum on the edge of a breakdown. Her daughter was born with complex disabilities and
              needed
              tending around the clock, which left no time to care for her other youngsters. Gwen's health was failing.
              Unable to cope with placing their daughter in the Claremont Mental Hospital, her husband Frank Anderson
              approached The Daily News, hoping something could be done to help parents like themselves.</p>
          </div>
          <figure class="mr-[300px] w-[563px] shrink-[0]">
            <img src="./assets/images/horizontal-section/newspaper-cut.png" alt="newspaper-cut">
          </figure>
          <div class="max-w-[610px] flex flex-col gap-9 pr-[200px]">
            <div class="title">
              From Frank Anderson's story, Nulsen Disability Services was born.
            </div>
            <p class="description">
              Today, Nulsen is one of Western Australia's leading disability services organisations focusing on people
              with complex disabilities. In this, our 60th year, we'd like to share with you stories of our history and
              the organisation that we've become.
            </p>
          </div>
          <div class="flex flex-col justify-center items-center w-[589px]">
            <figure class="">
              <img src="./assets/vector/association-logo.svg" alt="association-logo">
            </figure>
            <figure class="">
              <img src="./assets/vector/nulsen.svg" alt="nulsen-logo">
            </figure>
          </div>
        ${this.sectionsData.map((section, index) => {
      if (section.type === 'timeline-section') {
        return `
        <div class="timeline-section relative flex h-full items-end" data-section-index="${index}">
        <div class="w-full h-[1px] bg-purple absolute top-1/2 -translate-y-1/2 left-0"></div>
        ${section.data.map((timelineItem) => {
          if (timelineItem.type === 'timeline-header') {
            return this.renderTimelineHeader(timelineItem);
          } else if (timelineItem.type === 'history-area') {
            return this.renderHistoryArea(timelineItem);
          } else if (timelineItem.type === 'full-video') {
            return this.renderFullVideo(timelineItem);
          } else {
            console.warn(`Unknown timeline item type: ${timelineItem.type}`);
            return '';
          }
        })}
      </div>
        `
      } else if (section.type === 'content-section') {
        return this.renderContentSection(section, index);
      } else {
        return '';
      }
    })}
        </div>
    `;
    //     ${
    //       this.sectionsData.map((section, index) => {
    // switch (section.type) {
    //   case 'timeline-section':
    //     return this.renderTimelineSection(section, index);
    //   case 'content-section':
    //     return this.renderContentSection(section, index);
    //   default:
    //     console.warn(`Unknown section type: ${section.type}`);
    //     return '';
    // }
    // }).join('')
    // }
    if (horizontalScrollContainer) {
      horizontalScrollContainer.innerHTML = horizontalScrollHtml;
    }
  }



  // Render timeline section
  renderTimelineSection(section, index) {
    // Create timeline section container
    const timelineSectionHTML = `
      <div class="timeline-section relative flex h-full items-end" data-section-index="${index}">
        <div class="w-full h-[1px] bg-purple absolute top-1/2 -translate-y-1/2 left-0"></div>
        ${section.data.map((timelineItem, itemIndex) => {
      return this.renderTimelineItem(timelineItem, null, itemIndex);
    }).join('')}
      </div>
    `;
    return timelineSectionHTML;
  }

  // Render content section (non-timeline content)
  renderContentSection(section) {
    return this.renderContentItem(section.data);
  }

  // Render timeline item
  renderTimelineItem(item) {
    switch (item.type) {
      case 'timeline-header':
        return this.renderTimelineHeader(item);
      case 'history-area':
        return this.renderHistoryArea(item);
      case 'full-video':
        return this.renderFullVideo(item);
      default:
        console.warn(`Unknown timeline item type: ${item.type}`);
        return '';
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
  renderTimelineHeader(data) {
    return `
      <div class="pl-[170px] pr-[340px] h-full flex items-center">
        <div>
          <div class="timeline-title-1">${data.title1}</div>
          <div class="timeline-title-2">${data.title2}</div>
        </div>
      </div>
    `;
  }

  // Render history area with multiple items
  renderHistoryArea(data) {
    return `
      <div class="history-area">
        ${data.items.map(item => this.renderHistoryItem(item))}
      </div>
    `;
  }

  // Render individual history item
  renderHistoryItem(item) {
    if (item.itemType === 'basic') {
      return this.renderBasicHistoryItem(item);
    } else if (item.itemType === 'with-figure') {
      return this.renderFigureHistoryItem(item);
    } else if (item.itemType === 'with-video') {
      return this.renderVideoHistoryItem(item);
    } else if (item.itemType === 'with-additional-content') {
      return this.renderAdditionalContentHistoryItem(item);
    } else if (item.itemType === 'row-content') {
      return this.renderRowContentHistoryItem(item);
    } else {
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
          <iframe class="aspect-video rounded-[20px] flex-shrink-0" width="350" height="200"
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

  // Render full-width video section
  renderFullVideo(data) {
    console.log('renderFullVideo', data);
    return `
      <div class="h-full ml-12 z-10 ${data.class || ''} py-8">
        <iframe class="aspect-video rounded-[20px] flex-shrink-0" width="auto" height="100%"
          src="${data.videoSrc}" title="YouTube video player" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    `;
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

}