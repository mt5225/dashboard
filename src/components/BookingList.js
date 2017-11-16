import React, { Component } from 'react'
import { connect } from 'react-redux'
import {fetchBookingRecordAction, selectRecordAction, menuItemSelectedAction, fetchBookingRecordCheckInAction } from '../actions'
import { List, ListItem } from 'material-ui/List';
import LabelOutline from 'material-ui/svg-icons/action/label-outline'
import Avatar from 'material-ui/Avatar'
import { lightBlack } from 'material-ui/styles/colors'
import Subheader from 'material-ui/Subheader'
import * as CONSTANT from '../services/constants'
import * as UTIL from '../services/utils'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import { blue400, red400, green400, lightGreen100, red200 } from 'material-ui/styles/colors';
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
    componentDidMount() {
        // load booking data
        this.props.fetchDataPast()
        this.props.fetchDataNext()
        this.props.fetchDataCheckIn()
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
                const msg = item.Comments.length > 0 ?
                    (<span style={{
                        backgroundColor: lightGreen100,
                        fontSize: 12
                    }}> {item.Comments.length + "条留言"} </span>
                    )
                    : ''
                let inout = ''
                if (this.props.bookingRecord.checkinLoaded) {
                    inout = UTIL.findInOut(item, this.props.CheckIns) ? (
                        (<span style={{
                            backgroundColor: red200,
                            fontSize: 12
                        }}> {"当日有入住"} </span>
                        )
                    ) : ''
                }
                return (<ListItem
                    key={item.UUID}
                    value={item.UUID}
                    primaryText={
                        <div>
                            <b>{" 退房日: " + item.CheckOut.substring(0, 10)} </b>&nbsp; {msg}&nbsp; {inout}
                            <p>
                                <span style={{
                                    color: lightBlack,
                                    fontSize: 12,
                                }}>
                                    {" 客户: " + item.Name + " 国籍: " + item.Nationality +
                                        " 住宿天数: " + item.TotalNight}
                                </span>
                            </p>
                            <p> {" 退房时间: " + item.CheckoutTime} </p>
                            <p>  房号：{item.Room} </p>
                            <p> {" 状态: " + status}</p>
                        </div>
                    }
                    onTouchTap={this.handleTouchTap}
                    leftAvatar={<Avatar icon={<LabelOutline />} backgroundColor={bgColour} />}
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
    }

    render() {
        //past list
        const listItemThisWeek = this.props.bookingRecord.thisWeekLoaded ?
            this.genItemList('bookingRecordThisWeek') : ''
        const numberOfRecordsThisWeek = this.props.bookingRecord.thisWeekLoaded ?
            this.props.bookingRecord.bookingRecordThisWeek.length : 0

        //future list
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
        CheckIns: state.dashboardReducer.bookingRecordCheckIn,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch,
        fetchDataPast: () => {
            dispatch(fetchBookingRecordAction('-3'))
        },
        fetchDataNext: () => {
            dispatch(fetchBookingRecordAction('7'))
        },
        fetchDataCheckIn: () => {
            dispatch(fetchBookingRecordCheckInAction())
        },
        menuItemSelected: (index) => {
            console.log(index)
            dispatch(menuItemSelectedAction(index))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingList)