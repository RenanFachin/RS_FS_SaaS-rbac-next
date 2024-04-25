import {
  AbilityBuilder,
  CreateAbility,
  createMongoAbility,
  MongoAbility,
} from '@casl/ability'

import { User } from './models/user'
import { permissions } from './permissions'
import { ProjectSubject } from './subjects/project'
import { UserSubject } from './subjects/user'

// Aplicando as permissões conforme os cargos, especificados no Subject de cada entidade
type AppAbilities = UserSubject | ProjectSubject | ['manage', 'all']

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

  const ability = builder.build()
  return ability
}
