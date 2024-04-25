// https://casl.js.org/v6/en/advanced/typescript#safer-permissions-inference
import { z } from 'zod'

// tupla = array com 2 posições
export const billingSubject = z.tuple([
  z.union([z.literal('manage'), z.literal('get'), z.literal('export')]),
  z.literal('Billing'),
])

export type BillingSubject = z.infer<typeof billingSubject>
