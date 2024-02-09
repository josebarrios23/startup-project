# What's a wrapper component in react?

Wrapper components are components that surround unknown components and provide a default structure to display the child components.

A wrapper component may be used to create user interface (UI) components that are used frequently throughout a design, such as modals, template pages, and information tiles.

reference: [How to create a wrapper component in react.](https://dev.to/taiwobello/how-to-create-a-wrapper-component-in-react-29p#:~:text=Wrapper%20components%20are%20components%20that,template%20pages%2C%20and%20information%20tiles.)

`MainLayout` is used as a wrapper component. This means any JSX or components placed inside MainLayout tags become children of the MainLayout component.

## Nesting Routes Inside MainLayout 

By placing the Routes component inside MainLayout, you are essentially telling React to render the Routes component (and all of its Route children) within the context of the MainLayout. This means that the MainLayout will render its layout (header, footer, etc.) and then render the current route's component (like ProjectCards or SingleProject) as specified by the Route components within the Routes component

## Route Rendering 

When a route is matched (like /projectcards), the corresponding component (ProjectCards in this case) will be rendered as a child of the MainLayout. This allows the MainLayout to maintain a consistent layout structure (like a consistent header and footer) across different pages/routes of your application.

```jsx
// App.jsx
const App = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <div className={isLandingPage ? 'landing-layout' : ''}>
      {isLandingPage ? (
        // Render Landing page without MainLayout
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      ) : (
        // Render other views
        <MainLayout>
          <Routes>
            <Route path="/projectcards" element={<ProjectCards />} />
            <Route path="/:id" element={<SingleProject />} />
          </Routes>
        </MainLayout>
      )}
    </div>
  );
};

export default App;
```

Landing.jsx will have functionality (Link to navigate to All job posts and log in aside) while App.jsx will have the ternary function for location path which determines which layout to choose depending on path location (whether on Landing page view or other views). MainLayout.jsx serves to wrap all the components that will not have landing page layout

```jsx
// MainLayout.jsx
const MainLayout = ({ children }) => {
     console.log(children)
  return (
    <body>
      <Header />
      <aside>
        <h2>Aside</h2>
        User Drop Down
        <button>Log In</button>
      </aside>
      <main>{children}</main>
      <footer>Footer</footer>
    </body>
  );
};

export default MainLayout;
```

The children prop contains 2 objects - each object represents a Route tag:

React Element Object:

Following the component code, there's a detailed breakdown of a React element object. This looks like a debug output or a console log of a React element, showing its properties like $$typeof, key, props, type, etc.
This object represents a React element (possibly a Route component from react-router-dom, as indicated by the type property) and includes detailed internal information used by React's rendering engine.

```
props
: 
children
: 
Array(2)
0
: 
$$typeof
: 
Symbol(react.element)
key
: 
null
props
: 
{path: '/projectcards', element: {…}}
ref
: 
null
type
: 
ƒ Route(_props)
_owner
: 
FiberNode {tag: 0, key: null, stateNode: null, elementType: ƒ, type: ƒ, …}
_store
: 
{validated: true}
_self
: 
undefined
_source
: 
{fileName: '/Users/julissagarcia/Desktop/Pursuit/Module-3/Home…SkillShopGroupProject/startup-project/src/App.jsx', lineNumber: 24, columnNumber: 13}
[[Prototype]]
: 
Object
1
: 
$$typeof
: 
Symbol(react.element)
key
: 
null
props
: 
{path: '/:id', element: {…}}
ref
: 
null
type
: 
ƒ Route(_props)
_owner
: 
FiberNode {tag: 0, key: null, stateNode: null, elementType: ƒ, type: ƒ, …}
_store
: 
{validated: true}
_self
: 
undefined
_source
: 
{fileName: '/Users/julissagarcia/Desktop/Pursuit/Module-3/Home…SkillShopGroupProject/startup-project/src/App.jsx', lineNumber: 25, columnNumber: 13}
[[Prototype]]
: 
Object
length
: 
2
[[Prototype]]
: 
Array(0)
[[Prototype]]
: 
Object
ref
: 
null
```
# Creating a Root Component to add darkmode / lightmode functionality:

The statement "Calling `ReactDOM.createRoot()` and passing it the DOM element with the ID 'root'" refers to a specific step in initializing a React 18 (or newer) application, where a new root container is created for the React app to render its components. Let's break down this statement for clarity:

1. **`ReactDOM.createRoot()`:** This is a method provided by the `react-dom` package starting from React 18. It is part of the new ReactDOM API that enables Concurrent Mode, which allows React to prepare multiple versions of the UI at the same time. This is a significant change from the previous `ReactDOM.render()` method used in React 17 and earlier versions. The new API offers better performance and more flexible rendering options.

2. **`DOM element with the ID 'root'`:** This refers to an HTML element (usually a `<div>` element) present in your application's HTML file (often `index.html`) that serves as the entry point for your React application. This element is identified by its `id` attribute having the value `root`. For example, in your HTML file, you might have an element defined like this: `<div id="root"></div>`. This `div` acts as a container where your entire React app will be rendered.

3. **Passing it the DOM element with the ID 'root'**: The method `ReactDOM.createRoot()` requires a reference to a DOM element where the React application will be mounted. You obtain this reference by using `document.getElementById('root')`, which finds the HTML element with the ID of `root` in the document. This reference is then passed as an argument to `ReactDOM.createRoot()`.

Putting it all together, the process looks something like this in code:

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Assuming you have an App component defined

// Find the DOM element with the ID 'root'
const container = document.getElementById('root');

// Create a root container for the React application
const root = ReactDOM.createRoot(container);

// Render the App component inside the root container
root.render(<App />);
```

This code snippet will initialize a new React application, rendering the `App` component (which represents the root component of your application) inside the `<div id="root"></div>` element in your HTML document. This setup is necessary for using React 18's features, including Concurrent Mode.