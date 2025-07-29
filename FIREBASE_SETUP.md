# 🔥 Configuração do Firebase

Este documento explica como configurar o Firebase para o projeto de Lista de Presentes.

## 📋 Pré-requisitos

1. Conta Google
2. Acesso ao [Firebase Console](https://console.firebase.google.com)

## 🚀 Configuração Inicial

### 1. Criar Projeto Firebase

1. Acesse o [Firebase Console](https://console.firebase.google.com)
2. Clique em "Criar um projeto"
3. Digite o nome: `lista-de-presentes-projeto` (ou outro de sua escolha)
4. Desabilite Google Analytics (opcional para este projeto)
5. Clique em "Criar projeto"

### 2. Configurar Authentication

1. No painel do Firebase, vá em **Authentication**
2. Clique em "Vamos começar"
3. Na aba **Sign-in method**:
   - Clique em **E-mail/senha**
   - Ative a primeira opção (E-mail/senha)
   - Clique em "Salvar"

### 3. Configurar Firestore Database

1. No painel do Firebase, vá em **Firestore Database**
2. Clique em "Criar banco de dados"
3. Escolha **Modo de teste** (para desenvolvimento)
4. Selecione uma localização (recomendado: `southamerica-east1`)
5. Clique em "Concluído"

### 4. Configurar Regras de Segurança do Firestore

Na aba **Regras** do Firestore, substitua o conteúdo por:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuários podem ler e escrever apenas seus próprios dados
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Usernames são públicos para leitura, mas só o próprio usuário pode criar/editar
    match /usernames/{username} {
      allow read: if true;
      allow write: if request.auth != null && 
        (resource == null || request.auth.uid == resource.data.uid);
    }
    
    // Perfis públicos são legíveis por todos, mas só editáveis pelo próprio usuário
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 5. Configurar Web App

1. No painel principal do Firebase, clique no ícone **Web** (</>)
2. Digite o nome do app: `lista-de-presentes-web`
3. **NÃO** marque "Configurar Firebase Hosting"
4. Clique em "Registrar app"
5. **IMPORTANTE**: Copie as configurações mostradas na tela

### 6. Configurar Variáveis de Ambiente

1. No seu projeto, copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

2. Edite o arquivo `.env` com as configurações copiadas do Firebase:
```env
VITE_FIREBASE_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_FIREBASE_AUTH_DOMAIN=lista-de-presentes-projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=lista-de-presentes-projeto
VITE_FIREBASE_STORAGE_BUCKET=lista-de-presentes-projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890abcdef
```

## 🔧 Configuração Opcional: Firebase CLI

Para gerenciar o projeto via linha de comando:

### 1. Instalar Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Fazer Login
```bash
firebase login
```

### 3. Inicializar Projeto (opcional)
```bash
firebase init
```

Selecione:
- ☑️ Firestore
- ☑️ Hosting

## 🛠️ Estrutura de Dados

O sistema criará automaticamente as seguintes collections:

### Collection: `users`
```typescript
{
  uid: string;           // ID único do usuário
  username: string;      // Nome de usuário único
  displayName: string;   // Nome de exibição
  email: string;         // E-mail do usuário
  bio?: string;          // Biografia (opcional)
  profileImage?: string; // URL da imagem de perfil (opcional)
  gifts: Gift[];         // Array de presentes
  createdAt: Date;       // Data de criação
  updatedAt: Date;       // Data da última atualização
}
```

### Collection: `usernames`
```typescript
{
  [username]: {
    uid: string;         // Referência ao UID do usuário
  }
}
```

## 🔒 Considerações de Segurança

1. **Nunca** commite o arquivo `.env` no Git
2. Para produção, configure as regras de segurança mais restritivas
3. Monitore o uso através do Firebase Console
4. Configure alertas de cota se necessário

## 🌐 Deploy (Opcional)

Se quiser usar Firebase Hosting em vez do GitHub Pages:

1. Execute: `firebase deploy --only hosting`
2. Sua aplicação estará disponível em: `https://lista-de-presentes-projeto.web.app`

## ❓ Solução de Problemas

### Erro: "Missing or insufficient permissions"
- Verifique se as regras de segurança do Firestore estão configuradas corretamente
- Certifique-se de que o usuário está autenticado

### Erro: "Firebase configuration"
- Verifique se todas as variáveis de ambiente estão configuradas no arquivo `.env`
- Certifique-se de que os valores estão corretos (sem espaços extras)

### Erro: "Username already exists"
- Este é um comportamento esperado - usernames devem ser únicos
- Tente com um username diferente

## 📞 Suporte

Para mais informações, consulte a [documentação oficial do Firebase](https://firebase.google.com/docs).

---

🔥 **Dica**: Mantenha sempre o Firebase Console aberto para monitorar a autenticação e o banco de dados durante o desenvolvimento!
