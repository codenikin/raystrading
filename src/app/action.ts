//typescript
// src/app/actions.ts

'use server' // <-- This must be at the very top of the file

import { getPayload } from 'payload'
import config from '@/payload.config' // Ensure this path is correct

/**
 * An async function that runs exclusively on the server.
 * All arguments are serialized and sent from the client.
 */
export async function serverFunction(...args: any[]) {
  // Use the local Payload API for server-side operations
  const payload = await getPayload({ config })

  // Add your specific server-side logic here.
  // For example, finding a document, updating, etc.
  console.log('Server function executed from Payload layout')

  // You can return data from this function, which will be sent back to the client.
  return { success: true }
}
