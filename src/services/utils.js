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

