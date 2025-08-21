import React from 'react';

interface CharacterCounterProps {
  current: number;
  max: number;
  warningThreshold?: number;
  className?: string;
}

export const CharacterCounter: React.FC<CharacterCounterProps> = ({
  current,
  max,
  warningThreshold = 0.85, // 85% do limite
  className = ""
}) => {
  const warningLimit = Math.floor(max * warningThreshold);
  
  const getColorClass = () => {
    if (current >= max) {
      return 'text-danger';
    } else if (current >= warningLimit) {
      return 'text-warning';
    } else {
      return 'text-default-400';
    }
  };

  return (
    <span className={`text-xs font-mono ${getColorClass()} ${className}`}>
      {current}/{max}
    </span>
  );
};

interface InputWithCounterProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
  required?: boolean;
  type?: string;
  description?: string;
  warningThreshold?: number;
  pattern?: string;
  patternErrorMessage?: string;
}

export const InputWithCounter: React.FC<InputWithCounterProps> = ({
  placeholder,
  value,
  onChange,
  maxLength,
  required = false,
  type = "text",
  description,
  warningThreshold = 0.85,
  pattern,
  patternErrorMessage
}) => {
  const warningLimit = Math.floor(maxLength * warningThreshold);
  const [patternError, setPatternError] = React.useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.slice(0, maxLength);
    
    // Validar padrão se fornecido
    if (pattern && newValue && !new RegExp(pattern).test(newValue)) {
      setPatternError(patternErrorMessage || "Formato inválido");
    } else {
      setPatternError("");
    }
    
    onChange(newValue);
  };

  const getColor = () => {
    if (value.length >= maxLength) return "danger";
    if (value.length >= warningLimit) return "warning";
    return "default";
  };

  return (
    <div className="space-y-1">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required={required}
        maxLength={maxLength}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
          getColor() === "danger" 
            ? "border-red-500 focus:ring-red-200" 
            : getColor() === "warning"
            ? "border-yellow-500 focus:ring-yellow-200"
            : "border-gray-300 focus:ring-blue-200"
        }`}
      />
      
      <div className="flex justify-between items-center text-xs">
        <div className="flex flex-col">
          {description && (
            <span className="text-default-500">{description}</span>
          )}
          {patternError && (
            <span className="text-danger">{patternError}</span>
          )}
        </div>
        
        <CharacterCounter
          current={value.length}
          max={maxLength}
          warningThreshold={warningThreshold}
        />
      </div>
    </div>
  );
};

// Regras de validação para diferentes tipos de campos
export const validationRules = {
  username: {
    maxLength: 75,
    minLength: 3,
    pattern: '^[a-z0-9_-]+$',
    patternErrorMessage: 'Apenas letras minúsculas, números, hífens e underscores'
  },
  email: {
    maxLength: 250,
    minLength: 5,
    pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
    patternErrorMessage: 'Formato de email inválido'
  },
  displayName: {
    maxLength: 100,
    minLength: 2,
    pattern: '^[\\w\\s\\-\\.]+$',
    patternErrorMessage: 'Apenas letras, números, espaços, hífens e pontos'
  },
  password: {
    maxLength: 128,
    minLength: 6
  }
};

export default CharacterCounter;
