
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

Copiar o arquivo com os dados de conexão e demais variáveis ambiente
```bash
cp .env.example .env
```

Criar as tabelas do banco de dados (em desenvolvimento)
```bash
npx prisma migrate dev
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
npx prisma studio
```

Criar as tabelas do banco de dados (em produção)
```bash
npx prisma migrate deploy
```



