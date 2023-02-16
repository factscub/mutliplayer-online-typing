import { getOrdinalNum } from "./GetOrdinalNum";

export const getDateFormat = (str) => {
    const date = new Date(str)
    const formatDate = [
        getOrdinalNum(date.getDate()),
        date.toLocaleString('default', { month: 'long' }),
        date.getFullYear() + ',',
        date.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })

    ]
    return formatDate.join(' ');
}