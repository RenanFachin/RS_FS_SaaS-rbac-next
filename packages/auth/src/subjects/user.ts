// https://casl.js.org/v6/en/advanced/typescript#safer-permissions-inference
import { z } from 'zod'

// tupla = array com 2 posições
export const userSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.literal('User'),
])

export type UserSubject = z.infer<typeof userSubject>
