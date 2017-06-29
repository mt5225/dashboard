import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { closeCheckoutsAction, setCheckoutHourAction, setCheckoutAMPMAction, submitNewCheckoutAction } from '../actions'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'

class CheckoutTimeDialog extends Component {

    render() {
        const actions = [
            <RaisedButton
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

        const styles = {
            checkouttime: {
                width: '30%',
                textAlign: 'center',
            },
            oneline: {
                display: 'flex',
                flexDirection: 'row',
                width: '35%'
            }
        }

        return (
            <Dialog
                title="设定退房时间(HH:MM)"
                actions={actions}
                modal={false}
                contentStyle={customContentStyle}
                open={this.props.open}
                titleStyle={titleStyle}
                onRequestClose={this.props.handleClose}
            >
                <div style={styles.on}>
                    <TextField id="text-field-checkout"
                        defaultValue={this.props.hour}
                        style={styles.checkouttime}
                        onChange={this.props.handleHour}
                    />
                    <br />
                    <br />
                    <RadioButtonGroup name="ampm"
                        defaultSelected={this.props.ampm}
                        style={styles.oneline}
                        onChange={this.props.handleAMPM}>
                        <RadioButton
                            value="PM"
                            label="下午"
                            colSpan={3}
                        />
                        <RadioButton
                            value="AM"
                            label="上午"
                            colSpan={3}
                        />
                    </RadioButtonGroup>

                </div>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentIndex: state.uiReducer.currentIndex,
        open: state.uiReducer.showCheckoutTimeDialog,
        record: state.uiReducer.dialogRecord,
        hour: state.uiReducer.checkOutTimeHour,
        ampm: state.uiReducer.checkOutTimeAMPM,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleClose: () => {
            dispatch(closeCheckoutsAction())
        },
        handleSubmit: () => {
            dispatch(submitNewCheckoutAction())
        },
        handleAMPM: (e, value) => {
            dispatch(setCheckoutAMPMAction(value))
        },
        handleHour: (e, value) => {
            dispatch(setCheckoutHourAction(value))
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CheckoutTimeDialog)