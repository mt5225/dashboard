const initialState = {
    currentIndex: 1,
    mode: 'list',
    showComment: false,
    showCheckoutTimeDialog: false,
    showCheckinTimeDialog: false,
    dialogRecord: null,
    newComment: '',
    checkOutTimeHour: '12:00',
    checkOutTimeAMPM: 'PM',
    checkInTimeHour: '03:00',
    checkInTimeAMPM: 'PM',
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
                    dialogRecord: action.payload,
                    newComment: '',
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
                const hour = action.payload.CheckoutTime.substring(0, 5)
                const ampm = action.payload.CheckoutTime.slice(-2)
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
        case 'E_CHECKIN_HOUR':
            return Object.assign(
                {},
                state,
                {
                    checkInTimeHour: action.payload
                }
            )
        case 'E_CHECKIN_AMPM':
            return Object.assign(
                {},
                state,
                {
                    checkInTimeAMPM: action.payload
                }
            )
        case 'E_CHECKIN_CLOSE':
            return Object.assign(
                {},
                state,
                {
                    showCheckinTimeDialog: false
                }
            )
        case 'E_CHECKIN_OPEN':
            if (action.payload.CheckinTime) {
                const hour = action.payload.CheckinTime.substring(0, 5)
                const ampm = action.payload.CheckinTime.slice(-2)
                return Object.assign(
                    {},
                    state,
                    {
                        showCheckinTimeDialog: true,
                        dialogRecord: action.payload,
                        checkInTimeHour: hour,
                        checkInTimeAMPM: ampm,
                    }
                )
            } else {
                return Object.assign(
                    {},
                    state,
                    {
                        showCheckinTimeDialog: true,
                        dialogRecord: action.payload
                    }
                )
            }
        default:
            return state
    }
}

export default uiReducer