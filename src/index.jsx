import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import MelonMail from './MelonMail';

render((<AppContainer><MelonMail /></AppContainer>), document.getElementById('app'));

module.hot.accept();