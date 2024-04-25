import { z } from 'zod'

// Não colocar todas as colunas que a entidade possui, apenas as informações que são importantes para a parte de permissões da aplicação
export const projectSchema = z.object({
  __typename: z.literal('Project').default('Project'),
  id: z.string(),
  ownerId: z.string(),
})

export type Project = z.infer<typeof projectSchema>
