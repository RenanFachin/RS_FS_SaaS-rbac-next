import { compare } from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function authenticatedWithPassword(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions/password',
    {
      schema: {
        tags: ['auth'],
        summary: 'Authenticate with e-mail & password',
        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const userFromEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!userFromEmail) {
        return reply.status(400).send({
          message: 'Invalid credentials',
        })
      }

      // Esta condição quer dizer que o usuário se autentica utilizando o github
      if (userFromEmail.passwordHash === null) {
        return reply.status(400).send({
          message:
            'User does not have a password, use social login to authenticate',
        })
      }

      // Validando a senha passada com a senha criptografada
      const isPasswordValid = await compare(
        password,
        userFromEmail.passwordHash,
      )

      if (!isPasswordValid) {
        return reply.status(400).send({
          message: 'Invalid credentials',
        })
      }

      // TOKEN JWT
      // Dados contidos no jwt: { id do usuário }

      const token = await reply.jwtSign(
        {
          sub: userFromEmail.id
        },
        {
          sign: {
            expiresIn: '2d',
          },
        },
      )

      return reply.status(201).send({
        token,
      })
    },
  )
}
