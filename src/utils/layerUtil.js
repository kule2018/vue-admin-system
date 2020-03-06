import vue from "../main";

export default {
  // 打开组件窗口
  openLayer(componentName, props, layerWidth, layerHeight, title) {
    vue.$layer.iframe({
      content: {
        // 子组件
        content: componentName,
        parent: this,
        // 子组件传值
        data: props
      },
      area: [`${layerWidth}px`, `${layerHeight}px`],
      title: title,
      // 关闭事件
      cancel: () => {}
    });
  },
  // 显示消息提示
  showMsg(msg) {
    let time = setInterval(() => {
      if (vue !== undefined) {
        vue.$layer.msg(msg);
        clearInterval(time);
      }
    }, 100);
  }
};
