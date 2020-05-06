<template>
  <div class="tinymce-editor">
    <editor
      v-model="editorValue"
      :init="editorInit"
      :disabled="disabled"
      @onClick="handleClick"
    />
  </div>
</template>

<script>
// 引入组件
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
// 引入富文本编辑器主题的js和css
import "tinymce/themes/silver";
// 扩展插件
import "tinymce/plugins/image";
import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/wordcount"; // 字数统计插件

export default {
  name: "TinymceEditor",
  components: { Editor },
  props: {
    value: {
      type: String,
      default: ""
    },
    baseUrl: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: "link lists image code table wordcount"
    },
    toolbar: {
      type: [String, Array],
      default:
        "bold italic underline strikethrough image | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink code | removeformat"
    },
    placeholder: {
      type: String,
      default: "请输入文字..."
    }
  },
  data() {
    return {
      editorInit: {
        language_url: `${this.baseUrl}/tinymce/langs/zh_CN.js`,
        language: "zh_CN",
        skin_url: `${this.baseUrl}/tinymce/skins/ui/oxide`,
        content_css: `${this.baseUrl}/tinymce/skins/content/default/content.css`,
        // skin_url: `${this.baseUrl}/tinymce/skins/ui/oxide-dark`, // 暗色系
        // content_css: `${this.baseUrl}/tinymce/skins/content/dark/content.css`, // 暗色系
        height: 300,
        plugins: this.plugins,
        toolbar: this.toolbar,
        statusbar: true, // 底部的状态栏
        menubar: false, // 最上方的菜单
        branding: false, // 水印“Powered by TinyMCE”
        images_upload_handler: (blobInfo, success) => {
          success("data:image/jpg;base64," + blobInfo.base64());
        }
      },
      editorValue: this.value
    };
  },
  watch: {
    editorValue(newValue) {
      this.$emit("input", newValue);
    }
  },
  mounted() {
    const self = this;
    tinymce
      .init({
        placeholder: this.placeholder
      })
      .then(() => {
        console.log(self.value);
      });
  },
  methods: {
    handleClick(e) {
      this.$emit("onClick", e, tinymce);
    },
    clear() {
      this.editorValue = "";
    }
  }
};
</script>
