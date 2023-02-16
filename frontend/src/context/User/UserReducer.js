export default function (state, { type, payload }) {
    switch (type) {
        case 'USER_DETAILS':
            return {
                ...state,
                username: payload.username,
                email: payload.email,
            }
        case 'INVALID_USER':
            return {
                ...state,
                error: payload.error
            }
        case 'EMPTY':
            return {
                username: '',
                email: '',
                error: ''
            }
        default:
            return state;
    }
}