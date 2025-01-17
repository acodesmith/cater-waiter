/**
 * Labels with dynamic values are stubbed with the `%VALUE%`.
 * Helper function to replace the stubbed value with dynamic value.
 *
 * @param value
 * @param label
 */
export const mapValue = function(value, label )
{
    return label.replace( '%VALUE%', value );
}