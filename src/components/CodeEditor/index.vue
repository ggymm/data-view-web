<template>
  <div ref="editor" :style="{height: height}">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    value: {
      type: String,
      required: true
    },
    language: {
      type: String,
      default: 'json'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      editor: null
    }
  },
  mounted() {
    this.initEditor()
  },
  methods: {
    initEditor() {
      this.editor = window.monaco.editor.create(this.$refs.editor, {
        value: this.value,
        language: this.language,
        automaticLayout: true,
        roundedSelection: false,
        fontSize: 16,
        autoIndent: true,
        theme: 'vs-dark'
      })
      this.editor.trigger('anything', 'editor.action.formatDocument')
      this.editor.onDidBlurEditorText(() => {
        this.handleEditorBlur()
      })
      this.editor.onDidChangeModelContent(() => {
        this.handleValueChange()
      })
    },
    handleEditorBlur() {
      this.$emit('blur')
    },
    handleValueChange() {
      this.$emit('change', this.editor.getValue())
    },
    setValue(newVal) {
      this.editor.setValue(newVal)
    }
  }
}
</script>
