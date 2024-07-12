## 1.2.7 (2024-07-12)

### Bugfixes

+ Add watcher on `props.additionalLinks`

## 1.2.6 (2024-07-11)

### Bugfixes

+ Fit width of graph node with avatar

## 1.2.5 (2024-07-10)

### Features

+ It's now possible to add additional links in the graph

```js
const additionalLinks = [
  {
    from: 2,
    to: 3,
    link: {
      type: 'thick',
      text: 'Additional link'
    }
  },
  {
    from: 1,
    to: 4,
    link: 'dotted'
  },
  {
    from: 1,
    to: 31
  }
]
```

## 1.2.4 (2023-05-22)

### Bugfixes

+ Add watcher on `props.orientation`

## 1.2.3 (2022-03-07)

### Bugfixes

+ Check self-link on `props.parentKey`

## 1.2.2 (2022-03-04)

### Features

+ It's now possible to link a node to itself (flat-array mode only)

```js
const node = {
  id: 1,
  label: 'Node 1',
  parentId: 1
}
```

## 1.2.1 (2022-03-01)

### Bugfixes

+ handle hover event on complete graph

## 1.2.0 (2022-02-26)

### Features

+ add `hover:node` event
+ add node `onHover` property

## 1.1.0 (2022-02-25)

### Features

+ add `flat-array` prop
+ add `parent-key` prop
+ add node avatar
+ add node caption

## 1.0.0 (2022-02-24)

### Features

+ add node customization (style)

## 0.1.0 (2022-02-24)

### Features

+ add [d3js](https://d3js.org/) for svg zoom & pan

## 0.0.1 (2022-02-23)

### Features

+ Initial version
+ tree render (orientation, all nodes click event)
+ node shape customization (type)
+ node to node link customization (type)
+ node to node link with text
+ specific node click event
