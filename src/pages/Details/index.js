import React from 'react';
import loadable from '@loadable/component';
import LoadingPageComponent from '../../components/LoadingPageComponent';

export default loadable(() => import('./Details.js'), { fallback: <LoadingPageComponent route="details" /> });
