const initialState = {
    currentIndex: 1,
    mode: 'list',
    showComment: false,
    showCheckoutTimeDialog: false,
    dialogRecord: null,
    newComment: '',
    checkOutTimeHour: '12',
    checkOutTimeAMPM: 'PM',
}

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'A_NAV':
            return Object.assign(
                {},
                state,
                {
                    currentIndex: action.payload.value,
                    mode: 'list'
                }
            )
        case 'A_SHOW_COMMENTS':
            return Object.assign(
                {},
                state,
                {
                    showComment: true,
                    dialogRecord: action.payload
                }
            )
        case 'A_CLOSE_COMMENTS':
            return Object.assign(
                {},
                state,
                {
                    showComment: false
                }
            )
        case 'E_COMMENT_CHANGE':
            return Object.assign(
                {},
                state,
                {
                    newComment: action.payload
                }
            )
        case 'E_CHECKOUT_HOUR':
            return Object.assign(
                {},
                state,
                {
                    checkOutTimeHour: action.payload
                }
            )
        case 'E_CHECKOUT_AMPM':
            return Object.assign(
                {},
                state,
                {
                    checkOutTimeAMPM: action.payload
                }
            )
        case 'E_CHECKOUT_CLOSE':
            return Object.assign(
                {},
                state,
                {
                    showCheckoutTimeDialog: false
                }
            )
         case 'E_CHECKOUT_OPEN':
            return Object.assign(
                {},
                state,
                {
                    showCheckoutTimeDialog: true
                }
            )
        default:
            return state
    }
}

export default uiReducer