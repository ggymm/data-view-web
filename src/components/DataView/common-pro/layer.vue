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
        v-for="chart in charts"
        :key="chart.i"
        class="layer-item"
      >
        <span class="layer-item-icon">
          <icon :type="`icon-${chart.chartType}New`" />
        </span>
        <span class="layer-item-label">
          <span v-if="chart.chartType === 'TitleText'">{{ chart.option.title }}</span>
          <span v-else-if="chart.chartType === 'CarouselList'">{{ chart.chartName }}</span>
          <span v-else-if="chart.chartType === 'Counter'">{{ chart.chartName }}</span>
          <span v-else>
            <span v-if="chart.chartName.length !== 0">
              {{ chart.chartName }}
            </span>
            <span v-else>
              {{ chart.option.title.text }}
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
    'charts'
  ])
}
</script>
