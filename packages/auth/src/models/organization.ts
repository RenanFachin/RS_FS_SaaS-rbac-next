import { z } from 'zod'

// Não colocar todas as colunas que a entidade possui, apenas as informações que são importantes para a parte de permissões da aplicação
export const organizationSchema = z.object({
  __typename: z.literal('Organization').default('Organization'),
  id: z.string(),
  ownerId: z.string(),
})

export type Organization = z.infer<typeof organizationSchema>
