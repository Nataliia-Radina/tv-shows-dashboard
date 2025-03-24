# TV Shows Dashboard

A modern, responsive web application built with Vue 3 and Vite that allows users to browse and search TV shows using the TVMaze API.

## Live Demo

Visit the live application at: [https://nataliia-radina.github.io/tv-shows-dashboard/](https://nataliia-radina.github.io/tv-shows-dashboard/)

## Features

- Browse TV shows by genre
- Search functionality with keyboard support
- Modern UI with smooth animations
- Full keyboard accessibility
- Responsive design for all devices
- Lazy loading images for better performance
- Detailed show information including schedule and network

## Tech Stack

- Vue 3 with Composition API
- Vite for fast development
- Vue Router for navigation
- TVMaze API for show data
- CSS Grid and Flexbox for layouts
- Modern CSS variables for theming

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Run development server:
```bash
npm run dev
```

## Usage

- Browse shows by scrolling through genre categories
- Use the search bar to find specific shows
  - Type to search
  - Press Enter/click X to clear search
  - Press Escape to clear search
- Click on a show card to view details
- Use the back button or keyboard to navigate

## Accessibility

The application is built with accessibility in mind:
- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Focus management
- Clear visual feedback
- Consistent color contrast

## Styling

The application uses a custom color scheme:
- Dark theme with mint accents
- Consistent spacing and typography
- Smooth transitions and hover effects
- Responsive breakpoints for all devices

## Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

The production build will be created in the `dist` directory, optimized with:
- Minified JavaScript and CSS
- Asset optimization
- Tree-shaking
- Modern browser support

### Deployment

The application is automatically deployed to GitHub Pages using GitHub Actions. When changes are pushed to the main branch:

1. The GitHub Action workflow builds the application
2. Deploys it to the gh-pages branch
3. Makes it available at [https://nataliia-radina.github.io/tv-shows-dashboard/](https://nataliia-radina.github.io/tv-shows-dashboard/)

To deploy manually:
```bash
# Build the application
npm run build

# Deploy to GitHub Pages
git subtree push --prefix dist origin gh-pages
```

### Testing
The project uses Jest and Vue Test Utils for unit testing. To run the tests:

```bash
# Run unit tests
npm run test:unit
```

### Code Quality

#### ESLint
ESLint is configured with Vue 3 recommended rules and Prettier integration. To run the linter:

```bash
# Check and fix linting issues
npm run lint
```

#### Prettier
To format the code using Prettier:

```bash
# Format all files in src directory
npm run format
```

## Performance

The application is optimized for performance with:
- Lazy loading images using Intersection Observer
- Code splitting and dynamic imports
- Efficient state management
- Optimized production build
- Minimal CSS footprint

## Testing Strategy

The project includes unit tests for:
- Components (using Vue Test Utils)
- API Services (with axios mocking)
- Store modules (Pinia state management)

Key test files:
- `tests/unit/LazyImage.spec.js` - Tests for lazy loading image component
- `tests/unit/api.spec.js` - Tests for API service layer

## Code Quality Tools

- **ESLint**: Enforces code quality rules with Vue 3 recommended configuration
- **Prettier**: Maintains consistent code formatting
- **Jest**: Handles unit testing with JSDOM environment
- **Vue Test Utils**: Provides Vue component testing utilities
