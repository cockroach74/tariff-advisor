# CLAUDE.md - AI Assistant Guidelines for Tariff Advisor

## Project Overview

**IT Support Tariff Advisor** is a React-based web application for InterHyve Systems that helps clients determine appropriate IT support service pricing and plans. Users complete a questionnaire about their support needs, and the application generates personalized tariff recommendations.

## Tech Stack

- **React** 19.1.0 - Frontend framework
- **Create React App** (react-scripts 5.0.1) - Build tooling
- **Tailwind CSS** 3.4.1 - Utility-first CSS framework
- **Testing Library** - React component testing (@testing-library/react, @testing-library/jest-dom)
- **web-vitals** - Performance monitoring

## Project Structure

```
tariff-advisor/
├── public/                    # Static assets and PWA configuration
│   ├── InterHyve_Logo.jpg     # Company branding
│   ├── index.html             # HTML entry point
│   ├── manifest.json          # PWA manifest
│   └── favicon.ico            # Browser favicon
├── src/                       # Application source code
│   ├── App.js                 # Main TariffAdvisor component
│   ├── App.css                # Component styles
│   ├── App.test.js            # Test suite (6 tests)
│   ├── index.js               # React DOM entry point
│   ├── index.css              # Global styles + Tailwind directives
│   ├── setupTests.js          # Jest configuration
│   └── reportWebVitals.js     # Performance monitoring setup
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
├── package.json               # Dependencies and scripts
└── README.md                  # CRA documentation
```

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (localhost:3000)
npm start

# Run tests in watch mode
npm test

# Run tests once (CI mode)
CI=true npm test

# Create production build
npm run build
```

## Key Component: TariffAdvisor

Location: `src/App.js`

### Form State Structure
```javascript
{
  users: '',           // Number of users (numeric)
  remoteOnly: 'no',    // Yes/No - remote support only
  afterHours: 'no',    // Yes/No - after-hours support
  priority: 'no',      // Yes/No - priority response (<4hr)
  contract: 'no',      // Yes/No - fixed contract preference
  organization: 'business'  // Organization type (text)
}
```

### Business Logic - Client Categories
| User Count | Category     |
|------------|--------------|
| ≤10        | SOHO         |
| 11-50      | SMB          |
| 51-250     | Mid-Market   |
| >250       | Enterprise   |

Special handling: Organizations with "municipality" or "ngo" in name → "Municipal / NGO"

### Pricing Models
- **Remote Only**: CHF 80–110/hr
- **On-Site + Remote**: CHF 120–150/hr
- **After-Hours**: CHF 160–220/hr (premium)
- **Managed Plans**: CHF 60–140/month per user
- **Priority SLA**: <4hr response time

## Code Conventions

### React Patterns
- Functional components with hooks
- `useState` for local state management
- Controlled form inputs
- Event handlers follow `handleChange` naming pattern
- Inline RadioGroup component for reusable form inputs

### Styling
- Tailwind CSS utility classes in JSX (e.g., `className="max-w-3xl mx-auto p-8"`)
- Responsive design patterns
- Standard HTML form elements with Tailwind styling

### Image Handling
- Images in `public/` folder
- Reference with `process.env.PUBLIC_URL + '/filename'`

## AI Assistant Guidelines

### When Making Changes

1. **Read before editing**: Always read files before modifying them
2. **Preserve business logic**: The tariff calculation rules in `calculateTariff()` are business requirements - don't change without explicit request
3. **Keep it simple**: This is a straightforward questionnaire app - avoid over-engineering
4. **Use Tailwind**: Continue using Tailwind CSS utility classes for styling

### Testing

Run `npm test` after changes to ensure no regressions. The test suite includes:
- Title rendering test
- Form field rendering tests
- Button rendering test
- Recommendation display test
- Client categorization tests (SOHO, Enterprise)

### Commit Guidelines

- Use descriptive commit messages
- Group related changes in single commits
- Test before committing

## File Quick Reference

| Purpose | File |
|---------|------|
| Main app logic | `src/App.js:3-155` |
| Tariff calculation | `src/App.js:20-35` |
| Form state | `src/App.js:4-11` |
| RadioGroup component | `src/App.js:37-53` |
| Entry point | `src/index.js` |
| Tailwind config | `tailwind.config.js` |
| Global CSS | `src/index.css` |
| Dependencies | `package.json` |
| Tests | `src/App.test.js` |
