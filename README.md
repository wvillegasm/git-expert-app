# git-expert-app

React 18 updated concepts

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
