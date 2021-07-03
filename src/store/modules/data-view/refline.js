import { RefLine } from 'refline.js'
// import { $$ } from '@/utils/dom'

export default {
  state: {
    refline: null
  },
  mutations: {
    setRefline(state) {
      // 获取横向标尺线
      const hLines = []
      // const hLineList = $$('.h-container .ruler-line')
      // for (let i = 0; i < hLineList.length; i++) {
      //   const offset = hLineList[i].style.left.replaceAll('px', '')
      //   hLines.push({
      //     key: i + 'line',
      //     offset: parseInt(offset)
      //   })
      // }

      // 获取纵向标尺线
      const vLines = []
      // const vLineList = $$('.v-container .ruler-line')
      // for (let i = 0; i < vLineList.length; i++) {
      //   const offset = vLineList[i].style.top.replaceAll('px', '')
      //   vLines.push({
      //     key: i + 'line',
      //     offset: parseInt(offset)
      //   })
      // }

      const rects = []
      for (let i = 0; i < state.slices.length; i++) {
        const item = state.slices[i]
        rects.push({
          key: i,
          left: item.x,
          top: item.y,
          width: item.width,
          height: item.height,
          rotate: item.rotate
        })
      }
      state.refline = new RefLine({
        rects: rects,
        adsorbHLines: hLines,
        adsorbVLines: vLines
      })
    },
    hideRefline(state) {
      state.refline = null
    }
  },
  actions: {}
}
