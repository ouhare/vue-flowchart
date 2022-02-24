<template>
  <dgd-flowchart debug class="chart" v-model="data" />
</template>

<script setup>
import { DgdFlowchart } from './components'

const onClick = (node) => {
  console.log('Global click', node)
}

const onNode1Click = (node) => {
  console.log('Node 1 click', node)
}

const onZoom = (event) => {
  console.log(event)
}

const data = [
  {
    id: 134,
    label: 'Node 134',
    shape: 'trapezoid_alt'
  },
  {
    id: 1,
    label: 'Node 1',
    onClick: onNode1Click,
    shape: 'rhombus',
    children: [
      {
        id: 2,
        label: 'Node 1.1',
        link: {
          type: 'thick',
          text: 'Hello'
        }
      },
      {
        id: 3,
        label: 'Node 1.2',
        link: {
          type: 'line',
          text: 'World'
        },
        children: [
          {
            id: 31,
            label: 'Node 1.2.1',
            children: [
              {
                id: 311,
                label: 'Node 1.2.1.1',
                shape: 'cylindrical',
                link: 'thick'
              }
            ]
          },
          {
            id: 32,
            label: 'Node 1.2.2',
            link: 'multi_arrow'
          }
        ]
      },
      {
        id: 4,
        label: 'Node 1.3',
        link: {
          type: 'multi_cross',
          text: '!!!!!'
        }
      }
    ]
  }
]
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  width: 100vw;
}

.chart, .chart > svg {
  width: 100%;
  height: 100%;
}
</style>
