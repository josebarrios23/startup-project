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