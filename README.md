# cm-react-components
Repository for shared React components build atop of Origami and maintained by the C&amp;M team

## Contents

- `Button`
- `Header` (with `Navigation` and `ClientNavigation` inside)
- `Layout`
- `Footer`

## Installation
In order to install cm-react-components you can run one of the following commands on the `package.json`'s level inside your React project.

```npm install --save git+https://github.com/Financial-Times/cm-react-components.git```

or

```yarn add git+https://github.com/Financial-Times/cm-react-components.git```

## Usage

These shared components should be named imports, e.g:

```import { Button } from 'cm-react-components'``` inside the file your want to use this component.

Every component has variation of `props` which can be passed to it, some of them for visual purposes and some of them for functional:

- `Button`
  - `id` (string) - id which would be attached to the DOM `button` element
  - `disabled` (boolean) - if this props is passed, the `button` would be disabled and it cannot be clicked
  - `onClick` (function) - a callback function which would handle the click of the `button`
  - `title` (string) - title which would be attached to the DOM `button` element
  - `className` (string) - an additional class name can be passed from the parent and styles of this class would be applied to the `button`
  - `primary` (boolean) - this is an origami prop which would append `origami's primary classname` to the button
  - `secondary` (boolean) - this is an origami prop which would append `origami's secondary classname` to the button
  - `inverse` (boolean) - this is an origami prop which would append `origami's inverse classname` to the button
  - `big` (boolean) - this is an origami prop which would append `origami's big classname` to the button
  - `mono` (boolean) - this is an origami prop which would append `origami's mono classname` to the button
  - `b2c` (boolean) - this is an origami prop which would append `origami's b2c classname` to the button
  - `children` (string/node) - `children` could be passed to the button in order to fill the content inside it 
  - `icon` (string) - this is an origami prop which would append `origami's icon classname` to the button. If no `children` prop is passed, it would also append `icon-only` classname (see link below for all available icons)

For more information about Origami's button class names visit [the official documentation of Origami buttons components.](https://registry.origami.ft.com/components/o-buttons)

- `Header`
The header is a component which contains also `Navigation` and `ClientNavigation` components.
`Header` should be wrapped around `<BrowserRouter>`, otherwise it would not work.
  - `renderProp` (function) - a function which should return the Child component inside every `li` of the `Navigation`, e.g: `NavLink` or `Link` from `react-router-dom` or `Link` from `gatsby-link` 
  - `title` (string) - the title of the application for example which would be rendered inside the `header`
  - `name` (string) - If we have secondary navigation (`ClientNavigation`) this is used for visualizing the name of the client/user which uses the secondary navigation. This prop goes with the next one `id`
  - `id` (string) - If we have secondary navigation (`ClientNavigation`) this is used for navigating to the different client routes with this `id`. Used with the previous prop `name`
  - `mainMenuData` (array) - an array of objects which contains the different application routes for the main navigation (`MainNavigation`), e.g.:
  
      ```
    [
        {
          label: 'Main route label',
          url: '/main-route'
        },
        {
          label: 'Main route label 2',
          url: '/main-route-2'
    ];
    ```
  - `secondaryMenuData` (array) - an array of objects which contains the different application routes for the secondary navigation (`SecondaryNavigation`), e.g.:
  
      ```
    [
        {
          label: 'Secondary route label',
          url: '/secondary-route'
        },
        {
          label: 'Secondary route label 2',
          url: '/secondary-route-2'
    ];
    ```
  - `clientMenuData` (array) - an array of objects which contains the different application routes for the client navigation (`ClientNavigation`), e.g.:
  
      ```
    [
        {
          label: 'Client route label',
          url: '/client-route'
        },
        {
          label: 'Client route label 2',
          url: '/client-route-2'
    ];
    ```
    
- `Layout`
  - `children` (string/node) - the components rendered inside the `Layout`
  
- `Layout.Main`
  - `children` (string/node) - the components rendered inside the `Layout.Main`
  
- `Footer`
  - `link` (array) - an array of objects which contain the different links rendered inside the `footer`, e.g:
  
    ```
    [
      {
        link: 'http://link-number-1.com/',
        text: 'Text for link #1'
      },
      {
        label: 'http://link-number-2.com/',
        text: 'Text for link #2'
    ];
    ```
  
