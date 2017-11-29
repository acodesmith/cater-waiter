/**
 * Check value is set
 * @param value
 */
export const required = value => value ? undefined : 'Required'

/**
 * Value must be greater than 1
 * @param value
 */
export const minNumericValueOne = value => parseFloat( value ) > 0 ? undefined : 'Value must be greater than one.'
