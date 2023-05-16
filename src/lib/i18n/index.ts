const defaultLocale = 'en-US'

import { init, addMessages } from 'svelte-i18n'

import et from '../../locales/et.json'
import enUS from '../../locales/en-US.json'

addMessages('et', et)
addMessages('en-US', enUS)

init({
  fallbackLocale: defaultLocale,
  initialLocale: defaultLocale,
})
