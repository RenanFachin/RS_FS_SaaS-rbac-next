// https://casl.js.org/v6/en/advanced/typescript#safer-permissions-inference
import { z } from 'zod'

// tupla = array com 2 posições
export const inviteSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('create'),
    z.literal('get'),
    z.literal('delete'),
  ]),
  z.literal('Invite'),
])

export type InviteSubject = z.infer<typeof inviteSubject>
