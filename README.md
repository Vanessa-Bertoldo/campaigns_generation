# 🚀 Como Rodar o Projeto – Campanhas API

Este projeto é uma API RESTful construída com NestJS e TypeORM para gerenciar campanhas com criação, atualização, listagem, filtros e exclusão lógica.

---

## ✅ Requisitos

- Docker e Docker Compose (recomendado)
- Node.js 18+ (apenas se for rodar manualmente)
- Yarn ou NPM

---

## 📦 Instalação via Docker (mais simples e recomendada)

1. Clone o repositório:
```bash
gh repo clone Vanessa-Bertoldo/campaigns_generation
cd campaigns_generation
```

2. Suba a aplicação:
```bash
docker-compose up --build
```

> Isso iniciará:
> - 🐘 PostgreSQL (com os dados de acesso do `.env.local`)
> - 🚀 Backend NestJS rodando em `http://localhost:3000`

---

## 💡 Observação
O arquivo `.env.local` **já está presente no repositório**, portanto **você não precisa criar ou configurar variáveis de ambiente manualmente.**

---

## 🧶 Instalação manual (opcional)

1. Vá para a pasta `backend`:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Rode o projeto:
```bash
npm run build
npm run start
```

ou em modo dev:
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

Antes de rodar os testes, instale os pacotes necessários:
```bash
npm install --save-dev jest ts-jest @types/jest
```

> Esses pacotes são responsáveis por habilitar o Jest com suporte ao TypeScript.
> Eles são instalados apenas em ambientes de desenvolvimento (não no Docker por padrão).

Depois, rode:
```bash
npm run test
```

Resultado esperado:

<p align="center">
  <img src="https://github.com/Vanessa-Bertoldo/campaigns_generation/blob/main/backend/assets/tests.png" />
</p>

---

## 📚 Documentação da API

A documentação completa e detalhada está disponível no Notion:

🔗 [Acessar documentação no Notion](https://www.notion.so/Documenta-o-da-API-M-dulo-de-Campanhas-1f77d6b7d615807687d3d20aac9bffb0?pvs=4)

---

## 🕒 Cron Job automático

A aplicação executa automaticamente um job todo dia à meia-noite (00:00) que marca campanhas como expiradas se `dataFim < hoje`.

---

Para dúvidas ou contribuições, 🔗 [entre em contato](https://github.com/Vanessa-Bertoldo)
