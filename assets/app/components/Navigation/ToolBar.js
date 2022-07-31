import React from 'react';

import Logo from '../Logo/Logo';
import MainToolBar from './MainToolBar/MainToolBar';
import SubToolBar from './SubToolBar/SubToolBar';

const toolbar = () => (
    <header>
        <Logo/>
        <SubToolBar/>
        <MainToolBar />
    </header>
);

export default toolbar;