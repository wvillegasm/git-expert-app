# GIF Expert App

A React application that allows users to search and display GIFs using the GIPHY API.

## Changelog

### Version 1.0.0

- Initial release
- Search GIFs functionality
- Loading states and error handling
- Responsive grid layout
- Dark theme implementation
- Unit testing with Vitest and React Testing Library
- Environment variables configuration

## Technologies

This project is built with modern web technologies:

### Core

- React 18
- Vite
- JavaScript/JSX

### Testing

- Vitest
- React Testing Library
- Jest DOM

### API Integration

- GIPHY API
- Fetch API for HTTP requests

### Development Tools

- ESLint
- Git
- Environment Variables

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- GIPHY API Key

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd gif-expert-app
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```bash
VITE_GIPHY_API_KEY=your_api_key_here
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Testing

### Running Tests

Run all tests:

```bash
npm test
```

Run tests with coverage:

```bash
npm test -- --coverage
```

### Test Structure

- Component tests are located in `/test/components`
- Each component has its own test file and snapshot
- Mock implementations are used for API calls and custom hooks

## Building for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Using Keys in React

When rendering lists of elements in React, it is important to provide a unique `key` prop for each element. This helps React identify which items have changed, are added, or are removed, improving performance and preventing bugs.

Using the `index` of an array as a key is generally discouraged, especially if the list can change over time (items added, removed, or reordered). This is because using the index can lead to issues with component state and performance optimizations.

Never use index into an array to create a key for a React component. This is an anti-pattern that can lead to bugs in your application. Instead, use a unique identifier for each item in the array, such as an ID or a unique property.

## For example:

```jsx
const items = ["apple", "banana", "orange"];
const ItemList = () => {
  return (
    <ul>
      {items.map((item, index) => (
        // This is an anti-pattern
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};
```

If the item in zero index is removed, the next item will be rendered in the place of the first item, which can lead to unexpected behavior.
Instead, use a unique identifier:

```jsx
const items = [
  { id: 1, name: "apple" },
  { id: 2, name: "banana" },
  { id: 3, name: "orange" },
];
const ItemList = () => {
  return (
    <ul>
      {items.map((item) => (
        // This is the correct way to use keys
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};
```
