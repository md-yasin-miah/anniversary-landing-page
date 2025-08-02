# Timeline Renderer Documentation

This system allows you to dynamically render timeline sections with different content types using JavaScript. The timeline renderer supports various content types and can be easily extended.

## Files Overview

- `timeline-renderer.js` - Main renderer class
- `timeline-usage.js` - Usage examples and helper functions
- `timeline-data.json` - Sample data structure
- `TIMELINE_README.md` - This documentation

## Quick Start

1. Include the JavaScript files in your HTML:
```html
<script src="./timeline-renderer.js"></script>
<script src="./timeline-usage.js"></script>
```

2. Initialize the renderer:
```javascript
const timelineRenderer = new TimelineRenderer('.timeline-section');
```

3. Set your data and render:
```javascript
timelineRenderer.setTimelineData(yourData);
timelineRenderer.render();
```

## Data Structure

The timeline data is an array of sections, where each section has a `type` property that determines how it's rendered.

### Section Types

#### 1. Timeline Header (`timeline-header`)
Creates a section with two title lines.

```javascript
{
  "type": "timeline-header",
  "title1": "1954-1972",
  "title2": "The foundations of Nulsen"
}
```

#### 2. History Area (`history-area`)
Contains multiple timeline items.

```javascript
{
  "type": "history-area",
  "items": [
    // Array of timeline items
  ]
}
```

#### 3. Full Video (`full-video`)
Creates a full-width video section.

```javascript
{
  "type": "full-video",
  "videoSrc": "https://www.youtube.com/embed/VIDEO_ID"
}
```

### Timeline Items Types

#### Basic Item (`basic`)
Simple title and description.

```javascript
{
  "itemType": "basic",
  "title": "23 September 1954",
  "description": "The Daily News article published."
}
```

#### Figure Item (`with-figure`)
Image with title.

```javascript
{
  "itemType": "with-figure",
  "imageSrc": "./assets/vector/mica-logo.svg",
  "imageAlt": "mica-logo",
  "figureWidth": "185px",
  "title": "Original MICA logo"
}
```

#### Video Item (`with-video`)
Embedded YouTube video with title.

```javascript
{
  "itemType": "with-video",
  "title": "The 60's",
  "videoSrc": "https://www.youtube.com/embed/VIDEO_ID"
  "class": "any tailwind class name"
}
```

#### Additional Content Item (`with-additional-content`)
Main content plus additional content in a column layout.

```javascript
{
  "itemType": "with-additional-content",
  "title": "1967",
  "description": "Main description here.",
  "additionalContent": {
    "imageSrc": "./assets/vector/day-room.svg",
    "imageAlt": "day-room",
    "figureWidth": "auto",
    "description": "Additional content description."
  }
}
```

#### Row Content Item (`row-content`)
Content in a row layout (no main title/description).

```javascript
{
  "itemType": "row-content",
  "imageSrc": "./assets/vector/radio-presentation.svg",
  "imageAlt": "radio-presentation",
  "description": "Description text here."
}
```

## API Methods

### TimelineRenderer Class

#### Constructor
```javascript
new TimelineRenderer(containerSelector)
```
- `containerSelector`: CSS selector for the timeline container (default: '.timeline-section')

#### Methods

##### setTimelineData(data)
Sets the timeline data and prepares for rendering.

##### render()
Renders the entire timeline based on the current data.

##### addSection(section)
Adds a new section to the timeline and re-renders.

##### updateSection(index, newData)
Updates a specific section at the given index.

##### removeSection(index)
Removes a section at the given index.

##### getTimelineData()
Returns the current timeline data array.

## Usage Examples

### Basic Usage
```javascript
// Initialize
const timelineRenderer = new TimelineRenderer('.timeline-section');

// Set data
const data = [
  {
    type: 'timeline-header',
    title1: '1954-1972',
    title2: 'The foundations of Nulsen'
  },
  {
    type: 'history-area',
    items: [
      {
        itemType: 'basic',
        title: '23 September 1954',
        description: 'The Daily News article published.'
      }
    ]
  }
];

// Render
timelineRenderer.setTimelineData(data);
timelineRenderer.render();
```

### Loading from JSON File
```javascript
async function loadTimeline() {
  const timelineRenderer = new TimelineRenderer('.timeline-section');
  
  try {
    const response = await fetch('./timeline-data.json');
    const data = await response.json();
    
    timelineRenderer.setTimelineData(data);
    timelineRenderer.render();
  } catch (error) {
    console.error('Error loading timeline data:', error);
  }
}
```

### Dynamic Updates
```javascript
// Add a new section
timelineRenderer.addSection({
  type: 'history-area',
  items: [
    {
      itemType: 'basic',
      title: '1985',
      description: 'New timeline item added dynamically.'
    }
  ]
});

// Update existing section
timelineRenderer.updateSection(0, {
  title1: '1954-1972 (Updated)',
  title2: 'Updated subtitle'
});

// Remove last section
timelineRenderer.removeSection(timelineRenderer.getTimelineData().length - 1);
```

## Helper Functions

### createTimelineDataFromAPI(apiData)
Transforms API data to timeline format.

### loadTimelineDataFromFile(filePath)
Loads timeline data from a JSON file.

### initializeTimelineWithData()
Complete initialization example with async data loading.

## Customization

### Adding New Item Types
To add a new item type, extend the `renderHistoryItem` method:

```javascript
renderHistoryItem(item) {
  switch (item.itemType) {
    // ... existing cases
    case 'your-new-type':
      return this.renderYourNewType(item);
    default:
      return this.renderBasicHistoryItem(item);
  }
}

renderYourNewType(item) {
  return `
    <div class="history-item your-custom-class">
      <!-- Your custom HTML structure -->
    </div>
  `;
}
```

### Styling
The renderer uses existing CSS classes. You can customize the appearance by modifying your CSS:

- `.timeline-title-1` - Main timeline period
- `.timeline-title-2` - Timeline subtitle
- `.timeline-title-3` - Item titles
- `.history-item` - Individual timeline items
- `.history-item-content` - Content wrapper
- `.indicator` - Timeline indicator dot
- `.description` - Description text

## Best Practices

1. **Data Validation**: Always validate your data before rendering
2. **Error Handling**: Wrap render calls in try-catch blocks
3. **Performance**: For large datasets, consider pagination or lazy loading
4. **Accessibility**: Ensure all images have proper alt text
5. **Responsive Design**: Test on different screen sizes

## Troubleshooting

### Common Issues

1. **Container not found**: Ensure the selector matches your HTML structure
2. **Images not loading**: Check file paths and ensure images exist
3. **Videos not playing**: Verify YouTube embed URLs are correct
4. **Styling issues**: Check that CSS classes are properly defined

### Debug Mode
Enable console logging by modifying the renderer:

```javascript
render() {
  console.log('Rendering timeline with data:', this.timelineData);
  // ... rest of render method
}
```

## Browser Support

- Modern browsers (ES6+)
- IE11+ (with polyfills)
- Mobile browsers

## License

This timeline renderer is provided as-is for educational and development purposes. 