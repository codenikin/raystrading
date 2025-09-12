import { getPayload as getPayloadOriginal, type Payload } from 'payload'
import configPromise from '@payload-config'

let cachedPayload: Payload | null = null

export const getPayload = async (): Promise<Payload> => {
  if (cachedPayload) {
    return cachedPayload
  }

  try {
    cachedPayload = await getPayloadOriginal({ config: configPromise })
    return cachedPayload
  } catch (error) {
    console.error('Error initializing Payload:', error)
    throw error
  }
}
