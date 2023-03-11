import { browser } from '$app/environment'
import { init, register } from 'svelte-i18n'

const defaultLocale = 'en-GB'

register( 'en-GB', () => import( '../../locales/en-GB.json' ) );
register( 'et', () => import( '../../locales/et.json' ) );

init({
	fallbackLocale: defaultLocale,
	initialLocale: browser ? window.navigator.language : defaultLocale,
})