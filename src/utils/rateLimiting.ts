// Rate limiting utilities para prevenir uso excessivo
class RateLimiter {
  private static requests: Map<string, number[]> = new Map();
  
  static canMakeRequest(key: string, maxRequests: number = 10, windowMs: number = 60000): boolean {
    const now = Date.now();
    const requests = this.requests.get(key) || [];
    
    // Remove requests antigas (fora da janela de tempo)
    const recentRequests = requests.filter(time => now - time < windowMs);
    
    if (recentRequests.length >= maxRequests) {
      return false;
    }
    
    recentRequests.push(now);
    this.requests.set(key, recentRequests);
    return true;
  }
  
  static getKey(operation: string): string {
    // Usar IP seria ideal, mas usaremos operação + timestamp para simplicidade
    return `${operation}_${new Date().getHours()}`;
  }
}

// Cache para reduzir consultas desnecessárias
class QueryCache {
  private static cache: Map<string, { data: any; expiry: number }> = new Map();
  
  static get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item || Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    return item.data;
  }
  
  static set(key: string, data: any, ttlMs: number = 300000): void { // 5 minutos padrão
    this.cache.set(key, {
      data,
      expiry: Date.now() + ttlMs
    });
  }
  
  static clear(): void {
    this.cache.clear();
  }
}

// Debouncer para evitar múltiplas chamadas
class Debouncer {
  private static timers: Map<string, NodeJS.Timeout> = new Map();
  
  static debounce<T extends (...args: any[]) => any>(
    key: string,
    func: T,
    delay: number = 500
  ): (...args: Parameters<T>) => void {
    return (...args: Parameters<T>) => {
      const existingTimer = this.timers.get(key);
      if (existingTimer) {
        clearTimeout(existingTimer);
      }
      
      const timer = setTimeout(() => {
        func(...args);
        this.timers.delete(key);
      }, delay);
      
      this.timers.set(key, timer);
    };
  }
}

export { RateLimiter, QueryCache, Debouncer };

// Exemplo de uso:
/*
// Rate limiting
if (!RateLimiter.canMakeRequest('load_public_lists', 5, 60000)) {
  throw new Error('Muitas requisições. Tente novamente em 1 minuto.');
}

// Cache
const cacheKey = 'public_lists';
let data = QueryCache.get(cacheKey);
if (!data) {
  data = await fetchFromFirestore();
  QueryCache.set(cacheKey, data, 300000); // Cache por 5 minutos
}

// Debounce
const debouncedSearch = Debouncer.debounce('search', performSearch, 300);
*/
