import React, { useRef } from 'react';
import {
  Modal,
  Form,
  Input,
  Button,
  Rate,
  Select,
  notification,
} from 'antd';

const { Item } = Form;
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const AddGradeView = ({
  visible,
  handleCancel,
  submitGrade,
  idMenu,
  waiters = [],
}) => {
  const formRef = useRef(null);
  const onReset = () => {
    handleCancel();
    formRef.current.resetFields();
  }

  const handleOk = async (e) => {
    const { calification } = e
    calification.menu_id = idMenu
    const { menu_id } = await submitGrade(calification);
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
      title="Agregar Califacion"
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
          name={['calification', 'email']}
          placeholder="Correo electronico"
        >
          <Input />
        </Item>
        <Item
          label="ID Ticket"
          rules={[{
            type: 'string',
            required: true,
            message: 'Para calificar se necesita el id del ticket!',
          }]}
          name={['calification', 'ticket_id']}
          placeholder="Correo electronico"
        >
          <Input />
        </Item>
        <Item
          name={['calification', 'waiter_id']}
          label="Emleado"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Favor de seleccionar el Emleado quien lo atendio!',
            },
          ]}
        >
          <Select placeholder="Mesero quien lo Atendio">
            {waiters.map((waiter) => (
              <Option value={waiter.id}>{waiter.name}</Option>
            ))}
          </Select>
        </Item>
        <Item
          name={['calification', 'rating']}
          label="Calificacion"
          rules={[
            {
              required: true,
              message: 'Favor de calificar el servicio!',
            },
          ]}
        >
          <Rate allowHalf />
        </Item>
        <Item
          label="Commentario"
          name={['calification', 'comment']}
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

export default AddGradeView;
