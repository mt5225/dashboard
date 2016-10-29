import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import { fetchBookingRecordAction, fetchBookingRecordCheckInAction, navAction } from '../actions'
import Dialog from 'material-ui/Dialog'

class SystemStatus extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
        }


        this.handleClose = () => {
            this.setState({ open: false })
        }

        this.handleRefresh = () => {
            this.props.handleRefreshAction()
            this.setState({ open: true })
        }

    }

    render() {
        const timeStr = "" + moment.utc(this.props.status.createdAt).toDate()
        const actions = [
            <RaisedButton
                label="知道了"
                primary={true}
                onTouchTap={this.handleClose}
                />,
        ];
        const dialog = (
            <Dialog
                title="更新数据成功 !"
                actions={actions}
                modal={true}
                open={this.state.open}
                >
        </Dialog>
        )
        return (
            <div className='syncStatus'>
                <p> 最近一次同步时间 </p>
                <p> &nbsp;{timeStr} </p>
                <p> 处理纪录数: {this.props.status.process} </p>
                <p> 其中新增{this.props.status.insert}条，更新{this.props.status.updated}条</p>
                <br />
                <RaisedButton
                    label="刷 新"
                    primary={true}
                    keyboardFocused={false}
                    onTouchTap={this.handleRefresh}
                    />
                    {dialog}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.dashboardReducer.syncStatus,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleRefreshAction: () => {
            dispatch(fetchBookingRecordAction('-3'))
            dispatch(fetchBookingRecordAction('7'))
            dispatch(fetchBookingRecordCheckInAction())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemStatus)