import { RefLine } from 'refline.js'
import { $$ } from '@/utils/dom'

export default {
  state: {
    refline: null
  },
  mutations: {
    setRefline(state) {
      // 获取横向标尺线
      const hLines = []
      const hLineList = $$('.h-container .line-value')
      for (let i = 0; i < hLineList.length; i++) {
        hLines.push({
          key: i + '',
          offset: parseInt(hLineList[i].innerText) / state.canvasConfig.scale
        })
      }

      // 获取纵向标尺线
      const vLines = []
      const vLineList = $$('.v-container .line-value')
      for (let i = 0; i < vLineList.length; i++) {
        vLines.push({
          key: i + '',
          offset: parseInt(vLineList[i].innerText) / state.canvasConfig.scale
        })
      }

      console.log(hLines)
      console.log(vLines)
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
