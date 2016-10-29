import React, { Component } from 'react';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/action/autorenew';
import IconHistory from 'material-ui/svg-icons/action/history'
import IconToday from 'material-ui/svg-icons/action/today'
import BookingList from './BookingList'
import { connect } from 'react-redux'
import { navAction, getSystemSyncAction } from '../actions'
import SyncStatus from './SyncStatus'

const nearbyIcon = <IconLocationOn />
const historyIcon = <IconHistory />
const todayIcon = <IconToday />

class Dashboard extends Component {
    render() {
        const main = this.props.mode === 'list' ? (<BookingList />) : (<SyncStatus status={this.props.syncstatus}/>)
        return (
            <div>
                <Paper zDepth={1}>
                    <br />
                    <BottomNavigation selectedIndex={this.props.currentIndex}>
                        <BottomNavigationItem
                            label="过去3天"
                            icon={historyIcon}
                            onTouchTap={this.props.navSelect.bind(this, 0)}
                            />
                        <BottomNavigationItem
                            label="今日及未来7天"
                            icon={todayIcon}
                            onTouchTap={this.props.navSelect.bind(this, 1)}
                            />
                        <BottomNavigationItem
                            label="系统状态"
                            icon={nearbyIcon}
                            onTouchTap={this.props.navSelect.bind(this, 2)}
                            />
                    </BottomNavigation>
                </Paper>
                {main}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentIndex: state.uiReducer.currentIndex,
        mode: state.uiReducer.mode,
        syncstatus: state.dashboardReducer.syncStatus,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        navSelect: (index) => {
            let payload = {
                value: index
            }
            if (index === 2) {
                dispatch(getSystemSyncAction(payload))
            } else {
                dispatch(navAction(payload))
            }
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)