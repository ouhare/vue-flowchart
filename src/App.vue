<script setup>
import { ref } from 'vue'

import { DgdFlowchart } from './components'

const empty = ref([])

const onClick = (node) => {
  console.log('Global click', node)
}

const onNode1Click = (node) => {
  console.log('Node 1 click', node)
}

const addNode = () => {
  const rd = new Date().getTime()
  empty.value.push({
    id: rd,
    label: `New Node ${rd}.`,
    children: [
      {
        id: 'c' + rd,
        label: `New Subnode c${rd}`
      }
    ]
  })
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
          type: 'dotted',
          text: '!'
        }
      }
    ]
  }
]
</script>

<template>
  <dgd-flowchart v-model="data" :onClick="onClick" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
