import React, { Component } from 'react'
import { connect } from 'react-redux'
import { recordSelectedAction, fetchBookingRecordAction, selectRecordAction, menuItemSelectedAction } from '../actions'
import { List, ListItem } from 'material-ui/List';
import LabelOutline from 'material-ui/svg-icons/action/label-outline'
import Avatar from 'material-ui/Avatar'
import { lightBlack } from 'material-ui/styles/colors'
import Subheader from 'material-ui/Subheader'
import * as CONSTANT from '../services/constants'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import { blue400, red400, green400 } from 'material-ui/styles/colors';
import Comments from './Comments'
import CheckoutTimeDialog from './CheckoutTimeDialog'


class BookingList extends Component {
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
    componentWillMount() {
        // load booking data
        this.props.fetchDataPast()
        this.props.fetchDataNext()
    }


    genItemList(query) {
        return this.props.bookingRecord[query].map(
            (item) => {
                let status = ''
                let bgColour = {}
                switch (item.Status) {
                    case 'cleaned':
                        status = '保洁完成'
                        bgColour = green400
                        break
                    case 'processing':
                        status = '保洁进行中 ...'
                        bgColour = blue400
                        break
                    default:
                        status = '待保洁'
                        bgColour = red400
                }

                return (<ListItem
                    key={item.UUID}
                    value={item.UUID}
                    primaryText={
                        <div>
                            房号：{item.Room}
                            <p>
                                <span style={{
                                    color: lightBlack,
                                    fontSize: 12,
                                }}>
                                    {" 客户: " + item.Name + " 国籍: " + item.Nationality +
                                        " 住宿天数: " + item.TotalNight}
                                </span>
                            </p>
                            <p> {" 退房日期: " + item.CheckOut.substring(0, 10)}</p>
                            <p> {" 退房时间: 12:00 PM"}</p>
                            <p> {" 状态: " + status}</p>
                        </div>
                    }
                    onTouchTap={this.handleTouchTap}
                    leftAvatar={<Avatar icon={<LabelOutline />} backgroundColor={bgColour} />}
                    secondaryTextLines={2}
                    secondaryText={
                        <p>
                            {'负责人: ' + item.Operation}
                        </p>
                    }
                    />
                )
            }
        )
    }

    render() {
        //this week list
        const listItemThisWeek = this.props.bookingRecord.thisWeekLoaded ?
            this.genItemList('bookingRecordThisWeek') : ''
        const numberOfRecordsThisWeek = this.props.bookingRecord.thisWeekLoaded ?
            this.props.bookingRecord.bookingRecordThisWeek.length : 0

        //next week list
        const listItemNextWeek = this.props.bookingRecord.nextWeekLoaded ?
            this.genItemList('bookingRecordNextWeek') : ''

        const numberOfRecordsNextWeek = this.props.bookingRecord.nextWeekLoaded ?
            this.props.bookingRecord.bookingRecordNextWeek.length : 0

        const comments = this.props.showCommentDialog ? (<Comments />) : ''
        const checkouttime = this.props.showCheckoutTimeDialog ? (<CheckoutTimeDialog />) : ''

        return (
            <div>
                <div style={this.props.currentIndex === 0 ? CONSTANT.showElement : CONSTANT.hideElement}>
                    <List >
                        <Subheader inset={true}>共{numberOfRecordsThisWeek}条记录</Subheader>
                        {listItemThisWeek}
                    </List>
                </div>
                <div style={this.props.currentIndex === 1 ? CONSTANT.showElement : CONSTANT.hideElement}>
                    <List >
                        <Subheader inset={true}>共{numberOfRecordsNextWeek}条记录</Subheader>
                        {listItemNextWeek}
                    </List>
                </div>
                <div>
                    <Popover
                        open={this.state.open}
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{ horizontal: 'middle', vertical: 'center' }}
                        targetOrigin={{ horizontal: 'left', vertical: 'center' }}
                        onRequestClose={this.handleRequestClose}
                        >
                        <Menu onItemTouchTap={this.handleMenuItemClick}>
                            <MenuItem primaryText="保洁完成" />
                            <MenuItem primaryText="保洁进行中" />
                            <MenuItem primaryText="待保洁" />
                            <MenuItem primaryText="设定退房时间" />
                            <MenuItem primaryText="留言" />
                        </Menu>
                    </Popover>
                </div>
                {comments}
                {checkouttime}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentIndex: state.uiReducer.currentIndex,
        bookingRecord: state.dashboardReducer,
        showCommentDialog: state.uiReducer.showComment,
        showCheckoutTimeDialog: state.uiReducer.showCheckoutTimeDialog,
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
        fetchDataPast: () => {
            dispatch(fetchBookingRecordAction('-3'))
        },
        fetchDataNext: () => {
            dispatch(fetchBookingRecordAction('4'))
        },
        menuItemSelected: (index) => {
            dispatch(menuItemSelectedAction(index))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingList)