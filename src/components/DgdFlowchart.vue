<template>
  <div ref="root" style="overflow: hidden" @click="triggerOnClick" />
</template>

<script>
import mermaid from 'mermaid'
import { select, zoom } from 'd3'
import { defineComponent, ref, onMounted, watch } from 'vue'

import { getUid, getShape, getLink, recursiveFind } from './helpers.js'

export default defineComponent({
  name: 'DgdFlowchart',

  emits: ['zoom'],

  props: {
    modelValue: {
      type: Array,
      default: () => []
    },

    orientation: {
      type: String,
      default: 'TD'
    },

    debug: {
      type: Boolean,
      default: false
    },

    onClick: {
      type: Function
    },

    onZoom: {
      type: Function
    }
  },

  setup (props, ctx) {
    const root = ref(null)

    mermaid.initialize({
      startOnLoad: false,
      flowchart: {
        useMaxWidth: false
      }
    })

    const getClasses = (tree) => {
      return tree.reduce((acc, current) => {
        if (!current) return acc

        if (props.onClick || current.onClick) {
          acc += `class ${current.id} clickable\n`
        }

        if (current.children) acc += getClasses(current.children)

        return acc
      }, '')
    }

    const getGraph = (tree) => {
      if (!tree.length) return `flowchart ${props.orientation}\n`

      return `flowchart ${props.orientation}\n${renderNode(tree)}\n${getClasses(tree)}`
    }

    const renderNode = (tree, father = null) => {
      const nodes = tree.reduce((acc, current) => {
        if (!current) return acc

        const id = current.id
        const label = current.label
        const shape = current.shape
        const children = current.children

        acc += `${id}${getShape(shape).replace('TEXT', label)}\n`

        if (father) {
          const link = getLink(current.link)
          acc += `${father.id}${link}${current.id}\n`
        }

        if (children) acc += renderNode(children, current)

        return acc
      }, '')

      return nodes
    }

    const initZoom = (id) => {
      const svg = select('#' + id)
      svg.html('<g>' + svg.html() + '</g>')
      const inner = svg.select('g')
      const zoomCallback = zoom().on('zoom', (event) => {
        inner.attr('transform', event.transform)
        if (props.onZoom) ctx.emit('zoom', event)
      })
      svg.call(zoomCallback).on('dblclick.zoom', null)
    }

    const initGraph = (tree) => {
      const uid = getUid()
      const graph = getGraph(tree)

      if (props.debug) console.log(graph)

      mermaid.render(uid, graph, (svgCode) => {
        root.value.innerHTML = svgCode
        initZoom(uid)
      })
    }

    const triggerOnClick = (ev) => {
      const path = ev.path || (ev.composedPath && ev.composedPath())
      path.forEach(el => {
        if (el.classList && el.classList.contains('clickable')) {
          const splits = el.id.split('-')
          if (splits.length === 3) {
            const node = recursiveFind(props.modelValue, splits[1])
            if (node) {
              if (node.onClick) return node.onClick(node)
              if (props.onClick) return props.onClick(node)
            }
          }
        }
      })
    }

    onMounted(() => initGraph(props.modelValue))

    watch(() => props.modelValue, (newVal) => {
      initGraph(newVal)
    }, { deep: true })

    return {
      root,
      triggerOnClick
    }
  }
})
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>
