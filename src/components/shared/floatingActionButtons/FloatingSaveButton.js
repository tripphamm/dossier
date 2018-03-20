import React from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentSave from 'material-ui/svg-icons/content/save';
import * as style from './floatingActionButton.css';

export default (props) => {
  return (
    <FloatingActionButton
      style={style.floatingActionButton}
      onClick={props.onClick}>
      <ContentSave />
    </FloatingActionButton>
  );
}