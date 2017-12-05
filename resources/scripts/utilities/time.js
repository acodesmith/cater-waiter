import moment from 'moment'

export const militaryToStandard = value => {
    return moment(value, 'HH:mm').format('hh:mm a')
}