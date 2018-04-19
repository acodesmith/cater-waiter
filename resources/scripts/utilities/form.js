import React, { Fragment } from 'react'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import TimePicker from 'rc-time-picker'
import moment from 'moment'

const FieldMeta = ({ hint, touched, error, warning }) => (
    <Fragment>
        { !hint ? null : <span className='cw__field_hint'>{hint}</span> }
        {touched && ((error && <span className="cw__field_error">{error}</span>)
        || (warning && <span className="cw__field_warning">{warning}</span>))}
    </Fragment>
)

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
        <FieldMeta hint={hint} touched={touched} error={error} warning={warning} />
    </div>
)

export const renderSelect = ({input, label, options, name, id, className, hint, meta: { touched, error, warning }}) => {

    const { onChange, onBlur, value = { value } } = input

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
            <FieldMeta hint={hint} touched={touched} error={error} warning={warning} />
        </div>
    )
}

export const renderDatePicker = ({input, label, hint, meta: {touched, error, warning} }) => {

    if( typeof input.value === 'object' )
        input.value = input.value.format("MM-DD-YYYY");

    return (
        <div className='cw__datepicker'>
            <label>{label}</label>
            <DatePicker {...input} dateForm="MM-DD-YYYY" selected={input.value ? moment(input.value, "MM-DD-YYYY") : null} />
            <FieldMeta hint={hint} touched={touched} error={error} warning={warning} />
        </div>
    )
}

export const renderTimePicker = ({input, label, hint, meta: {touched, error, warning} }) => {

    if( typeof input.value !== 'undefined' && input.value !== '' && typeof input.value !== 'object' )
        input.value = moment(input.value, 'hh:mm A')

    if(input.value === '')
        input.value = null

    return (
        <div className='cw__timepicker'>
            <label>{label}</label>
            <TimePicker
                {...input}
                showSecond={false}
                use12Hours={true}
            />
            <FieldMeta hint={hint} touched={touched} error={error} warning={warning} />
        </div>
    )
}