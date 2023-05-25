import { Provider } from '$lib/Types/Enums/Provider'
import type { Service } from '$lib/types'

export default class GenericCar {
  constructor(readonly provider: Provider, readonly data: Service) {
    switch (provider) {
      case Provider.BOLT:
      // Setup
    }
  }
}
