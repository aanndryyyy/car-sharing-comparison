import { derived, get, writable } from 'svelte/store'

function createMinutes() {
  const { subscribe } = derived(duration, ($duration) => $duration % 60)

  const modify = (value: number) => {
    duration.update((totalDurationInMinutes) => {
      totalDurationInMinutes -= get(minutes)
      totalDurationInMinutes += value

      return totalDurationInMinutes
    })
  }

  return {
    subscribe,
    update: modify,
    set: modify,
  }
}

function createHours() {
  const { subscribe } = derived(
    duration,
    ($duration) => Math.floor($duration / 60) % 24
  )

  const modify = (value: number) => {
    duration.update((totalDurationInMinutes) => {
      totalDurationInMinutes -= get(hours) * 60
      totalDurationInMinutes += value * 60

      return totalDurationInMinutes
    })
  }

  return {
    subscribe,
    update: modify,
    set: modify,
  }
}

function createDays() {
  const { subscribe } = derived(duration, ($duration) =>
    Math.floor($duration / (60 * 24))
  )

  const modify = (value: number) => {
    duration.update((totalDurationInMinutes) => {
      totalDurationInMinutes -= get(days) * 24 * 60
      totalDurationInMinutes += value * 24 * 60

      return totalDurationInMinutes
    })
  }

  return {
    subscribe,
    update: modify,
    set: modify,
  }
}

export const duration = writable<number>(86)
export const minutes = createMinutes()
export const hours = createHours()
export const days = createDays()
