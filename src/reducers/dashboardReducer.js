/**
 * init state
 */
const initialState = {
    bookingRecordThisWeek: {},
    thisWeekLoaded: false,
    bookingRecordNextWeek: {},
    nextWeekLoaded: false,
    currentRecordUUID: ''
}

/**
 * reducer
 */
const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'E_REQ_SUCCESS':
            if (action.scope === 'thisweek') {
                return Object.assign(
                    {},
                    state,
                    {
                        bookingRecordThisWeek: action.payload,
                        thisWeekLoaded: true
                    }

                )
            } else {
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
            
        default:
            return state
    }
}

export default dashboardReducer
