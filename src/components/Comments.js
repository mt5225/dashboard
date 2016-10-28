import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { closeCommentsAction, setCommentorAction, commentChangeAction, submitNewCommentAction} from '../actions'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import CommentsList from './CommentsList'

class Comments extends Component {
    render() {
        const actions = [
             <FlatButton
                label="提 交"
                primary={true}
                keyboardFocused={false}
                onTouchTap={this.props.handleSubmit}
                />,
            <FlatButton
                label="关 闭"
                primary={false}
                keyboardFocused={true}
                onTouchTap={this.props.handleClose}
                />,
        ];

        const customContentStyle = {
            width: '85%',
            maxWidth: 'none',
        };

        const titleStyle = {
            fontSize: 18,
            paddingBottom: 0,

        }

        const roomDetail = this.props.open ? (<div>
            <p> {"房间号 " + this.props.record.Room +
                " 入住: " + this.props.record.CheckIn.substring(0, 10) +
                " 退房: " + this.props.record.CheckOut.substring(0, 10) + 
                " 负责人: " + this.props.record.Operation}</p>
            <CommentsList comments={this.props.record.Comments}/>
            <TextField
                hintText="点击输入留言信息"
                onChange={this.props.handleCommentChange}
                floatingLabelText="新增留言"
                floatingLabelFixed={true}
                /><br />
        </div>
        )
            : ''
        return (
            <div>
                <Dialog
                    title="详细"
                    actions={actions}
                    modal={false}
                    contentStyle={customContentStyle}
                    open={this.props.open}
                    titleStyle={titleStyle}
                    onRequestClose={this.props.handleClose}
                    autoScrollBodyContent={true}
                    >
                    {roomDetail}
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentIndex: state.uiReducer.currentIndex,
        open: state.uiReducer.showComment,
        record: state.uiReducer.dialogRecord
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleClose: () => {
            dispatch(closeCommentsAction())
        },
        handleSubmit: () => {
            dispatch(submitNewCommentAction())
        },
        handleCommentChange: (e) => {
            dispatch(commentChangeAction(e.target.value))
        },
        setCommentor: (e, key, payload) => {
            dispatch(setCommentorAction(payload))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Comments)