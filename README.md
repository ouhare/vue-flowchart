# dgd-flowchart

## How to install

Add to dependencies
```
$ npm install --save dgd-flowchart
```

Use in vue app
```vue
<template>
  <dgd-flowchart v-model="data" :onClick="allNodesClick" />
</template>

<script setup>
import DgdFlowchart from 'dgd-flowchart

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
        link: 'line'
      }
    ]
  }
]

const allNodesClick = (node) => {
  console.log('on click', node)
}
<script>
```

## Node options
```
id: required
label: string
shape: shapeType (optionnal - see below)
link: linkType (optionnal - see below - only for children)
children: array (optionnal)
```

## Shape Types
```
round (default)
stadium
subroutine
cylindrical
circle
asymmetric
rhombus
hexagone
parallelogram
parallelogram_alt
trapezoid
trapezoid_alt
```

## Link Types (only for children)
```
arrow (default)
line
dotted
thick
multi_round
multi_arrow
multi_cross

if you need text with links, use this syntax:

{
  type: linkType,
  text: 'Hello World !'
}
