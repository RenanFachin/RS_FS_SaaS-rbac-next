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
  MEMBER: (user, builder) => {
    const { can } = builder

    can(['create', 'get'], 'Project')

    // O terceiro parâmetro é a condicional para que o membro possa ou não realizar o update e delete
    can(['update', 'delete'], 'Project', { ownerId: { $eq: user.id } })
  },
  BILLING: () => {},
}
