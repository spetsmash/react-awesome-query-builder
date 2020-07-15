import { Modal, Button } from 'antd';
import React from "react";
import * as ReactDOM from "react-dom";

export default ({onOk, okText, cancelText, text, title} = options) => {
  let visible = true;
  const onConfirm = () => {
    onOk();
    close();
    visible = false;
  };

  const div = document.createElement('div');
  document.body.appendChild(div);

  function close() {
      const unmountResult = ReactDOM.unmountComponentAtNode(div);
      if (unmountResult && div.parentNode) {
          div.parentNode.removeChild(div);
      }
  }

  function render(onOk, okText, cancelText, title, text) {
    /**
     * https://github.com/ant-design/ant-design/issues/23623
     * Sync render blocks React event. Let's make this async.
     */
    setTimeout(() => {
      ReactDOM.render(
          <Modal
              title={title}
              centered
              visible={true}
              onCancel={close}
              footer={[
                <Button key="0" onClick={close}>
                    {cancelText}
                </Button>,
                <Button key="1" type="primary" danger onClick={onConfirm}>
                  {okText}
                </Button>,
              ]}
          >
            {text}
          </Modal>, div
      );
    });
  }
  render(onOk, okText, cancelText, title, text);

}
