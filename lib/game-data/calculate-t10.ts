import { T10_TREE } from './t10-tree'

export interface T10Progress {
  [nodeId: string]: number
}

export interface T10Result {
  total: {
    food: number
    gold: number
    iron: number
    valor: number
    time: number
  }
  days: number
}

export function calculateT10(completed: T10Progress): T10Result {
  const visited = new Set<string>()

  const total = {
    food: 0,
    gold: 0,
    iron: 0,
    valor: 0,
    time: 0,
  }

  function processNode(nodeId: string) {
    if (visited.has(nodeId)) return
    visited.add(nodeId)

    const node = T10_TREE[nodeId]
    if (!node) return

    if (node.requires) {
      node.requires.forEach(processNode)
    }

    const done = completed[nodeId] ?? 0

    node.levels.forEach((lvl, i) => {
      if (i >= done) {
        total.food  += lvl.food
        total.gold  += lvl.gold
        total.iron  += lvl.iron
        total.valor += lvl.valor
        total.time  += lvl.timeHours
      }
    })
  }

  processNode('t10')

  return {
    total,
    days: total.time / 24,
  }
}
