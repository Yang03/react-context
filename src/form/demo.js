import * as React from "react";
import ReactDOM from 'react-dom'
import { useForm, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Input, Cell, Button, Message, Icon } from "zarm";

import 'zarm/dist/zarm.min.css';


function Demo() {
  const { trigger, register, handleSubmit, setValue, errors, control } = useForm({
    // mode: 'onBlur',
    reValidateMode: 'onChange',
   });

   const onSubmit = data => console.log(data);

   const handleChange = (name, value) => {
     console.log(name, value)
     setValue(name, value );
   }
   console.log(errors, '-------->');

   React.useEffect(() => {
     register({name: 'name'}, {required: true, pattern: {
       value: /[A-Za-z]{3}/,
       message: '最少三个英文字符' // <p>error message</p>
     }}); // custom register Antd input

     register({name: 'applicantCertiNo'}, {required: true});
     register({name: 'applicantPhone'}, {required: true});
   }, [register])
   return (
     <div style={{margin: '20px'}}>
       <form onSubmit={handleSubmit(onSubmit)}>
         <Cell title="投保人姓名" help={errors.name ? <Message theme="danger" icon={<Icon type="warning-round" size="sm" />}>{errors.name.message || '必填'}</Message> : ''}>
           <Input name="name" onChange={(value) => handleChange('name', value)} placeholder="投保人姓名"  onBlur={() => trigger('name')}/>
         </Cell>
         <Cell title="身份证号码" help={errors.applicantCertiNo ? <Message theme="danger" icon={<Icon type="warning-round" size="sm" />}>{errors.applicantCertiNo.message || '必填'}</Message> : ''}>
           <Input name="applicantCertiNo" onChange={(value) => handleChange('applicantCertiNo', value)} placeholder="身份证号码"/>
         </Cell>
         <Cell title="手机号"  help={errors.applicantPhone ? <Message theme="danger" icon={<Icon type="warning-round" size="sm" />}>{errors.applicantPhone.message || '必填'}</Message> : ''} description={<Button size="sm" onClick={(value) => trigger('applicantPhone')} >发送验证码</Button>}>
           <Input name="applicantPhone" onChange={(value) => handleChange('applicantPhone', value)} placeholder="身份证号码"/>
         </Cell>
         {/* <Cell>
            <input name="test" ref={register({ required: true })}  defaultValue="" />
         </Cell> */}

         {/* <Cell>
            <Input name="test" ref={register({ required: true })}  defaultValue="" />
         </Cell> */}

         <Button htmlType="submit" block>提交</Button>
       </form>
     </div>
   );
}

export default Demo
