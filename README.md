# TV Shows Dashboard

Hey! 👋 This is my TV shows browser app built with Vue 3. It lets you explore and search through TV shows using the TVMaze API. I focused on making it fast and easy to use, with a clean, modern design.

Check it out here: [Live Demo](https://nataliia-radina.github.io/tv-shows-dashboard/)

## What's Cool About It?

- 🎬 Browse shows by genre - find exactly what you're in the mood for
- 🔍 Quick search with keyboard shortcuts
- 📱 Works great on phones, tablets, and desktops
- 🖼 Images load as you scroll (no more waiting!)
- 📺 Detailed show info with schedules and network details
- ⌨️ Fully keyboard accessible - no mouse needed

## Tech Stack

I built this with:
- Vue 3 (with Composition API) - for the UI
- Vite - super fast development
- Vue Router - smooth navigation
- TVMaze API - for all the show data
- CSS Grid & Flexbox - for responsive layouts
- CSS Variables - for easy theming

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

Hope you enjoy using it as much as I enjoyed building it! Feel free to open an issue if you find any bugs or have suggestions.
