import React, { useRef } from 'react';
import { Modal, Form, Input, Button, notification } from 'antd';

const { Item } = Form;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};




const AddCommentView = ({
  visible,
  handleCancel,
  submitComment,
  idMenu,
}) => {
  const formRef = useRef(null);
  const onReset = () => {
    handleCancel();
    formRef.current.resetFields();
  }

  const handleOk = async (e) => {
    const { suggestion } = e;
    suggestion.menu_id = idMenu;
    const { menu_id } = await submitComment(suggestion);
    if (menu_id) {
      notification.success({
        message: 'Gracias por tu calificacion',
      })
      onReset();
    } else {
      notification.error({
        message: 'Ocurrio un error interno',
        description: 'Intentar mas tarde',
      })
    }
  }

  return (
    <Modal
      visible={visible}
      title="Sugerencias y Comentarios"
      onCancel={() => handleCancel()}
      footer={null}
    >
      <Form {...layout} ref={formRef} onFinish={handleOk} >
        <Item
          label="Correo electronico"
          rules={[{
            type: 'email',
            required: true,
            message: 'El correo tiene que ser valido!',
          }]}
          name={['suggestion', 'email']}
          placeholder="Correo electronico"
        >
          <Input />
        </Item>
        <Item
          label="Commentario"
          rules={[{
            type: 'string',
            required: true,
            min: 10,
            max: 250,
            message: 'Tiene que escibir un comentario entre  10 hasta 250 caracteres!',
          }]}
          name={['suggestion', 'comment']}
          placeholder="Comentario"
        >
          <Input.TextArea />
        </Item>
        <Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button style={{ marginRight: 10 }} onClick={onReset} htmlType="button">
            Cancelar
        </Button>
          <Button type="primary" htmlType="submit">
            Enviar
        </Button>
        </Item>
      </Form>
    </Modal>
  )
}

export default AddCommentView;
