import * as api from '../api'
import * as UTIL from '../services/utils'

/**
 * nav button action
 */


export const navAction = (payload) => {
    return {
        type: 'A_NAV',
        payload
    }

}

/**
 * api status
 */
export const fetchRecordRequestSent = (range) => {
    return {
        type: 'E_REQ_SENT',
        value: 'fetch booking record ' + range,
    }
}

export const fetchRecordFailed = (statusText) => {
    return {
        type: 'E_REQ_FAILED',
        value: statusText,
    }
}

export const fetchRecordSuccess = (data, range) => {
    return {
        type: 'E_REQ_SUCCESS',
        payload: data,
        scope: range,
    }
}

/**
 * fetch records action
 */
export const fetchBookingRecordAction = (range) => {
    return (dispatch, getState) => {
        dispatch(fetchRecordRequestSent(range))
        api.fetchBookingRecord(range)
            .then(response => {
                if (response.status !== 200) {
                    dispatch(fetchRecordFailed(response.statusText))
                } else {
                    return response.json()
                        .then(result => {
                            dispatch(fetchRecordSuccess(result, range))
                        })
                        .catch(e => {
                            console.log(e)
                        })
                }
            }).catch(e => {
                console.log(e);
            })
    }
}

/**
 * fetch checkin data in 7 days
 */
export const fetchBookingRecordCheckInAction = () => {
    return (dispatch, getState) => {
        dispatch(fetchRecordRequestSent('checkin in  7 days'))
        api.fetchBookingRecordCheckIn('7')
            .then(response => {
                if (response.status !== 200) {
                    dispatch(fetchRecordFailed(response.statusText))
                } else {
                    return response.json()
                        .then(result => {
                            dispatch(fetchRecordSuccess(result, 'checkin'))
                        })
                        .catch(e => {
                            console.log(e)
                        })
                }
            }).catch(e => {
                console.log(e);
            })
    }
}

/**
 * comment dialog actions
 */

export const selectRecordAction = (uuid) => {
    return {
        type: 'E_RECORD_SELECTED',
        uuid: uuid,
    }
}

export const showCommentsAction = (payload) => {
    return {
        type: 'A_SHOW_COMMENTS',
        payload
    }
}

export const closeCommentsAction = () => {
    return {
        type: 'A_CLOSE_COMMENTS',
    }
}

export const setCommentorAction = (payload) => {
    return {
        type: 'A_SET_COMMENTOR',
        payload
    }
}

export const commentChangeAction = (payload) => {
    return {
        type: 'E_COMMENT_CHANGE',
        payload
    }
}

export const submitNewCommentAction = () => {
    return (dispatch, getState) => {
        const record = getState().uiReducer.dialogRecord
        const newComment = getState().uiReducer.newComment
        if (newComment.length > 2) {
            api.addNewComment(record.UUID, newComment, record.Operation)
                .then(
                response => {
                    if (response.status !== 200) {
                        dispatch(fetchRecordFailed(response.statusText))
                    } else {
                        return response.json()
                            .then(result => {
                                if (getState().uiReducer.currentIndex === 1) {
                                    dispatch(fetchBookingRecordAction(7))
                                } else if (getState().uiReducer.currentIndex === 0) {
                                    dispatch(fetchBookingRecordAction(-3))
                                } else if (getState().uiReducer.currentIndex === 2) {
                                    dispatch(fetchBookingRecordCheckInAction())
                                }

                                dispatch(closeCommentsAction())
                            }).catch(e => {
                                console.log(e)
                            })
                    }
                }
                ).catch(e => {
                    console.log(e);
                })
        } else {
            dispatch(closeCommentsAction())
        }
    }
}

/**
 * checkout dialog actions
 */

export const setCheckoutHourAction = (payload) => {
    return {
        type: 'E_CHECKOUT_HOUR',
        payload
    }
}

export const setCheckoutAMPMAction = (payload) => {
    return {
        type: 'E_CHECKOUT_AMPM',
        payload
    }
}

export const closeCheckoutsAction = () => {
    return {
        type: 'E_CHECKOUT_CLOSE',
    }
}

export const openCheckoutsAction = (payload) => {
    return {
        type: 'E_CHECKOUT_OPEN',
        payload
    }
}

export const submitNewCheckoutAction = () => {
    return (dispatch, getState) => {
        const uuid = getState().dashboardReducer.currentRecordUUID
        const checkout = getState().uiReducer.checkOutTimeHour + ' ' + getState().uiReducer.checkOutTimeAMPM
        const range = getState().uiReducer.currentIndex === 1 ? '7' : '-3'
        api.setCheckout(uuid, checkout)
            .then(response => {
                if (response.status !== 200) {
                    dispatch(fetchRecordFailed(response.statusText))
                } else {
                    return response.json()
                        .then(result => {
                            dispatch(fetchBookingRecordAction(range))
                            dispatch(closeCheckoutsAction())
                        }).catch(e => {
                            console.log(e)
                        })
                }
            }).catch(e => {
                console.log(e);
            })
    }
}

/**
 * checkin dialog actions
 */

export const setCheckinHourAction = (payload) => {
    return {
        type: 'E_CHECKIN_HOUR',
        payload
    }
}

export const setCheckinAMPMAction = (payload) => {
    return {
        type: 'E_CHECKIN_AMPM',
        payload
    }
}

export const closeCheckinAction = () => {
    return {
        type: 'E_CHECKIN_CLOSE',
    }
}

export const openCheckinAction = (payload) => {
    return {
        type: 'E_CHECKIN_OPEN',
        payload
    }
}

export const submitNewCheckinAction = () => {
    return (dispatch, getState) => {
        const uuid = getState().dashboardReducer.currentRecordUUID
        const checkin = getState().uiReducer.checkInTimeHour + ' ' + getState().uiReducer.checkInTimeAMPM
        api.setCheckin(uuid, checkin)
            .then(response => {
                if (response.status !== 200) {
                    dispatch(fetchRecordFailed(response.statusText))
                } else {
                    return response.json()
                        .then(result => {
                            dispatch(fetchBookingRecordCheckInAction())
                            dispatch(closeCheckinAction())
                        }).catch(e => {
                            console.log(e)
                        })
                }
            }).catch(e => {
                console.log(e);
            })
    }
}

/**
 * user select a item in checkin ui
 * 
 */
export const menuItemSelectedCheckInAction = (menuIndex) => {
    return (dispatch, getState) => {
        const uuid = getState().dashboardReducer.currentRecordUUID
        const records = getState().dashboardReducer.bookingRecordCheckIn
        const payload = UTIL.getRecordByUUID(uuid, records)
        if (menuIndex === 0) {
            dispatch(showCommentsAction(payload))
        } else if (menuIndex === 1) {  //set checkin time
            dispatch(openCheckinAction(payload))
        } else {
            //do nothing
        }
    }
}

/**
 * user select a item in checkout ui
 */

export const menuItemSelectedAction = (menuIndex) => {
    return (dispatch, getState) => {
        const uuid = getState().dashboardReducer.currentRecordUUID
        const range = getState().uiReducer.currentIndex === 1 ? '7' : '-3'
        const records = getState().uiReducer.currentIndex === 0 ?
            getState().dashboardReducer.bookingRecordThisWeek :
            getState().dashboardReducer.bookingRecordNextWeek
        const payload = UTIL.getRecordByUUID(uuid, records)

        //set clean status
        if (menuIndex === 0 || menuIndex === 1 || menuIndex === 2) {
            let cleanStatus = ''
            switch (menuIndex) {
                case 0:
                    cleanStatus = 'cleaned'
                    break
                case 1:
                    cleanStatus = 'processing'
                    break
                default:
                    cleanStatus = 'N/A'
            }
            api.setClean(uuid, cleanStatus)
                .then(response => {
                    if (response.status !== 200) {
                        dispatch(fetchRecordFailed(response.statusText))
                    } else {
                        return response.json()
                            .then(result => {
                                dispatch(fetchBookingRecordAction(range))
                            }).catch(e => {
                                console.log(e)
                            })
                    }
                }).catch(e => {
                    console.log(e);
                })
        } else if (menuIndex === 3) {  //set checkout time
            dispatch(openCheckoutsAction(payload))
        }
        else {  //comments
            dispatch(showCommentsAction(payload))
        }
    }
}

/**
 * get system sync status action
 */

export const fetchSyncStatusSuccess = (payload) => {
    return {
        type: 'E_GET_SYNC_SUCCESS',
        payload
    }
}

export const getSystemSyncAction = (payload) => {
    return (dispatch, getState) => {
        api.getSyncStatus()
            .then(response => {
                if (response.status !== 200) {
                    dispatch(fetchRecordFailed(response.statusText))
                } else {
                    return response.json()
                        .then(result => {
                            dispatch(fetchSyncStatusSuccess(result))
                            dispatch(navAction(payload))
                        }).catch(e => {
                            console.log(e)
                        })
                }
            })
            .catch(e => {
                console.log(e);
            })
    }
}