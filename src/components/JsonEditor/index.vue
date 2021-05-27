<template>
  <div ref="editor" :style="{height: height}" />
</template>

<script>
import JsonEditor from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.css'

export default {
  name: 'Index',
  props: {
    height: {
      type: String,
      default() {
        return '200px'
      }
    },
    json: {
      type: [String, Number, Object, Array],
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      editor: null
    }
  },
  mounted() {
    const _this = this
    const options = {
      mode: 'code',
      onChange() {
        try {
          _this.$emit('editor', _this.editor.get())
        } catch (e) {
          _this.$emit('has-error', e)
        }
      }
    }
    this.editor = new JsonEditor(
      this.$refs.editor,
      options,
      this.json
    )
  },
  methods: {}
}
</script>

<style lang="less">
.jsoneditor {
  .jsoneditor-menu {
    display: none;
  }

  .jsoneditor-outer {
    margin: 0 !important;
    padding: 0 !important;

    .ace_editor {
      .ace_gutter {
        width: 30px !important;

        .ace_gutter-layer {
          width: 30px !important;

          .ace_gutter-cell {
            padding: 0 12px 0 6px !important;
          }
        }
      }

      .ace_scroller {
        left: 30px !important;
      }
    }
  }

  .jsoneditor-statusbar {
    display: none;
  }
}
</style>
