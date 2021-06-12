<template>
  <div class="data-view-layer">
    <div class="layer-header">
      <span>图层</span>
      <span class="handler">
        <a-icon type="left" />
      </span>
    </div>
    <div class="layer-wrapper">
      <div
        v-for="item in slices"
        :key="item.i"
        class="layer-item"
      >
        <span class="layer-item-icon">
          <icon :type="`icon-${item.chartType}New`" />
        </span>
        <span class="layer-item-label">
          <span v-if="item.chartType === 'TitleText'">{{ item.option.title }}</span>
          <span v-else-if="item.chartType === 'CarouselList'">{{ item.chartName }}</span>
          <span v-else-if="item.chartType === 'Counter'">{{ item.chartName }}</span>
          <span v-else>
            <span v-if="item.chartName.length !== 0">
              {{ item.chartName }}
            </span>
            <span v-else>
              {{ item.option.title.text }}
            </span>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Layer',
  computed: mapState([
    'slices'
  ])
}
</script>
