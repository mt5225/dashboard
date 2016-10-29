/**
 * find record by uuid
 */
export const getRecordByUUID = (uuid, records) => {
    for (let index = 0; index < records.length; index++) {
        if (records[index].UUID === uuid) {
            return records[index]
        }
    }
    return null
}

/**
 * find check in and check out at same day
 */

export const findInOut = (record, checkInArray) => {
    for (let index = 0; index < checkInArray.length; index++) {
        if (record.Room === checkInArray[index].Room
            && record.CheckOut.substring(0, 10) === checkInArray[index].CheckIn.substring(0, 10)) {
            console.log(checkInArray[index])
            return checkInArray[index]
        }
    }
    return null
}