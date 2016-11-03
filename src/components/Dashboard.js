import React, { Component } from 'react';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/action/autorenew';
import IconHistory from 'material-ui/svg-icons/action/history'
import IconToday from 'material-ui/svg-icons/action/today'
import IconCheckIn from 'material-ui/svg-icons/action/card-travel'
import BookingList from './BookingList'
import CheckInList from './CheckInList'
import { connect } from 'react-redux'
import { navAction, getSystemSyncAction } from '../actions'
import SyncStatus from './SyncStatus'

const nearbyIcon = <IconLocationOn />
const historyIcon = <IconHistory />
const todayIcon = <IconToday />
const checkInIcon = <IconCheckIn />

class Dashboard extends Component {
    getContent() {
        switch (this.props.mode) {
            case 'list':
                return (<BookingList />)
            case 'sync':
                return (<SyncStatus status={this.props.syncstatus} />)
            case 'checkin':
                return (<CheckInList />)
            default:
                return ""
        }
    }

    render() {
        const main = this.getContent()
        const toolBarStyle = {
            position: 'fixed',
            top: 0,
            zIndex: 2,
        }
        const mainStyle = {
            position: 'relative',
            top: 56,
        }
        return (
            <div>
                <div style={toolBarStyle}>
                    <Paper zDepth={1} >
                        <br />
                        <BottomNavigation selectedIndex={this.props.currentIndex}>
                            <BottomNavigationItem
                                label="过往退房"
                                icon={historyIcon}
                                onTouchTap={this.props.navSelect.bind(this, 0)}
                                />
                            <BottomNavigationItem
                                label="7天内退房"
                                icon={todayIcon}
                                onTouchTap={this.props.navSelect.bind(this, 1)}
                                />
                            <BottomNavigationItem
                                label="7日内入住"
                                icon={checkInIcon}
                                onTouchTap={this.props.navSelect.bind(this, 2)}
                                />
                            <BottomNavigationItem
                                label="系统状态"
                                icon={nearbyIcon}
                                onTouchTap={this.props.navSelect.bind(this, 3)}
                                />
                        </BottomNavigation>
                    </Paper>
                </div>
                <div style={mainStyle}>
                    {main}
                </div>
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
            if (index === 3) {
                dispatch(getSystemSyncAction(payload))
            } else {
                dispatch(navAction(payload))
            }
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)