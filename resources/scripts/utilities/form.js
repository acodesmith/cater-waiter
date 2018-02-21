import React from 'react'
import Select from 'react-select'

export const renderField = ({ input, label, type, placeholder, hint, className = '', children, attr = {}, meta: { touched, error, warning } }) => (
    <div className={`cw__form_field ${className}`}>
        {console.log("input value", input.value)}
        { ! label ? null : <label>{label}</label> }
        {(()=>{
            switch( type ) {
                case 'textarea':
                    return <textarea {...input} {...attr}>{children ? children : placeholder}</textarea>
                    break;
                case 'select':
                    return <select {...input} {...attr}>{children}</select>
                    break;
                default:
                    return <input {...input} {...attr} placeholder={placeholder} type={type} />
            }
        })()}
        { !hint ? null : <span className='cw__field_hint'>{hint}</span> }
        {touched && ((error && <span className="cw__field_error">{error}</span>)
            || (warning && <span className="cw__field_warning">{warning}</span>))}
    </div>
)

export const renderSelect = ({input, label, options, name, id, className, hint, meta: { touched, error, warning }}) => {

    const { onChange, onBlur, value } = input

    return (
        <div className={`cw__form_field ${className}`}>
            { ! label ? null : <label>{label}</label> }
            <Select
                {...input}
                id={id}
                name={name}
                options={options}
                value={value}
                onChange={value => onChange(value.value)}
                onBlur={value => onBlur(value.value)}
            />
            { !hint ? null : <span className='cw__field_hint'>{hint}</span> }
            {touched && ((error && <span className="cw__field_error">{error}</span>)
                || (warning && <span className="cw__field_warning">{warning}</span>))}
        </div>
    )
}