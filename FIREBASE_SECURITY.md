# 🛡️ Configuração de Segurança Firebase - Plano Gratuito

## ⚙️ Configurações necessárias no Console Firebase

### 1. **Budget Alerts (Alertas de Orçamento)**

No Console Firebase → Project Settings → Usage and billing:

```
Budget Alert 1: $0.50 (50% do limite gratuito)
Budget Alert 2: $0.75 (75% do limite gratuito)  
Budget Alert 3: $0.90 (90% do limite gratuito)
Budget Alert 4: $1.00 (100% - desabilitar projeto)
```

### 2. **Quotas do Firestore (Limites diários)**

```
Reads per day: 50,000 (gratuito)
Writes per day: 20,000 (gratuito)
Deletes per day: 20,000 (gratuito)
```

### 3. **Authentication Limits**

```
Monthly active users: 50,000 (gratuito)
Phone auth: 10,000/month (gratuito)
```

### 4. **Storage Limits**

```
Firestore Storage: 1 GB (gratuito)
Cloud Storage: 5 GB (gratuito)
```

## 🔧 Implementações de Segurança no Código

### ✅ **Rate Limiting**
- Máximo 5 consultas por hora para listas públicas
- Cache de 10 minutos para reduzir consultas
- Debouncing em searches e inputs

### ✅ **Query Optimization**
- Limite de 20 usuários por consulta
- OrderBy com limit para performance
- Índices otimizados no Firestore

### ✅ **Firestore Rules**
- Validação de tamanho de documento (máx 1MB)
- Máximo 50 presentes por usuário
- Validação de tipos de dados
- Rate limiting por IP

### ✅ **Frontend Protection**
- Cache local para reduzir consultas
- Throttling de requisições
- Error boundaries

## 📊 Monitoramento

### Firebase Console → Usage:
1. **Firestore**: Reads/Writes/Deletes
2. **Authentication**: Monthly active users
3. **Storage**: Data usage
4. **Hosting**: Bandwidth

### Alertas configurados:
- Email quando atingir 50% do limite
- Notificação push aos 75%
- Bloqueio automático aos 100%

## 🚨 Ações Automáticas de Proteção

### Se limite for atingido:
1. **Desabilitar writes** temporariamente
2. **Ativar modo read-only**
3. **Mostrar banner de manutenção**
4. **Logs de auditoria**

### Emergency Actions:
```javascript
// Desabilitar todas as operações de escrita
const EMERGENCY_MODE = process.env.VITE_EMERGENCY_MODE === 'true';

if (EMERGENCY_MODE) {
  throw new Error('Sistema em manutenção. Tente novamente mais tarde.');
}
```

## 📋 Checklist de Configuração

- [ ] Configurar Budget Alerts no Firebase Console
- [ ] Aplicar Firestore Rules atualizadas
- [ ] Configurar índices compostos necessários
- [ ] Testar rate limiting
- [ ] Configurar monitoring/alertas
- [ ] Documentar limites para a equipe

## 🎯 Resultado Esperado

Com essas configurações:
- **Custo máximo**: $0 (permanece no plano gratuito)
- **Performance**: Otimizada com cache e limits
- **Segurança**: Protegida contra abuso
- **Monitoramento**: Alertas proativos
