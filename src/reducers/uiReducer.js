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
            let mode = ''
            if (action.payload.value === 3) {
                mode = 'sync'
            } else if (action.payload.value === 2) {
                mode = 'checkin'
            } else {
                mode = 'list'
            }
            return Object.assign(
                {},
                state,
                {
                    currentIndex: action.payload.value,
                    mode: mode
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
            if (action.payload.CheckoutTime) {
                const hour = action.payload.CheckoutTime.substring(0, 2)
                const ampm = action.payload.CheckoutTime.substring(6, 8)
                return Object.assign(
                    {},
                    state,
                    {
                        showCheckoutTimeDialog: true,
                        dialogRecord: action.payload,
                        checkOutTimeHour: hour,
                        checkOutTimeAMPM: ampm,
                    }
                )
            } else {
                return Object.assign(
                    {},
                    state,
                    {
                        showCheckoutTimeDialog: true,
                        dialogRecord: action.payload
                    }
                )
            }
        default:
            return state
    }
}

export default uiReducer