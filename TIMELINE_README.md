# Enhanced Timeline System

This enhanced timeline system allows you to create multiple timeline sections with other content sections in between. The system dynamically renders content into the `.horizontal-section-content` container.

## Features

- **Multiple Timeline Sections**: Create multiple timeline sections with different periods
- **Mixed Content**: Add non-timeline content sections between timeline sections
- **Dynamic Rendering**: All content is rendered dynamically from JSON data
- **Flexible Structure**: Support for various content types (videos, text, images, etc.)
- **GSAP Animations**: Built-in animations for smooth user experience

## Data Structure

The timeline data is structured as follows:

```json
{
  "sections": [
    {
      "type": "timeline-section",
      "data": [
        {
          "type": "timeline-header",
          "title1": "1954-1972",
          "title2": "The foundations of Nulsen"
        },
        {
          "type": "history-area",
          "items": [
            {
              "itemType": "basic",
              "title": "23 September 1954",
              "description": "The Daily News article published."
            }
          ]
        }
      ]
    },
    {
      "type": "content-section",
      "data": {
        "type": "full-video",
        "videoSrc": "https://www.youtube.com/embed/example"
      }
    }
  ]
}
```

## Section Types

### Timeline Sections (`timeline-section`)

Timeline sections contain historical data with headers and timeline items.

**Timeline Items:**
- `timeline-header`: Section headers with title1 and title2
- `history-area`: Container for multiple timeline items
- `graphical-section`: Images or graphics

**History Item Types:**
- `basic`: Simple title and description
- `with-figure`: Item with an image/figure
- `with-video`: Item with embedded video
- `with-additional-content`: Item with additional content in columns
- `row-content`: Content in row layout

### Content Sections (`content-section`)

Content sections are non-timeline content that can be placed between timeline sections.

**Content Types:**
- `full-video`: Full-width video content
- `text-content`: Text content with title and description
- `image-content`: Image content with optional caption

## Usage

### Basic Setup

```javascript
// Initialize the timeline renderer
const timelineRenderer = new TimelineRenderer('.horizontal-section-content');

// Load and render data
loadTimelineData().then(data => {
  timelineRenderer.setSectionsData(data);
  timelineRenderer.render();
});
```

### Adding New Sections

```javascript
// Add a new timeline section
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
          description: 'Example timeline item.'
        }
      ]
    }
  ]
};
timelineRenderer.addSection(newTimelineSection);

// Add a content section
const newContentSection = {
  type: 'content-section',
  data: {
    type: 'full-video',
    videoSrc: 'https://www.youtube.com/embed/example',
    class: 'mr-[120px]'
  }
};
timelineRenderer.addSection(newContentSection);
```

### Available Functions

- `addSection(section)`: Add a new section at the end
- `insertSection(index, section)`: Insert section at specific position
- `updateSection(index, newData)`: Update a specific section
- `removeSection(index)`: Remove a specific section
- `moveSection(fromIndex, toIndex)`: Move section to different position
- `getSectionsData()`: Get current sections data

### Global Functions (for testing)

The following functions are available globally in the browser console:

- `addNewTimelineSection()`: Add a simple timeline section
- `addNewContentSection()`: Add a video content section
- `addTextContentSection()`: Add a text content section
- `addCompleteTimelineSection()`: Add a complete timeline section with multiple items
- `addMixedContentSection()`: Add a mixed content section
- `updateSection(index, data)`: Update a specific section
- `removeSection(index)`: Remove a specific section
- `insertSectionAtPosition()`: Insert section at specific position

## Examples

### Timeline Section with Multiple Items

```javascript
const timelineSection = {
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
          description: 'Digital transformation begins.'
        },
        {
          itemType: 'with-figure',
          imageSrc: './assets/vector/logo.svg',
          imageAlt: 'Logo',
          figureWidth: '200px',
          title: 'New logo introduced'
        },
        {
          itemType: 'with-video',
          title: 'The Digital Age',
          videoSrc: 'https://www.youtube.com/embed/example'
        }
      ]
    }
  ]
};
```

### Content Section with Text

```javascript
const textSection = {
  type: 'content-section',
  data: {
    type: 'text-content',
    title: 'Special Achievement',
    description: 'This is a significant milestone in our history.',
    class: 'max-w-[600px] flex flex-col gap-6'
  }
};
```

### Content Section with Image

```javascript
const imageSection = {
  type: 'content-section',
  data: {
    type: 'image-content',
    imageSrc: './assets/images/achievement.jpg',
    imageAlt: 'Achievement',
    caption: 'Celebrating our success',
    class: 'flex justify-center items-center'
  }
};
```

## Styling

The system uses Tailwind CSS classes for styling. You can add custom classes to any section or item using the `class` property.

## Animations

The system includes GSAP animations for:
- Timeline sections entrance animations
- Content sections entrance animations
- History items hover effects
- Timeline indicators animations
- Video content animations

## File Structure

- `timeline-data.json`: Contains the timeline data structure
- `timeline-renderer.js`: The main TimelineRenderer class
- `timeline-usage.js`: Usage examples and initialization
- `index.html`: HTML structure with `.horizontal-section-content` container

## Browser Console Testing

Open the browser console and use the global functions to test the timeline system:

```javascript
// Add a new timeline section
addNewTimelineSection();

// Add a content section
addNewContentSection();

// Add a complete timeline section
addCompleteTimelineSection();

// Add a mixed content section
addMixedContentSection();
``` 