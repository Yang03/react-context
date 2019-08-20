import React from 'react';
import ReactDOM from 'react-dom';
import ZarmForm, {
    Input,
    Checkbox,
    Select,
    Error,
    getFieldError
} from 'zarm-form'

import 'zarm/dist/zarm.min.css'
class Example extends React.Component {
    formRef = React.createRef()
    constructor() {
        super()
        this.state = {
            values: {
                name: '',
            },
            errors: [],
        }
    }
    onChange = (values) => {
        this.setState({
            values
        })
    }
    submit = () => {
        this.formRef.current.validate().then((values) => {
            console.log(values)
        }).catch(({ errors, fields }) => {
            this.setState({
                errors: errors
            })
        })
    }
    render() {
        const rules = 
            {
                name: [{
                    type: 'string',
                    required: true
                }]
            }
            console.log(getFieldError('name'))
        return (
            <ZarmForm onChange={this.onChange} values={this.state.values} rules={rules} ref={this.formRef}>
                <Input
                    placeholder="please input name"
                    value={this.state.values.name}
                    clearable={false}
                    label="name"
                    error={getFieldError( this.state.errors,'name')}
                />
                <button onClick={this.submit}>sumbmit</button>
            </ZarmForm>
        )
    }
}

ReactDOM.render(
    <Example/> ,
    document.getElementById('root')
)
