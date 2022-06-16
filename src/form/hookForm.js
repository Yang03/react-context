import React, {useRef} from 'react'
import {
  Input,
  Button,
  Checkbox
} from 'zarm'

import Form, { useForm } from 'zarm-form'


import 'zarm/dist/zarm.min.css'


function Demo() {
  const fromRef = useRef();
  const { handleSubmit, errors, register } = useForm(fromRef);
  const submit = (values) => {
    console.log(values, 'ffff')
  }
  return (<div style={{ padding: '20px'}}>
    <Form ref={fromRef} errors={errors}>
    <Form.Item
      label="姓名"
      name="name"
      className="customer-classname"
      showError={true}
      rules = {
        register([{
          required: true,
          message: '请输入姓名!',
          trigger: 'blur'
        }])
      }>
      <Input name="name" placeholder="输入姓名" />
    </Form.Item>
    <Form.Item 
    label="多选" 
    name="multiple" 
    showError={true}
    rules={ register([{
      validator: (rule, value, callback) => {
        if (Array.isArray(value) && value.length >= 2) {
          callback()
          return
        }
        callback('最少两个')
      },
      trigger: 'change'
    }])}>
      <Checkbox.Group type="button" name="multiple">
        <Checkbox value="0">one</Checkbox>
        <Checkbox value="1">two</Checkbox>
        <Checkbox value="2">three</Checkbox>
      </Checkbox.Group>
    </Form.Item>
    <Button onClick={handleSubmit(submit)} theme="primary" ghost block>submit</Button>
  </Form>
  </div>)
}

export default Demo