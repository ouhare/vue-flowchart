# @dgdv/vue-flowchart
> Render tree data using mermaid flowchart

## Dependencies
+ [Vue.js](https://vuejs.org/)
+ [mermaid](https://mermaid-js.github.io/mermaid/#/)
+ [d3js](https://d3js.org/) - use for zooming
+ [lodash](https://lodash.com/)

## How to install

Add `@dgdv/vue-flowchart` to your project
```
$ npm install --save @dgdv/vue-flowchart
```
OR
```
$ yarn add @dgdv/vue-flowchart
```

Use in vue 3 app

> Data as tree
```vue
<template>
  <vue-flowchart orientation="TD" v-model="data" @click="allNodesClick" @zoom="onZoom" />
</template>

<script>
import { VueFlowchart } from '@dgdv/vue-flowchart'

export default {
  setup () {
    const allNodesClick = (node) => {
      // all nodes
      console.log(node)
    }

    const onNodeClick = (node) => {
      // specific node
      console.log(node)
    }

    const onZoom = (event) => {
      // zoom event
      console.log(event)
    }

    const data = [
      {
        id: 1,
        label: 'Node 1',
        shape: 'rhombus',
        children: [
          {
            id: 2,
            label: 'Node 1.1',
            shape: 'stadium',
            link: 'line',
            onClick: onNodeClick
          }
        ]
      }
    ]

    return {
      data,
      allNodesClick,
      onZoom
    }
  }
}
<script>
```

> data as flat array

```vue
<template>
  <vue-flowchart v-model="data" />
</template>

<script>
import { VueFlowchart } from '@dgdv/vue-flowchart'

export default {
  setup () {
    const data = [
      {
        id: 1,
        label: 'Node 1'
      },
      {
        id: 2,
        label: 'Node 1.1',
        parentId: 1
      }
    ]

    return {
      data
    }
  }
}
<script>
```

## Props
+ orientation: string - 'TD' by default
+ debug: boolean - if true, mermaid graph definition will be console.log on every render
+ flatArray: boolean - if true, data must be a flat array (`false` by default)
+ parentKey: string - work with flatArray (`parentId` by default)

## Events
+ @click: function (used on component, every nodes will be clickable)
+ @zoom: function

## Node options
+ id: int | string - required
+ label: string
+ shape: `shapeType` (optionnal - see below)
+ style: `styleOptions` (optionnal - see below)
+ link: `linkType` (optionnal - see below - only for children)
+ children: array (optionnal)
+ caption: string (optionnal)
+ parentId: int | string (optionnal, used with flatArray prop)
+ avatar: object (optionnal - see below)
+ onClick: function (optionnal) - apply only on current node

### `avatar` properties
+ url
+ width (`40` by default)
+ height (`40` by default)

### `shapeType` values
+ round (default)
+ stadium
+ subroutine
+ cylindrical
+ circle
+ asymmetric
+ rhombus
+ hexagone
+ parallelogram
+ parallelogram_alt
+ trapezoid
+ trapezoid_alt


### `styleOptions` values
> an object with any color / painting properties shared by svg and css
+ fill
+ stroke
+ strokeWidth
+ color
+ strokeDasharray
+ strokeOpacity
+ and more...

#### Example:
```js
{
  id: 1,
  label: 'My Styled Node',
  style: {
    fill: '#bbf',
    stroke: '#f66',
    strokeWidth: '2px',
    color: '#fff',
    strokeDasharray: '4',
    strokeOpacity: '0.5'
  }
}
```

### `linkType` values (only for children)
+ arrow (default)
+ line
+ dotted
+ thick
+ multi_round
+ multi_arrow
+ multi_cross

#### if you need link with text, use this syntax:
```js
{
  type: linkType,
  text: 'Hello World !'
}
```

## How to test / build

```
# install dependencies
$ npm install

# run test app
$ npm run dev

# build for production
$ npm run build
```
