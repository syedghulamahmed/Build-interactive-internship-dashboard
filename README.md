# Internship Hub — React + TypeScript

A componentized internship dashboard built for the Week 1 Full Stack Web Development task.

## Features

- React 18+ with TypeScript and Vite.
- React Router client-side routing.
- Local internship dataset fetched with native `fetch()`.
- Simulated API latency and occasional network failure.
- Search by internship title or company.
- Location and category filters.
- Search + filters use AND logic.
- Debounced search input.
- Internship details route: `/internships/:id`.
- Controlled application form with field-level validation.
- Local-only application success state; no backend.
- Explicit loading, error, empty-results, and not-found states.
- Reusable functional components with typed props.
- Strict TypeScript with no `any`.

## Setup

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

Production build:

```bash
npm run build
npm run preview
```

## Routes

| Route | Purpose |
|---|---|
| `/` | Searchable/filterable internship dashboard |
| `/internships/:id` | Full internship details + application form |

## Component architecture

```text
App
└── BrowserRouter
    ├── Home
    │   ├── SearchBar
    │   ├── FilterSelect
    │   ├── FilterSelect
    │   ├── InternshipCard
    │   │   └── Badge
    │   ├── LoadingState
    │   ├── EmptyState
    │   └── ErrorState
    │
    └── InternshipDetails
        ├── Badge
        └── ApplyForm

useInternships
└── internshipApi
    └── /public/mock-data.json
```

The decomposition follows React's "Thinking in React" approach: identify the UI hierarchy, define the minimal state, place each piece of state at its nearest common parent, and derive filtered data rather than duplicating it in state.

## State design

### Shared state

`Home` owns the search text, selected location, and selected category because these values jointly determine the internship list.

The fetched internship dataset is owned by `useInternships`, which encapsulates loading/error/data behavior.

### Local state

`SearchBar` owns its draft input so typing remains responsive; the debounced value is lifted to `Home`.

`ApplyForm` owns form values, validation errors, and submission success state because those values are relevant only to the form.

No state is passed through more than two component levels.

## useState vs useReducer

`useState` was selected because the application state consists of independent, small state domains: search/filter controls, API status, and form fields. The update transitions are simple and local, so `useReducer` would add ceremony without providing a meaningful benefit.

`useReducer` would become more appropriate if the form or API state grew into a larger state machine with many coupled transitions such as multi-step submission, draft persistence, retry queues, or complex async workflows.

## Data fetching

`public/mock-data.json` represents an API response.

`fetchInternships()`:

1. Waits 700ms to make the loading UI observable.
2. Has a 12% simulated failure probability.
3. Fetches `/mock-data.json`.
4. Checks the HTTP response.
5. Performs a basic runtime array-shape check.
6. Returns the dataset to the `useInternships` hook.

The hook also guards against updating state after its effect has been cleaned up.

## Validation

The application form validates:

- Name: required, minimum 2 characters.
- Email: required, basic email format.
- Cover note: required, minimum 30 characters.

Errors are shown beside individual fields. A successful submission displays a confirmation screen and does not call a backend.

## Why this structure?

The project avoids a single giant `App.tsx`. Pages coordinate state and composition, components focus on presentation and interaction, the API layer handles data retrieval, the custom hook owns asynchronous state, and TypeScript interfaces define the data contract.

## Recommended React reading

Before implementation, review React's official **Thinking in React** guide and use its component-decomposition workflow:

https://react.dev/learn/thinking-in-react

## GitHub submission

After creating the repository:

```bash
git init
git add .
git commit -m "Build interactive internship dashboard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/internship-dashboard.git
git push -u origin main
```

Make the GitHub repository public before submitting the repository URL.
