# campaigns_generation
# 🚀 Como Rodar o Projeto – Campanhas API

Este projeto é uma API RESTful construída com NestJS e TypeORM para gerenciar campanhas com criação, atualização, listagem, filtros e exclusão lógica.

---

## ✅ Requisitos

- Node.js 18+
- PostgreSQL
- Yarn ou NPM

---

## 📦 Instalação

1. Clone o repositório:
```bash
gh repo clone Vanessa-Bertoldo/campaigns_generation
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o arquivo `.env` na raiz do projeto:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=campanha
```

4. Rode o banco (se for local) rode o projeto (as migrations serão aplicadas automaticamente):
```bash
npm run build --caso prefira rodar as migrations manualmente
npm run start
```
ou para dev:
```bash
npm run start:dev
```

---

## 🧪 Testes com Postman

O arquivo de collection do Postman está localizado em:

```
/assets/app campaings.postman_collection.json
```

### Como importar:
1. Abra o Postman
2. Vá em `Import`
3. Selecione o arquivo acima
4. Execute os endpoints de forma agrupada por CRUD

---

## 🧪 Testes Unitários

Rode o comando abaixo para executar os testes:
```bash
npm run test
```

Resultado esperado: 

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://github.com/Vanessa-Bertoldo/campaigns_generation/blob/main/backend/assets/tests.png" /></a>
</p>

---

## 📚 Documentação da API

A documentação completa e detalhada está disponível no Notion:

🔗 [Acessar documentação no Notion](https://www.notion.so/Documenta-o-da-API-M-dulo-de-Campanhas-1f77d6b7d615807687d3d20aac9bffb0?pvs=4)

---

## 🕒 Cron Job automático

A aplicação executa automaticamente um job todo dia à meia-noite (00:00) que marca campanhas como expiradas se `dataFim < hoje`.

---

Para dúvidas ou contribuições, entre em contato com o time de desenvolvimento.
