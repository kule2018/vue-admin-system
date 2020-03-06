const layerUtil = {
  // 打开组件窗口
  openLayer(vueObject, componentName, props, layerWidth, layerHeight, title) {
    vueObject.$layer.iframe({
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
  showMsg(vueObject, msg) {
    vueObject.$layer.msg(msg);
  }
};

export default layerUtil;
