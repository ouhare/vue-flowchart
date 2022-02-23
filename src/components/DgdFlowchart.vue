<template>
  <div ref="root" @click="triggerOnClick" />
</template>

<script>
import mermaid from 'mermaid'
import { defineComponent, ref, onMounted, watch } from 'vue'

import { getUid, getShape, getLink, recursiveFind } from './helpers.js'

export default defineComponent({
  name: 'DgdFlowchart',

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
    }
  },

  setup (props) {
    const root = ref(null)

    mermaid.initialize({ startOnLoad: false })

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

    const initGraph = (tree) => {
      const uid = getUid()
      const graph = getGraph(tree)

      if (props.debug) console.log(graph)

      mermaid.render(uid, graph, (svgCode) => {
        root.value.innerHTML = svgCode
      })
    }

    const triggerOnClick = (ev) => {
      ev.path.forEach(el => {
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
