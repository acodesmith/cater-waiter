import React from 'react'

export const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} />
            {touched && ((error && <span className="cw__field_error">{error}</span>)
                || (warning && <span className="cw__field_warning">{warning}</span>))}
        </div>
    </div>
)