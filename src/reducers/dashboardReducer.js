/**
 * init state
 */
const initialState = {
    bookingRecordThisWeek: {},
    thisWeekLoaded: false,
    bookingRecordNextWeek: {},
    checkinLoaded: false,
    bookingRecordCheckIn: {},
    nextWeekLoaded: false,
    currentRecordUUID: '',
    syncStatus: {},
}

/**
 * reducer
 */
const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'E_REQ_SUCCESS':
            if (action.scope === 'checkin') {
                return Object.assign(
                    {},
                    state,
                    {
                        bookingRecordCheckIn: action.payload,
                        checkinLoaded: true
                    }

                )
            } else if (action.scope < 0) { //past checkout
                return Object.assign(
                    {},
                    state,
                    {
                        bookingRecordThisWeek: action.payload,
                        thisWeekLoaded: true
                    }

                )
            } else { //future checkin
                return Object.assign(
                    {},
                    state,
                    {
                        bookingRecordNextWeek: action.payload,
                        nextWeekLoaded: true
                    }
                )
            }
        case 'E_RECORD_SELECTED':
            return Object.assign(
                {},
                state,
                { currentRecordUUID: action.uuid }
            )
        case 'E_GET_SYNC_SUCCESS':
            return Object.assign(
                {},
                state,
                {
                    syncStatus: action.payload
                }
            )
        default:
            return state
    }
}

export default dashboardReducer
