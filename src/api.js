/**
 * fetch booking record for data range
 */
export function fetchBookingRecord(range) {
    const url = "http://localhost:4040/api/bookingrecords/days/" + range
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
    const url = "http://localhost:4040/api/bookingrecords/records/" + uuid
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
    const url = "http://localhost:4040/api/bookingrecords/records/" + uuid + '/comments'
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
    const url = "http://localhost:4040/api/bookingrecords/records/" + uuid + '/checkout'
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
    const url = "http://localhost:4040/api/bookingrecords/syncstatus"
    return fetch(url, {
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        method: 'GET',
    })
}