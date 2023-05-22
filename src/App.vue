<template>
  <div class="row fit">
    <div class="col text-center">
      <h1>Data as tree</h1>
      toggle orientation: <label><input value="LR" type="radio" v-model="orientation"> horizontal</label> <label><input value="TD" type="radio" v-model="orientation"> vertical</label>
      <vue-flowchart class="chart" v-model="data" :orientation="orientation" @click="onClick" @hover:node="onHoverNode" />
    </div>
    <div class="col text-center">
      <h1>Data as flat array</h1>
      toggle parentKey: <label><input value="parentId" type="radio" v-model="parentKey"> parentId</label> <label><input value="otherId" type="radio" v-model="parentKey"> otherId</label>
      <vue-flowchart flat-array class="chart" :parent-key="parentKey" v-model="flatData" @click="onClick" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { VueFlowchart } from './components'

const parentKey = ref('parentId')
const orientation = ref('TD')

const onClick = (node) => {
  console.log('Global click', node)
}

const onNode1Click = (node) => {
  console.log('Node 1 click', node)
}

const onHoverNode = (node, ev) => {
  console.log(node)
}

const data = [
  {
    id: 134,
    label: '(Hello worlD | ! / héhé)"""',
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
        avatar: {
          url: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
        },
        caption: 'I\'m a caption',
        style: {
          fill: '#f9f',
          stroke: '#333',
          strokeWidth: '4px'
        },
        link: {
          type: 'thick',
          text: '\'\'`(Hello worlD | ! / héhé)"""'
        }
      },
      {
        id: 3,
        label: 'Node 1.2',
        style: {
          fill: '#bbf',
          stroke: '#f66',
          strokeWidth: '2px',
          color: '#fff',
          strokeDasharray: '4',
          strokeOpacity: '0.5'
        },
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

const flatData = [
  {
    id: 134,
    label: 'Flat (Hello worlD | ! / héhé)"""',
    shape: 'trapezoid_alt',
    parentId: 134
  },
  {
    id: 1,
    label: 'Flat Node 1',
    onClick: onNode1Click,
    shape: 'rhombus'
  },
  {
    id: 2,
    label: 'Flat Node 1.1',
    avatar: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
    },
    caption: 'I\'m a caption',
    style: {
      fill: '#f9f',
      stroke: '#333',
      strokeWidth: '4px'
    },
    link: {
      type: 'thick',
      text: '\'\'`(Hello worlD | ! / héhé)"""'
    },
    parentId: 1,
    otherId: 3
  },
  {
    id: 3,
    label: 'Flat Node 1.2',
    style: {
      fill: '#bbf',
      stroke: '#f66',
      strokeWidth: '2px',
      color: '#fff',
      strokeDasharray: '4',
      strokeOpacity: '0.5'
    },
    link: {
      type: 'line',
      text: 'World'
    },
    parentId: 1,
    otherId: 32
  },
  {
    id: 32,
    label: 'Flat Node 1.2.2',
    link: 'multi_arrow',
    parentId: 3
  },
  {
    id: 31,
    label: 'Flat Node 1.2.1',
    parentId: 3
  },
  {
    id: 311,
    label: 'Flat Node 1.2.1.1',
    shape: 'cylindrical',
    link: 'thick',
    parentId: 31
  },
  {
    id: 4,
    label: 'Flat Node 1.3',
    link: {
      type: 'multi_cross',
      text: '!!!!!'
    },
    parentId: 1
  }
]
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  width: 100vw;
}

.fit {
  width: 100%;
  height: 100%;
}

.row {
  display: flex;
  flex-direction: row;
}

.col {
  flex: 1;
}

.j-around {
  justify-content: space-around;
}

.text-center {
  text-align: center;
}

.chart, .chart > svg {
  width: 100%;
  height: 100%;
}
</style>
