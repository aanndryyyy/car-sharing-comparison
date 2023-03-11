import { browser } from '$app/environment'
import { init, register } from 'svelte-i18n'

const defaultLocale = 'en-US'

register( 'en-US', () => import( '../../locales/en-US.json' ) );
register( 'et', () => import( '../../locales/et.json' ) );

init({
	fallbackLocale: defaultLocale,
	initialLocale: browser ? window.navigator.language : defaultLocale,
})