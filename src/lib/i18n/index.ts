// import { browser } from '$app/environment'
// import { init, register } from 'svelte-i18n'

const defaultLocale = 'en-US'

// register( 'en-US', () => import( '../../locales/en-US.json' ) );
// register( 'et', () => import( '../../locales/et.json' ) );

import { init, addMessages } from 'svelte-i18n';

import et from '../../locales/et.json';
import enUS from '../../locales/en-US.json';

addMessages('et', et);
addMessages('en-US', enUS);

init({
	fallbackLocale: defaultLocale,
	initialLocale: defaultLocale,
})