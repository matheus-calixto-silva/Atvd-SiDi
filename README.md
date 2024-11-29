```markdown
# Sidi

Sidi é um projeto frontend baseado em React, Vite e JSON Server para simulação de um backend em tempo real. O objetivo principal deste projeto é fornecer uma estrutura básica para aplicações React com integração de API fictícia para desenvolvimento e testes.

## Tecnologias Utilizadas

- **React**: Biblioteca para construção da interface de usuário.
- **Vite**: Ferramenta de build rápida e moderna para projetos front-end.
- **JSON Server**: Servidor REST API falso para simulação de backend.

## Como Rodar o Projeto

### 1. Instalar Dependências

Para começar a trabalhar no projeto, primeiro instale as dependências:

```bash
npm install
```

### 2. Rodar o Projeto em ambiente de Desenvolvimento

O servidor de desenvolvimento roda o projeto com Vite e habilita hot reloading.

```bash
npm run dev
```

Após rodar o comando acima, o Vite iniciará o servidor de desenvolvimento. O aplicativo estará disponível em `http://localhost:5173`.

### 3. Rodar o Servidor Fake API com JSON Server

O JSON Server cria uma API simulada a partir do arquivo `db.json`. Para rodar o servidor:

```bash
npm run server
```

Esse comando irá iniciar um servidor local em `http://localhost:3000/usuarios`, onde você pode fazer requisições à API simulada. O arquivo `db.json` contém dados de exemplo para você trabalhar, e o servidor simula as rotas RESTful como GET, POST, PUT e DELETE.

## Como Contribuir

1. Faça um fork do repositório.
2. Crie uma branch para a sua feature (`git checkout -b feature/nova-feature`).
3. Faça as alterações necessárias e adicione testes, se possível.
4. Envie um pull request para a branch `main`.

## Licença

Este projeto é de código aberto, e você pode usá-lo e modificá-lo conforme necessário. Para mais detalhes, consulte a [Licença MIT](LICENSE).

---

Para mais informações sobre o **React**, **Vite**, ou **JSON Server**, consulte as documentações oficiais:
