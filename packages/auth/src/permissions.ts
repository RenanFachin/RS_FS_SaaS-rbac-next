import { AbilityBuilder } from '@casl/ability'

import { AppAbility } from '.'
import { User } from './models/user'
import { Role } from './roles'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN: (_user, builder) => {
    const { can } = builder

    can('manage', 'all') // Um admin pode geranciar todas as ações e qualquer entidade
  },
  MEMBER: (_user, builder) => {
    const { can } = builder

    // can('invite', 'User') // um membro pode apenas convidar um outro usuário
    can('manage', 'Project')
  },
  BILLING: () => {},
}
