import React from 'react';
import loadable from '@loadable/component';
import LoadingPageComponent from '../../components/LoadingPageComponent';

export default loadable(() => import('./Home.js'), { fallback: <LoadingPageComponent route="home" /> });
