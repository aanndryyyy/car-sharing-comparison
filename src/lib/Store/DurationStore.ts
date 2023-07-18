import { derived, writable } from 'svelte/store'

function createMinutes() {
  let _minutes = 0

  const { subscribe } = derived(
    duration,
    ($duration) => (_minutes = $duration % 60)
  )

  const modify = (value: number) => {
    duration.update((totalDurationInMinutes) => {
      totalDurationInMinutes -= _minutes
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
  let _hours = 0

  const { subscribe } = derived(
    duration,
    ($duration) => (_hours = Math.floor($duration / 60) % 24)
  )

  const modify = (value: number) => {
    duration.update((totalDurationInMinutes) => {
      totalDurationInMinutes -= _hours * 60
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
  let _days = 0

  const { subscribe } = derived(
    duration,
    ($duration) => (_days = Math.floor($duration / (60 * 24)))
  )

  const modify = (value: number) => {
    duration.update((totalDurationInMinutes) => {
      totalDurationInMinutes -= _days * 24 * 60
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

export const duration = writable<number>(60)
export const minutes = createMinutes()
export const hours = createHours()
export const days = createDays()
