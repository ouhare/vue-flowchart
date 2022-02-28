<template>
  <div ref="root" style="overflow: hidden" @click="triggerOnClick" @mousemove="triggerMouseMove" />
</template>

<script>
import mermaid from 'mermaid'
import { select, zoom } from 'd3'
import { defineComponent, ref, onMounted, watch } from 'vue'

import { getUid, getShape, getLink, getClasses, getStyles, recursiveFind } from './helpers.js'

export default defineComponent({
  name: 'VueFlowchart',

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

    parentKey: {
      type: String,
      default: 'parentId'
    },

    flatArray: {
      type: Boolean,
      default: false
    },

    debug: {
      type: Boolean,
      default: false
    },

    locked: {
      type: Boolean,
      default: false
    },

    saveZoom: {
      type: Boolean,
      default: false
    },

    onClick: {
      type: Function
    },

    'onHover:node': {
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

    const getGraph = (tree) => {
      if (!tree.length) return `flowchart ${props.orientation}\n`
      return `flowchart ${props.orientation}\n${renderNode(tree)}\n${getClasses(tree, props.onClick, props['onHover:node'])}\n${getStyles(tree)}`
    }

    const renderNode = (tree, father = null) => {
      const nodes = tree.reduce((acc, current) => {
        if (!current) return acc

        const id = current.id
        const label = current.label ? current.label.replace('"', '') : ''
        const shape = current.shape
        const children = current.children
        const caption = current.caption || null
        const avatar = current.avatar && current.avatar.url ? current.avatar : null

        const row = 'display: flex; flex-direction: row;'
        const column = 'display: flex; flex-direction: column;'
        const itemsCenter = 'align-items: center;'
        const textCaption = 'font-size: 0.75em; font-weight: 400; letter-spacing: 0.0333em;'
        const textItalic = 'font-style: italic;'
        const textGrey = 'color: rgb(158,158,158);'
        const img = 'display: inline-block; margin-right: 8px; border-radius: 100%;'

        if (avatar && caption) {
          acc += `${id}${getShape(shape).replace('TEXT', `"<div style='${row} ${itemsCenter}'><img src='${avatar.url}' width='${avatar.width || 40}' height='${avatar.height || 40}' style='${img}' /><div style='${column}'><div>${label}</div><div style='${textGrey} ${textItalic} ${textCaption}'>${caption}</div></div></div>"`)}\n`
        } else if (avatar && !caption) {
          acc += `${id}${getShape(shape).replace('TEXT', `"<div style='${row} ${itemsCenter}'><img src='${avatar.url}' width='${avatar.width || 40}' height='${avatar.height || 40}' style='${img}' /><div>${label}</div></div>"`)}\n`
        } else if (!avatar && caption) {
          acc += `${id}${getShape(shape).replace('TEXT', `"<div style='${column}'><div>${label}</div><div style='${textGrey} ${textItalic} ${textCaption}'>${caption}</div></div>"`)}\n`
        } else {
          acc += `${id}${getShape(shape).replace('TEXT', `"${label}"`)}\n`
        }

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
        if (props.onZoom) props.onZoom(event)
      })
      svg.call(zoomCallback).on('dblclick.zoom', null)
    }

    const initGraph = (tree) => {
      const uid = getUid()

      const nodes = props.flatArray ? constructTree(tree) : tree

      const graph = getGraph(nodes)

      if (props.debug) {
        console.warn('vue-flowchart: debug mode for ' + uid + ' is enabled.')
        console.warn('Logging graph definition:')
        console.log(graph)
      }

      mermaid.render(uid, graph, (svgCode) => {
        root.value.innerHTML = svgCode
        if (!props.locked) initZoom(uid)
      })
    }

    const triggerOnClick = (ev) => {
      let target = ev.target
      if (!target) return

      do {
        target = target.parentNode
      } while (target.classList && !target.classList.contains('clickable'))
      if (!target || !target.getAttribute) return

      const splits = target.getAttribute('id').split('-')
      if (splits.length === 3) {
        const node = recursiveFind(props.modelValue, splits[1])
        if (node) {
          if (node.onClick) return node.onClick(node, ev)
          if (props.onClick) return props.onClick(node, ev)
        }
      }
    }

    const triggerMouseMove = (ev) => {
      let target = ev.target
      if (!target) return

      do {
        target = target.parentNode
      } while (target.classList && !target.classList.contains('hoverable'))
      if (!target || !target.getAttribute) return

      const splits = target.getAttribute('id').split('-')
      if (splits.length === 3) {
        const node = recursiveFind(props.modelValue, splits[1])
        if (node) {
          if (node.onHover) return node.onHover(node, ev)
          if (props['onHover:node']) return props['onHover:node'](node, ev)
        }
      }
    }

    const constructTree = (values) => {
      const parentKey = props.parentKey || 'parentId'

      const alreadyPassed = []

      const getChildren = (id) => {
        alreadyPassed.push(id)
        const childrenFilter = values.filter(c => c[parentKey] === id)
        const children = []
        childrenFilter.forEach(m => {
          if (alreadyPassed.includes(m.id)) return
          children.push({ ...m, children: getChildren(m.id) })
        })
        return children
      }

      const parents = values.filter(c => !c[parentKey] || c[parentKey] === c.id)
      const nodes = []
      parents.forEach(p => {
        nodes.push({ ...p, children: getChildren(p.id) })
      })
      console.log(nodes)

      return nodes
    }

    onMounted(() => initGraph(props.modelValue))

    watch(() => props.modelValue, (newVal) => {
      initGraph(newVal)
    }, { deep: true })

    return {
      root,
      triggerOnClick,
      triggerMouseMove
    }
  }
})
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>
