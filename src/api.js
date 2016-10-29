//const BASE_URL = 'localhost'
const BASE_URL = '52.53.191.1'

/**
 * fetch booking record for data range
 */
export function fetchBookingRecord(range) {
    const url = "http://" + BASE_URL + ":4040/api/bookingrecords/days/" + range
    return fetch(url, {
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        method: 'GET',
    })
}

export function fetchBookingRecordCheckIn(range) {
    const url = "http://" + BASE_URL + ":4040/api/bookingrecords/dayscheckin/" + range
    return fetch(url, {
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        method: 'GET',
    })
}
/**
 * set record as cleaned
 */
export function setClean(uuid, cleanStatus) {
    const url = "http://" + BASE_URL + ":4040/api/bookingrecords/records/" + uuid
    return fetch(url, {
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        method: 'POST',
        body: JSON.stringify({
            status: cleanStatus,
        })
    })
}

/**
 * add new commnet
 */
export function addNewComment(uuid, content, author) {
    const url = "http://" + BASE_URL + ":4040/api/bookingrecords/records/" + uuid + '/comments'
    return fetch(url, {
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        method: 'POST',
        body: JSON.stringify({
            author: author,
            content: content,
        })
    })
}

/**
 * set checkout time
 */
export function setCheckout(uuid, checkout) {
    const url = "http://" + BASE_URL + ":4040/api/bookingrecords/records/" + uuid + '/checkout'
    return fetch(url, {
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        method: 'POST',
        body: JSON.stringify({
            checkout: checkout,
        })
    })
}

/**
 * get sync status
 */

export function getSyncStatus() {
    const url = "http://" + BASE_URL + ":4040/api/bookingrecords/syncstatus"
    return fetch(url, {
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        method: 'GET',
    })
}