import React from 'react';

import Shell from 'components/shared/Shell';
import { appBarHeightPx } from 'settings/style';

export default (props) => {
  const {
    message,
    icon
  } = props;

  return (
    <Shell>
      <div style={{
        height: `calc(100vh - ${appBarHeightPx}px)`,
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
        {icon}
        <div>{message}</div>

      </div>
    </Shell>
  );
}
