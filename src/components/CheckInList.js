import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    recordSelectedAction,
    selectRecordAction, menuItemSelectedCheckInAction,
} from '../actions'
import { List, ListItem } from 'material-ui/List';
import LabelOutline from 'material-ui/svg-icons/action/label-outline'
import Avatar from 'material-ui/Avatar'
import { lightBlack } from 'material-ui/styles/colors'
import Subheader from 'material-ui/Subheader'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import {  green400, lightGreen100,} from 'material-ui/styles/colors';
import Comments from './Comments'
import * as CONSTANT from '../services/constants'
import CheckinTimeDialog from './CheckinTimeDialog'

class CheckInList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
        }
        this.handleTouchTap = (event) => {
            event.preventDefault();
            this.setState({
                open: true,
                anchorEl: event.currentTarget,
            })
            const uuid = event.currentTarget.getAttribute('value')
            this.props.dispatch(selectRecordAction(uuid))
        }
        this.handleRequestClose = (event) => {
            this.setState({
                open: false,
            })

        }
        this.handleMenuItemClick = (event, item, index) => {
            this.setState({
                open: false,
            })
            this.props.menuItemSelected(index)
        }
    }

    render() {
        const listItems = this.props.CheckIns.map(
            (item) => {
                const msg = item.Comments.length > 0 ?
                    (<span style={{
                        backgroundColor: lightGreen100,
                        fontSize: 12
                    }}> {item.Comments.length + "条留言"} </span>
                    )
                    : ''
                return (<ListItem
                    key={item.UUID}
                    value={item.UUID}
                    primaryText={
                        <div>
                            <b>{" 入住: " + item.CheckIn.substring(0, 10)} </b>&nbsp;{msg}
                            <p>
                                <span style={{
                                    color: lightBlack,
                                    fontSize: 12,
                                }}>
                                    {" 客户: " + item.Name + " 国籍: " + item.Nationality +
                                        " 住宿天数: " + item.TotalNight}
                                </span>
                            </p>
                            <p>  入住时间：{item.CheckinTime} </p>
                            <p> {" 退房: " + item.CheckOut.substring(0, 10)} </p>
                            <p>  房号：{item.Room} </p>
                        </div>
                    }
                    onTouchTap={this.handleTouchTap}
                    leftAvatar={<Avatar icon={<LabelOutline />} backgroundColor={green400}/>}
                    secondaryTextLines={2}
                    secondaryText={
                        <p>
                            {'Sales: ' + item.Sales}&nbsp;
                        </p>
                    }
                    />
                )
            }
        )
        return (
             <div style={CONSTANT.showElement}>
                <List >
                    <Subheader inset={true}>共{this.props.CheckIns.length}条记录</Subheader>
                    {listItems}
                </List>
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{ horizontal: 'middle', vertical: 'center' }}
                    targetOrigin={{ horizontal: 'left', vertical: 'center' }}
                    onRequestClose={this.handleRequestClose}
                    >
                    <Menu onItemTouchTap={this.handleMenuItemClick}>                
                        <MenuItem primaryText="留言" />
                        <MenuItem primaryText="设定入住时间" />
                    </Menu>
                </Popover>
                {this.props.showCommentDialog ? (<Comments />) : ''}
                {this.props.showCheckinTimeDialog ? (<CheckinTimeDialog />) : ''}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch,
        recordSelect: (recordId) => {
            let payload = {
                value: recordId
            }
            dispatch(recordSelectedAction(payload))
        },
        menuItemSelected: (index) => {
            dispatch(menuItemSelectedCheckInAction(index))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        currentIndex: state.uiReducer.currentIndex,
        showCommentDialog: state.uiReducer.showComment,
        showCheckinTimeDialog: state.uiReducer.showCheckinTimeDialog,
        CheckIns: state.dashboardReducer.bookingRecordCheckIn,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckInList)