import numeral from 'numeral'

/**
 * Convert value into currency string
 *
 * @param value
 * @param currency
 * @returns {string}
 */
export const formatCurrency = ( value, currency ) => {
    return `${ currency }${ numeral( value ).format('0.00') }`
}