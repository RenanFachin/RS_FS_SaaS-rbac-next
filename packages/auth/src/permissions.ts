import { AbilityBuilder } from '@casl/ability'

import { AppAbility } from '.'
import { User } from './models/user'
import { Role } from './roles'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN: (user, builder) => {
    const { can, cannot } = builder

    can('manage', 'all') // admin pode gerenciar tudo

    cannot('transfer_ownership', 'Organization') // definindo que o adm não pode transferir o dono de organizações
    can('transfer_ownership', 'Organization', { ownerId: { $eq: user.id } }) // Ele pode apenas transferir organizações na qual ele seja o dono

    cannot('update', 'Organization') // não pode fazer update em qualquer organização
    can('update', 'Organization', { ownerId: { $eq: user.id } }) // Ele pode apenas fazer update na organização que for dele
  },
  MEMBER: (user, builder) => {
    const { can } = builder

    can('get', 'User')
    can(['create', 'get'], 'Project')
    can(['update', 'delete'], 'Project', { ownerId: { $eq: user.id } })
  },
  BILLING: (_user, builder) => {
    const { can } = builder

    can('manage', 'Billing')
  },
}
