<template>
  <div style="display: flex; flex-direction: row;">
    <vue-flowchart debug class="chart" v-model="data" @click="onClick" />
    <vue-flowchart debug class="chart" :flatArray="true" parentKey="parent" v-model="flatData" @click="onClick" />
  </div>
</template>

<script setup>
import { VueFlowchart } from './components'

const onClick = (node) => {
  console.log('Global click', node)
}

const onNode1Click = (node) => {
  console.log('Node 1 click', node)
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
    shape: 'trapezoid_alt'
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
    parent: 1
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
    parent: 1
  },
  {
    id: 32,
    label: 'Flat Node 1.2.2',
    link: 'multi_arrow',
    parent: 3
  },
  {
    id: 31,
    label: 'Flat Node 1.2.1',
    parent: 3
  },
  {
    id: 311,
    label: 'Flat Node 1.2.1.1',
    shape: 'cylindrical',
    link: 'thick',
    parent: 31
  },
  {
    id: 4,
    label: 'Flat Node 1.3',
    link: {
      type: 'multi_cross',
      text: '!!!!!'
    },
    parent: 1
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
