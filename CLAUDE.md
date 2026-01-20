# CLAUDE.md - AI Assistant Guidelines for Tariff Advisor

## Project Overview

**IT Support Tariff Advisor** is a React-based web application for InterHyve Systems that helps clients determine appropriate IT support service pricing and plans. Users complete a questionnaire about their support needs, and the application generates personalized tariff recommendations.

## Tech Stack

- **React** 19.1.0 - Frontend framework
- **Create React App** (react-scripts 5.0.1) - Build tooling
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
│   ├── App.test.js            # Test suite
│   ├── index.js               # React DOM entry point
│   ├── index.css              # Global styles
│   ├── setupTests.js          # Jest configuration
│   └── reportWebVitals.js     # Performance monitoring setup
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

### Styling
- Tailwind CSS utility classes in JSX (e.g., `className="max-w-3xl mx-auto p-8"`)
- Responsive design patterns

## Known Issues (Require Resolution)

1. **Uninstalled UI Dependencies**: App.js imports from `@/components/ui/` (Card, Button, Input, Label, RadioGroup) which don't exist. These are shadcn/ui components that need to be installed or replaced.

2. **Next.js Import in CRA**: Line 7 imports `Image from 'next/image'` which is incompatible with Create React App. Should use standard `<img>` tag or install next/image alternative.

3. **Hardcoded Image Path**: Line 8 references `/mnt/data/InterHyve_Logo.jpg` - should use `public/InterHyve_Logo.jpg` or import from src.

4. **Missing Tailwind CSS**: Uses Tailwind classes but Tailwind is not installed or configured.

5. **Outdated Test**: `App.test.js` tests for "learn react" text which doesn't exist in the app.

## AI Assistant Guidelines

### When Making Changes

1. **Read before editing**: Always read files before modifying them
2. **Preserve business logic**: The tariff calculation rules in `calculateTariff()` are business requirements - don't change without explicit request
3. **Keep it simple**: This is a straightforward questionnaire app - avoid over-engineering

### Before Fixing Known Issues

The issues listed above require resolution before the app will run. When asked to fix:
- Install shadcn/ui components OR replace with standard HTML/CSS
- Replace Next.js Image with standard `<img>` tag
- Fix image path to use public folder
- Configure Tailwind CSS OR convert to standard CSS

### Testing

Run `npm test` after changes to ensure no regressions. Update `App.test.js` if component output changes.

### Commit Guidelines

- Use descriptive commit messages
- Group related changes in single commits
- Test before committing

## File Quick Reference

| Purpose | File |
|---------|------|
| Main app logic | `src/App.js:10-112` |
| Tariff calculation | `src/App.js:27-42` |
| Form state | `src/App.js:11-18` |
| Entry point | `src/index.js` |
| Dependencies | `package.json` |
| Tests | `src/App.test.js` |
