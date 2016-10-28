const initialState = {
    currentIndex: 1,
    mode: 'list',
    showComment: false,
    dialogRecord: null,
    newComment: ''
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
        default:
            return state
    }
}

export default uiReducer