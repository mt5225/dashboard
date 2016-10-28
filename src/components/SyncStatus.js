import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'

class SystemStatus extends Component {
    render() {
        const timeStr = "" + moment.utc(this.props.status.createdAt).toDate()
        return (
            <div className='syncStatus'>
                <p> 上次同步时间: {timeStr} </p>
                <p> 处理纪录数: {this.props.status.total} </p>
                <p> 其中新增{this.props.status.insert}条，更新{this.props.status.insert}条</p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.dashboardReducer.syncStatus,
    }
}

export default connect(mapStateToProps, null)(SystemStatus)