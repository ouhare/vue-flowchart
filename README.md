# dgd-flowchart

## How to install

Add to dependencies
```
$ npm install --save dgd-flowchart
```

Use in vue 3 app
```vue
<template>
  <dgd-flowchart v-model="data" :onClick="allNodesClick" />
</template>

<script setup>
import { DgdFlowchart } from 'dgd-flowchart

const allNodesClick = (node) => {
  // all nodes
  console.log(node)
}

const onNodeClick = (node) => {
  // specific node
  console.log(node)
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
<script>
```
## Props
+ debug: boolean - if true, mermaid graph definition will be console.log
+ onClick: function - apply on every node

## Node options
+ id: required
+ label: string
+ shape: shapeType (optionnal - see below)
+ link: linkType (optionnal - see below - only for children)
+ children: array (optionnal)
+ onClick: function (optionnal) - apply only on current node

## Shape Types
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


## Link Types (only for children)
+ arrow (default)
+ line
+ dotted
+ thick
+ multi_round
+ multi_arrow
+ multi_cross

if you need link with text, use this syntax:
```js
{
  type: linkType,
  text: 'Hello World !'
}
```
