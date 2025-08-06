import { useState, useCallback } from 'react';
import { RateLimiter, QueryCache } from '@/utils/rateLimiting';

interface SafeOperationOptions {
  rateLimitKey: string;
  maxRequests?: number;
  windowMs?: number;
  cacheKey?: string;
  cacheTtl?: number;
}

interface SafeOperationResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: () => Promise<void>;
  refetch: () => Promise<void>;
}

/**
 * Hook para operações seguras com rate limiting e cache
 */
export function useSafeFirestoreOperation<T>(
  operation: () => Promise<T>,
  options: SafeOperationOptions
): SafeOperationResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    rateLimitKey,
    maxRequests = 10,
    windowMs = 60000,
    cacheKey,
    cacheTtl = 300000
  } = options;

  const execute = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Rate limiting
      if (!RateLimiter.canMakeRequest(rateLimitKey, maxRequests, windowMs)) {
        throw new Error(`Muitas requisições para ${rateLimitKey}. Tente novamente em ${Math.ceil(windowMs / 60000)} minuto(s).`);
      }

      // Cache check
      if (cacheKey) {
        const cachedData = QueryCache.get(cacheKey);
        if (cachedData) {
          setData(cachedData);
          setLoading(false);
          return;
        }
      }

      // Execute operation
      const result = await operation();

      // Cache result
      if (cacheKey) {
        QueryCache.set(cacheKey, result, cacheTtl);
      }

      setData(result);
    } catch (err: any) {
      console.error(`Erro em ${rateLimitKey}:`, err);
      setError(err.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, [operation, rateLimitKey, maxRequests, windowMs, cacheKey, cacheTtl]);

  const refetch = useCallback(async () => {
    // Clear cache and re-execute
    if (cacheKey) {
      QueryCache.clear();
    }
    await execute();
  }, [execute, cacheKey]);

  return {
    data,
    loading,
    error,
    execute,
    refetch
  };
}

// Exemplo de uso:
/*
const PublicListsComponent = () => {
  const { data: publicLists, loading, error, execute } = useSafeFirestoreOperation(
    async () => {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, limit(20));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    {
      rateLimitKey: 'load_public_lists',
      maxRequests: 5,
      windowMs: 3600000, // 1 hora
      cacheKey: 'public_lists',
      cacheTtl: 600000 // 10 minutos
    }
  );

  useEffect(() => {
    execute();
  }, [execute]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  
  return (
    <div>
      {publicLists?.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};
*/
