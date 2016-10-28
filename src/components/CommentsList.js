import React, { Component, PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import FileFolder from 'material-ui/svg-icons/file/folder'
import Avatar from 'material-ui/Avatar'
import moment from 'moment'

class CommentsList extends Component {
    render() {
        const items = this.props.comments.map(
            (item) => {
                return (<ListItem
                    leftAvatar={<Avatar icon={<FileFolder />} />}
                    primaryText={item.content}
                    key={item.createdAt}
                    secondaryText={item.author + "发表于" + moment.utc(item.createdAt).toDate()}
                    secondaryTextLines={2}
                    />
                )
            }
        )
        return (
            <List>
                <Subheader>{'共' + this.props.comments.length + '条留言'}</Subheader>
                {items}
            </List>
        );
    }
}

CommentsList.propTypes = {
    comments: PropTypes.array,
};

export default CommentsList;