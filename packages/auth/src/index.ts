import {
  AbilityBuilder,
  CreateAbility,
  createMongoAbility,
  MongoAbility,
} from '@casl/ability'
import { z } from 'zod'

import { User } from './models/user'
import { permissions } from './permissions'
import { billingSubject } from './subjects/billing'
import { inviteSubject } from './subjects/invite'
import { organizationSubject } from './subjects/organization'
import { projectSubject } from './subjects/project'
import { userSubject } from './subjects/user'

export * from './models/organization'
export * from './models/project'
export * from './models/user'
export * from './roles'

// Aplicando as permissões conforme os cargos, especificados no Subject de cada entidade
const appAbilitiesSchema = z.union([
  projectSubject,
  userSubject,
  organizationSubject,
  inviteSubject,
  billingSubject,
  z.tuple([z.literal('manage'), z.literal('all')]),
])

type AppAbilities = z.infer<typeof appAbilitiesSchema>

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityFor(user: User) {
  const builder = new AbilityBuilder(createAppAbility)

  // Verificando no arquivo permission.ts, se permission possui uma chave (ADMIN ou MEMBER) e caso a role passada não exista, retornar
  if (typeof permissions[user.role] !== 'function') {
    throw new Error(`Permissions for role ${user.role} not found.`)
  }

  // Caso exista, ou seja, caso seja ADMIN ou MEMBER
  permissions[user.role](user, builder)

  const ability = builder.build({
    detectSubjectType(subject) {
      return subject.__typename
    },
  })

  // Definindo o "this" de ability, mesmo com ela sendo desestruturada em outro local
  ability.can = ability.can.bind(ability)
  ability.cannot = ability.cannot.bind(ability)

  return ability
}
