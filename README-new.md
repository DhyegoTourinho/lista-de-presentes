# 🎁 Sistema de Listas de Presentes

Um sistema moderno e responsivo para criar e gerenciar listas de presentes personalizadas, construído com React, Vite, NextUI e Firebase.

## ✨ Funcionalidades

- **🔐 Autenticação Segura**: Sistema de login e registro com Firebase Authentication
- **👤 Perfis Personalizados**: Cada usuário tem sua própria URL pública (`/gift/username`)
- **🎁 Gerenciamento de Presentes**: Interface intuitiva para adicionar, editar e remover presentes
- **🔗 Compartilhamento Fácil**: URLs únicas para compartilhar listas publicamente
- **📱 Design Responsivo**: Interface otimizada para desktop e mobile
- **⚡ Performance**: Construído com Vite para desenvolvimento rápido
- **🎨 UI Moderna**: Componentes NextUI com suporte a tema escuro/claro

## 🚀 Estrutura de Rotas

- `/` - Página inicial (landing page ou dashboard do usuário)
- `/login` - Tela de login e registro
- `/admin/:username` - Painel administrativo (rota protegida)
- `/gift/:username` - Perfil público de qualquer usuário

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18, TypeScript, Vite
- **UI**: NextUI, Tailwind CSS, Framer Motion
- **Roteamento**: React Router DOM v6 (HashRouter para GitHub Pages)
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Deploy**: GitHub Pages com gh-pages

## 📦 Configuração do Projeto

### Pré-requisitos

- Node.js 16+ 
- npm ou yarn
- Conta no Firebase

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/DhyegoTourinho/lista-de-presentes.git
cd lista-de-presentes
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o Firebase:
   - Crie um projeto no [Firebase Console](https://console.firebase.google.com)
   - Ative Authentication (Email/Password)
   - Ative Firestore Database
   - Copie as configurações do projeto

4. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações do Firebase:
```env
VITE_FIREBASE_API_KEY=sua_api_key
VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_projeto_id
VITE_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
```

5. Execute o projeto em desenvolvimento:
```bash
npm run dev
```

### Deploy

Para fazer deploy no GitHub Pages:

```bash
npm run deploy
```

## 🗄️ Estrutura do Banco de Dados (Firestore)

### Collection: `users`
```typescript
{
  uid: string;
  username: string;
  displayName: string;
  email: string;
  bio?: string;
  profileImage?: string;
  gifts: Gift[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Collection: `usernames`
```typescript
{
  [username]: {
    uid: string;
  }
}
```

### Subcollection: `gifts`
```typescript
{
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  link?: string;
  isPurchased?: boolean;
  purchasedBy?: string;
  purchasedAt?: Date;
}
```

## 🔒 Segurança

- Autenticação obrigatória para rotas administrativas
- Usuários só podem editar seus próprios dados
- Validação de username único
- Regras de segurança do Firestore implementadas

## 🎨 Customização

O projeto usa NextUI e Tailwind CSS, permitindo fácil customização de:
- Cores e temas
- Componentes
- Layout responsivo
- Animações

## 📝 Scripts Disponíveis

- `npm run dev` - Executa em modo desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza build localmente
- `npm run deploy` - Deploy para GitHub Pages

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Desenvolvido por

[Dhyego Tourinho](https://github.com/DhyegoTourinho)

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!
