import { Icon } from 'ant-design-vue'
let CustomIcon = null
const MergeIcon = {
  name: 'MergeIcon',
  props: {
    component: {
      type: Object,
      default: () => {
        return CustomIcon
      }
    },
    symbolPrefix: {
      type: String,
      default: 'custom-'
    },
    type: {
      type: String,
      default: null
    }
  },
  computed: {
    isCustomIcon() {
      return this.component && this.type && this.type.startsWith(this.symbolPrefix)
    }
  },
  render(h) {
    const dynamicProps = {
      on: this.$listeners,
      props: Object.assign(this.$attrs, {
        type: this.type
      })
    }
    if (this.isCustomIcon) {
      return h(this.component, dynamicProps)
    } else {
      return h(Icon, dynamicProps)
    }
  }
}
MergeIcon.install = function(Vue, options = {}) {
  const { scriptUrl } = options.MergeIcon || {}
  CustomIcon = scriptUrl ? Icon.createFromIconfontCN({
    scriptUrl
  }) : null
  Vue.component(MergeIcon.name, MergeIcon)
}
export default MergeIcon
