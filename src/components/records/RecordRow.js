import React from 'react';
import { Holdable } from 'react-touch';

import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import ListItem from 'material-ui/List/ListItem';
import MenuItem from 'material-ui/MenuItem';

import DeleteIcon from 'material-ui/svg-icons/action/delete';
import DescriptionIcon from 'material-ui/svg-icons/action/description';
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import { red300, blue300 } from 'material-ui/styles/colors';

export default (props) => {
    const {
        record,
        onDeleteClick,
        onEditClick,
    } = props;

    return (
      <ListItem
        key={record._id}
        leftAvatar={<Avatar icon={<DescriptionIcon />} backgroundColor={blue300} />}
        rightIconButton={
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
            useLayerForClickAway={true} // the popover will render on top of an invisible layer, which will prevent clicks to the underlying elements
          >
            <MenuItem
              primaryText={`Edit ${record.key}`}
              leftIcon={<ModeEditIcon color={blue300} />}
              onClick={() => { onEditClick(record._id); }}/>
            <MenuItem 
              primaryText={`Shred ${record.key}`}
              leftIcon={<DeleteIcon color={red300} />}
              onClick={() => { onDeleteClick(record._id); }} />
          </IconMenu>
        }
        primaryText={record.key}
        secondaryText={record.value}
      />   
    );
}
