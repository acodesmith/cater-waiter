import React from 'react'

export const renderField = ({ input, label, type, placeholder, hint, className = '', children, attr = {}, meta: { touched, error, warning } }) => (
    <div className={`cw__form_field ${className}`}>
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