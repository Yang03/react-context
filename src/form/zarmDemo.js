import * as React from "react";
import { useForm } from "react-hook-form";
import { Input, Cell, Button } from "zarm";

import 'zarm/dist/zarm.min.css';


function ZarmDemo() {
  const { triggerValidation, register, handleSubmit, setValue, errors, control } = useForm({
    mode: 'onBlur',
   });
  
   const onSubmit = data => console.log(data);
   
   const handleChange = (name, value) => {
     setValue([name], value );
   }
   console.log(errors, '-------->');
   
   React.useEffect(() => {
     register({name: 'name'}, {required: true, pattern: {
       value: /[A-Za-z]{3}/,
       message: 'error message' // <p>error message</p>
     }}); // custom register Antd input
 
     register({name: 'applicantCertiNo'}, {required: true});
     register({name: 'applicantPhone'}, {required: true});
   }, [register])
   return (
     <div style={{margin: '20px'}}>
       <form onSubmit={handleSubmit(onSubmit)}>
         <Cell title="投保人姓名">
           <Input name="name" onChange={(value) => handleChange('name', value)} placeholder="投保人姓名" onBlur={(value) => triggerValidation('name')} />
         </Cell>
         <Cell title="身份证号码">
           <Input name="applicantCertiNo" onChange={(value) => handleChange('applicantCertiNo', value)} placeholder="身份证号码"/>
         </Cell>
         <Cell title="手机号" description={<Button size="sm" onClick={(value) => triggerValidation('applicantPhone')} >发送验证码</Button>}>
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

export default ZarmDemo