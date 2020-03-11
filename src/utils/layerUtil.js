import vue from "../main";

export default {
  // 打开默认弹层
  openLayer(
    componentName,
    componentObj,
    props,
    layerWidth,
    layerHeight,
    title
  ) {
    vue.$layer.iframe({
      content: {
        // 子组件
        content: componentName,
        parent: componentObj,
        // 子组件传值
        data: {
          parentData: props
        }
      },
      area: [`${layerWidth}px`, `${layerHeight}px`],
      title: title,
      // 关闭事件
      cancel: () => {},
      shadeClose: false
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
  },
  // 通知气泡
  message: {
    success(title, message) {
      vue.$notify({
        type: "success",
        title: title,
        message: message,
        duration: 2500
      });
    },
    warn(title, message) {
      vue.$notify({
        type: "warning",
        title: title,
        message: message,
        duration: 2500
      });
    },
    error(title, message) {
      vue.$notify({
        type: "error",
        title: title,
        message: message,
        duration: 2500
      });
    },
    info(title, message) {
      vue.$notify({
        type: "info",
        title: title,
        message: message,
        duration: 2500
      });
    }
  }
};
