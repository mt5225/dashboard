import React, { Component } from 'react'
import Checkbox from 'material-ui/Checkbox'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'

class RecordEditor extends Component {
    render() {
        return (
            <div>
                <div>
                    <Subheader>房间保洁状态</Subheader>
                    <Checkbox
                        label="保洁完成"
                        value="yes"
                        />
                </div>
                <Divider/>
            </div>
        );
    }
}

export default RecordEditor;