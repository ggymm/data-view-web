const LineStackingAreaConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartType: 'lineStackingArea',
    choose: 'false',
    refresh: 'false',
    chartData: {
      dataSourceType: '',
      database: '',
      fileName: '',
      sql: 'select x,y,name from bpv_line_stacking_area_1',
      x: 'x',
      y: 'y',
      legend: 'name'
    },
    data: [],
    interval: 8000,
    option: {
      title: {
        text: '堆叠面积图',
        left: 'center',
        textStyle: { color: '#fff' }
      },
      grid: {
        left: '1%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        show: true,
        data: [],
        orient: 'vertical',
        left: '0',
        top: '0',
        textStyle: { color: '#fff' }
      },
      xAxis: {
        name: '',
        type: 'category',
        boundaryGap: false,
        data: [],
        axisTick: { show: false },
        axisLabel: { show: true, textStyle: { color: '#fff' }, rotate: 0 },
        splitLine: { show: true, lineStyle: { color: '#ffffff' }},
        axisLine: { show: true, lineStyle: { color: '#FFFFFF' }}
      },
      yAxis: {
        name: '',
        type: 'value',
        axisTick: { show: false },
        axisLabel: { show: true, textStyle: { color: '#fff' }},
        splitLine: { show: true, lineStyle: { color: '#ffffff' }},
        splitArea: { show: true, areaStyle: { color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)'] }},
        axisLine: { show: true, lineStyle: { color: '#FFFFFF' }}
      },
      series: [],
      backgroundColor: 'rgba(255,255,255,0)'
    }
  }
}

const getLineStackingAreaConfig = function() {
  return new LineStackingAreaConfig().config
}

export { getLineStackingAreaConfig }
