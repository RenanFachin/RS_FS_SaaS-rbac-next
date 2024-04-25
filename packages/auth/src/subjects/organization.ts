// https://casl.js.org/v6/en/advanced/typescript#safer-permissions-inference
import { z } from 'zod'

// tupla = array com 2 posições
export const organizationSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
    z.literal('transfer_ownership'),
  ]),
  z.literal('Organization'),
])

export type OrganizationSubject = z.infer<typeof organizationSubject>
