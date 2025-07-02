# GIF Expert App

A React application that allows users to search and display GIFs using the GIPHY API.

## Version

### 1.0.0

- Initial release
- Search GIFs functionality
- Loading states and error handling
- Responsive grid layout
- Dark theme implementation
- Unit testing with Vitest and React Testing Library
- Environment variables configuration

## Technologies

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

### Using `rerender` and `act` in Testing

When testing React components or hooks, it is important to wrap any code that triggers state updates or side effects inside `act`. This ensures that all updates related to those actions are processed before you make assertions.

#### Why wrap `rerender` in `act`?

- **`rerender` can trigger effects:** When you call `rerender({ category: newCategory })`, React may run effects (like `useEffect`) or update state based on the new props.
- **`act` batches updates:** Wrapping in `act` ensures React processes all updates and effects before your test continues. This prevents warnings and ensures your assertions see the final, settled state.
- **Testing best practice:** React's testing utilities expect you to use `act` whenever you cause updates that might affect the DOM or component state.

#### Example

```jsx
// rerendering with new props may trigger useEffect or state updates
act(() => {
  rerender({ category: newCategory });
});
// Now it's safe to make assertions about the updated state/UI
```

#### Gotcha

If you forget to use `act`, you might see warnings like:

> "An update to ... inside a test was not wrapped in act(...)"

This means your test might be making assertions before React has finished updating.

#### Summary

Always use `act` when your test code causes React updates, including when calling `rerender` with new props. This ensures your tests are reliable and free of warnings.

### Custom Hooks Testing

When testing custom hooks, you can use the `renderHook` function from React Testing Library. This allows you to test the hook in isolation and verify its behavior.

#### Example

```jsx
import { renderHook, act } from '@testing-library/react-hooks';
import useCustomHook from '../hooks/useCustomHook';

describe('useCustomHook', () => {
  it('should do something', () => {
    const { result } = renderHook(() => useCustomHook());

    act(() => {
      result.current.doSomething();
    });

    expect(result.current.value).toBe('expected value');
  });
});
```

## Building for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Using Keys in React

When rendering lists of elements in React, it is important to provide a unique `key` prop for each element. This helps React identify which items have changed, are added, or are removed, improving performance and preventing bugs.

Using the `index` of an array as a key is generally discouraged, especially if the list can change over time (items added, removed, or reordered). This is because using the index can lead to issues with component state and performance optimizations.

Never use index into an array to create a key for a React component. This is an anti-pattern that can lead to bugs in your application. Instead, use a unique identifier for each item in the array, such as an ID or a unique property.

#### Example

```jsx
const items = ['apple', 'banana', 'orange'];
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
  { id: 1, name: 'apple' },
  { id: 2, name: 'banana' },
  { id: 3, name: 'orange' },
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
