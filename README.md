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
        }
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
        }
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
        }
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
      }
    ];
    ```
    
- `CheckInput`
  - `isToggle` (boolean) - if this prop is passed the origami's checkbox is rendered as a toggle button
  - `className` (string) - an additional class name can be passed from the parent and styles of this class would be applied to the checkbox
  - `small` (boolean) - this is an origami prop which would append `origami's small classname` to the checkbox
  - `disabled` (boolean) - if this prop is passed, the checkbox would be disabled and it cannot be checked/unchecked
  - `checked` (boolean) - a prop which indicates the value of the checkbox - checked/unchecked
  - `onChange` (function) - a callback function which would handle the change of the checkbox
  - `label` (string) - a label which would be rendered next to the checkbox
  
For more information about Origami's checkbox class names visit [the official documentation of Origami checkbox components.](https://registry.origami.ft.com/components/o-forms@8.4.1#demo-checkboxes)

- `FormsField`
  - `children` (string/node) - `children` passed to the `FormsField` in order to render a form field inside the wrapper 
  - `containerTag` (string) - One of `label` or `div` - the wrapper tag used for `FormsField` component
  - `title` (string) - if it is passed a title with `titlePromp` and `titleProps` is rendered before the form field
  - `titlePrompt` (string/node) - additional text rendered under the `title` - in order the prompt to be rendered, `title` should be passed
  - `titleProps` (object) - additional title props which could be passed for the title (`verticalCenter`, `shrink`)
  - `className` (string) - an additional class name can be passed from the parent and styles of this class would be applied to the `FormsField`
  - `inline` (boolean) - this is an origami prop which would append `origami's inline classname` to the `FormsField`
  - `optional` (boolean) - this is an origami prop which would append `origami's optional classname` to the `FormsField`
  - `inverse` (boolean) - this is an origami prop which would append `origami's inverse classname` to the `FormsField`

For more information about Origami's additional class names visit [the official documentation of Origami forms components.](https://registry.origami.ft.com/components/o-forms)

- `RadioInput`
  - `className` (string) - an additional class name can be passed from the parent and styles of this class would be applied to the `RadioInput`
  - `small` (boolean) - this is an origami prop which would append `origami's small classname` to the `RadioInput`
  - `inline` (boolean) - this is an origami prop which would append `origami's inline classname` to the `RadioInput`
  - `disabled` (boolean) - if this prop is passed, the `RadioInput` would be disabled and it cannot be checked/unchecked
  - `isRounded` (boolean) - if this prop is passed the origami's `RadioInput` is rendered rounded
  - `options` (array) - an array of objects with different options for the radio button, e.g:
    
      ```
    [
        {
          name: 'Option 1',
          value: 'option1'
        },
        {
          label: 'Option 2',
          url: 'option2'
        }
    ];
    ```

  - `name` (string) - a name attribute of the radio inputs
  - `onChange` (function) - a callback function which would handle the change of the `RadioInput`
  - `selectedValue` (string) - the current selected value of all options
  
For more information about Origami's radio input class names visit [the official documentation of Origami forms components.](https://registry.origami.ft.com/components/o-forms@8.4.1#demo-box-styled-radio-inputs)

- `SelectBox`
  - `className` (string) - an additional class name can be passed from the parent and styles of this class would be applied to the `SelectBox`
  - `small` (boolean) - this is an origami prop which would append `origami's small classname` to the `SelectBox`
  - `hasError` (boolean) - indicates if the `SelectBox` has an error and shows the `errorMessage`
  - `errorMessage` (string) - if `hasError` is true, then this message is shown
  - `primary` (boolean) - this is an origami prop which would append `origami's primary classname` to the `SelectBox`
  - `isTouched` (boolean) - indicates if the `SelectBox` has been touched or not
  - `disabled` (boolean) - if this prop is passed, the `SelectBox` would be disabled and it options cannot be selected
  - `selectedValue` (string) - the current selected value of all options
  - `onChange` (function) - a callback function which would handle the change of the `SelectBox`
  - `placeholderOptions` (object) - object which contains the placeholder's value and name, which are needed a option as a placeholder to be rendered
  - `options` (array) - an array of objects containing the options which are rendered inside the `SelectBox`, e.g.:
      
      ```
    [
        {
          name: 'Option 1',
          value: 'option1',
          id: 'id1',
          type: 'type1',
          disabled: true
        },
        {
          name: 'Option 2',
          value: 'option2',
          id: 'id2',
          type: 'type2',
          disabled: false
        }
    ];
    ```
    
For more information about Origami's select box class names visit [the official documentation of Origami forms components.](https://registry.origami.ft.com/components/o-forms@8.4.1#demo-select-boxes)

    
- `TextInput`
  - `className` (string) - an additional class name can be passed from the parent and styles of this class would be applied to the `TextInput`
  - `small` (boolean) - this is an origami prop which would append `origami's small classname` to the `TextInput`
  - `disabled` (boolean) - if this prop is passed, the `TextInput` would be disabled and it cannot be checked/unchecked
  - `inputType` (string) - the type of the input (default value is `text`), one of `text`, `password`, `email`, `number`, `textarea`
  - `onChange` (function) - a callback function which would handle the change of the `TextInput`
  - `onChange` (function) - a callback function which would handle the blur of the `TextInput`
  - `onBlur` (function) - a callback function which would handle the `keyDown event` of the `TextInput`
  - `hasError` (boolean) - indicates if the `TextInput` has an error and shows the `errorMessage`
  - `errorMessage` (string) - if `hasError` is true, then this message is shown
  - `isTouched` (boolean) - indicates if the `TextInput` has been touched or not
  - `rows` - (number) - the rows count in case the `inputType` is `textarea` (defaults to 4)
  
For more information about Origami's text input/area class names visit [the official documentation of Origami forms components.](https://registry.origami.ft.com/components/o-forms@8.4.1#demo-text-input)


- `Tooltip`
  - `useTooltip` hook should be imported as well
1. `Tooltip` should be used with parent container with class `with-tooltip`
   and `parentContainerRef` should be passed to `useTooltip` hook
   in order to be correctly vertical positioned, e.g:
   
   ```
   <div ref={parentContainerRef} className="with-tooltip">
     <button ref={elementRef} onClick={clickHandler}>Tooltip</Button>
     <Tooltip />
   </div>
   ```
2. `elementRef` (see example above) should be passed to `useTooltip` hook
   in order Tooltip to be correctly horizontal positioned
3. If the "tooltiped" element (`button` in the example above) is a react component
   then it should be transformed to forwardRef (see Button.jsx)
   
  - `Tooltip` props
    - `isVisible` (bool) - indicates if `Tooltip` is visible or not (returned from `useTooltip`)
    - `top` (number) - top position of the `Tooltip` (returned from `useTooltip`)
    - `left` (number) - left position of the `Tooltip` (returned from `useTooltip`)
    - `children` (string/node) - content rendered inside the Tooltip
    - `close` (function) - a callback used for closing the `Tooltip` (returned from `useTooltip`)
    
  - `useTooltip` receives 3 arguments
    - `initialState` (bool) - the initial visual state of the `Tooltip`
    - `containerRef` (ref) - a ref to the container of the tooltip (it should have class `with-tooltip`)
    - `elementRef` (ref) - a ref to the element which shows the `Tooltip`
  - and returns:
    - `isVisible` (bool) - visual state of the `Tooltip`
    - `top` (number) - top position of the `Tooltip`
    - `left` (number) - left position of the `Tooltip`
    - `hideTooltip` (func) - a callback used to close the `Tooltip`
    - `showTooltip` (func) - a callback used to open the `Tooltip`

- `Loader`
  - `size` (string) - one of the following strings ('mini', 'small', 'medium', 'large', 'extra-large') - specifies size of the Loader
  - `theme` (string) - one of the following string ('dark', 'light') - specifies the theme/color of the loader
  
- `LoaderScreen` - renders a screen with dark themed extra large Loader in the center

- `Bubble`
A wrapper of the so called Bubbles in Combined content search
  - `primary` (bool) - if it is true, a primary class is appended (similar to Origami's approach)
  - `filter` (bool) - if the Bubble wrapper is going to be used as `FilterBubble` or `PreviewBubble`
  - `children` (string/node) - `children` could be passed to the `Bubble` in order to fill the content inside it 

- `FilterBubble`
A Bubble with `SelectBox` and `CustomAutocomplete`/`TextInput` 
  - `value` (string) - the current value of the `TextInput` 
  - `onChange` (func) - the change handler for the `TextInput` 
  - `initialInputValue` (string) - initial value of the `TextInput` 
  - `dropdownOptions` (array) - options for the `SelectBox`
  - `autocompleteId` (string/number) - an id for the `CustomAutocomplete`
  - `autocompleteOptions` (array) - the options for the `CustomAutocomplete`
  - `autocompleteFinish` (func) - a callback invoked on `CustomAutocomplete` finish
  - `autocompleteChange` (func) - a callback invoked on `CustomAutocomplete` change

- `LogicFilterBubble`
A Bubble with logic buttons inside it - AND/OR, Add, Insert, Delete
  - `expressionValue` (object) - object containing `id` and `logic` of the current expression 
  - `onChange` (func) - change handler for the `RadioInput` (AND/OR filter)
  - `addNewFilter` (func) - a callback invoked on "Add new filter" button click
  - `deleteExpression` (func) - a callback invoked on "Delete group" button click
  - `insertExpression` (func) - a callback invoked on "Insert" button click
  - `className` (string) - an additional class name can be passed from the parent and styles of this class would be applied to the `LogicFilterBubble`

- `PreviewBubble`
A Bubble which is just showing the concept type and the concept and optionally Edit/Show similar concepts/Delete button
  - `type` (string) - the concept type
  - `value` (string) - the concept value
  - `primary` (bool) - if the `Bubble` wrapper should be `primary` or not
  - `actions` (object) - object with actions callbacks `edit` and `delete` for t
  - `children` (string/node)
  - `narrower` (array) - an array with narrower concepts to show in `SimilarConcept` tooltip
  - `related` (array) - an array with related concepts to show in `SimilarConcept` tooltip
  - `onConceptClick` (func) - a callback invoked on Similar concept click
  
- `Hint`
  - `className` (string) - an additional class name can be passed from the parent and styles of this class would be applied to the `Hint`
  - `children` (string/node) - `children` could be passed to the `Hint` in order to fill the content inside it 

- `HintConcepts`
A `Hint` with info about the different concept types

- `HintLogicGroup`
A `Hint` with info about the different operations

- `ExpressionGroup`
  - `expression` (object) - an expression/query rendered into this `ExpressionGroup` using the different `Bubble`s, e.g:
  ```
  {
      id: 1,
      type: 'expression',
      logic: 'and',
      operands: []
  }
  ```
  - `onChange` (func) - a callback invoked on change of concept type
  - `isFirst` (bool) - indicates if the `ExpressionGroup` is first of its kind
  - `currentId` (number) - the current id used in the different `ExpressionGroup`s
  - `increaseId` (func) - a callback invoked to increase the `currentId`
  - `dropdownOptions` (array) - dropdown options used inside `FilterBubble`
  - `withHint` (bool) - indicates if the `ExpressionGroup` should have hint for using
  
- `PreviewFilterExpression`
Renders an expression in preview mode
  - `expression` (object) - an expression/query rendered into this `ExpressionGroup` using `PreviewBubble`, e.g:
  ```
  {
      id: 1,
      type: 'expression',
      logic: 'and',
      operands: []
  }
  ```
  
- `Teaser`
  - `className` (string) - an additional class name can be passed from the parent and styles of this class would be applied to the `Teaser`
  - `imageSrc` (string) - the source of the image rendered inside the `Teaser`
  - `topic` (string) - the topic rendered inside the `Teaser`
  - `heading` (string) - the heading rendered inside the `Teaser`
  - `content` (string) - the content rendered inside the `Teaser`
  - `linkUrl` (string) - if `linkUrl` is passed the whole teaser is rendered as link and leads to the actual article in `ft.com`

- `ArticlesTeasers`
  - `date` (string) - a date rendered to every group of articles
  - `articles` (array) - the articles rendered in this group 
  
- `TimePeriod`
  - `isEditable` (bool) - if the time filter is editable or in preview mode
  - `from` (number/string) - the start date of the period
  - `to` (number/string) - the end date of the period
  - `onChange` (func) - a callback invoked on change of the period
  - `embargoPeriod` (bool) - indicates if embargoPeriod checkbox is checked
  - `setEmbargoPeriod` (func) - a change handler for the embargoPeriod checkbox
  
- `FeedPreview`
  - `expression` (object) - an expression/query rendered into this `ExpressionGroup` using `PreviewBubble`, e.g:
  ```
  {
      id: 1,
      type: 'expression',
      logic: 'and',
      operands: []
  }
  ```
  - feed (object) - an object with `period` and `items` properties used to render the feed
  - isLoading (bool) - indicates if the feed is still loading
  - returnToBuilder (func) - a callback invoked on `Return to Buidler` button click
  

- `useInput` hook for managing text inputs, receives:
    - `initialValue` (string) - the initial value of the input
    - `validator` (func) - a callback used to validating the input on change
- and returns:
    - `value` (string) - the current value of the input
    - `onChange` (func) - the change handler of the input
    - `hasError` (bool) - indicates if the input has error (if `validator` is passed)
    - `isTouched` (bool) - indicates if the input has been touched

- `useExpression` hook for managing expressions/queries, receives:
    - `initialExpression` (object) - an initial expression/query, e.g:
    ```
    {
        id: 1,
        type: 'expression',
        logic: 'and',
        operands: []
    }
    ```
    - `onChangeCallback` (func) - a callback invoked on change of the expression/query
    - `currentId` (number) - the currentId of all expressions
    - `increaseId` (func) - a callback invoked to increase the `currentId` after a new expression is created
- and returns:
    - `expression` (object) - the new expression/query
    - `changeExpression` (func) - a callback used for updating the expression/query
    - `changeType` (func) - a callback invoked on changing the Logic filter of an expression 
    - `changeFilters` (func) - a callback invoked on changing the filters
    - `insertExpression` (func) - a callback invoked on inserting an expression
    - `deleteExpression` (func) - a callback invoked on deletion of an expression
    - `toggleFilterEditMode` (func) - a callback for toggling `editMode` of a filter
    - `changeConceptType` (func) - a callback invoked for changing the concept type
    - `changeConcept` (func) - a callback invoked for changing the concept
    - `requestConcepts` (func) - a callback for requesting concepts
