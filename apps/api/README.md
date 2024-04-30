
## Executando o projeto

### Back-end

Realizar o clone da aplicação

```bash
git clone https://github.com/RenanFachin/RS_FS_SaaS-rbac-next.git
```

Acessar a pasta da api (apps/api)

Instalar dependências
```bash
npm i
```

Subir o serviço do PostgreSQL via docker
```bash
docker compose up -d
```

Criar as tabelas do banco de dados (em desenvolvimento)
```bash
npm run db:migrate
```

Populando o banco de dados
```bash
npm prisma db seed
```

Execute o projeto
```bash
npm run dev
```

Visualizando a DOCUMENTAÇÃO do projeto
http://localhost:3333/docs/


![Documentação com Swagger](/.github/documentacaosaas.PNG)

Visualizando o banco de dados
```bash
npm run db:studio
```

Criar as tabelas do banco de dados (em produção)
```bash
npx prisma migrate deploy
```



