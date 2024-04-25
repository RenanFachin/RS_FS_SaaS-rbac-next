// https://casl.js.org/v6/en/advanced/typescript#safer-permissions-inference
import { z } from 'zod'

// tupla = array com 2 posições
export const projectSubject = z.tuple([
  z.union([
    z.literal('create'),
    z.literal('delete'),
    z.literal('manage'),
    z.literal('get'),
    z.literal('update'),
  ]),
  z.literal('Project'),
])

export type ProjectSubject = z.infer<typeof projectSubject>
