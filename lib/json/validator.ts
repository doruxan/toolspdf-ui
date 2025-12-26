import Ajv, { ErrorObject } from 'ajv';

export interface ValidationResult {
  isValid: boolean;
  errors?: ValidationError[];
}

export interface ValidationError {
  path: string;
  message: string;
  keyword?: string;
  params?: Record<string, any>;
}

export function validateJsonSchema(data: any, schema: any): ValidationResult {
  try {
    const ajv = new Ajv({ allErrors: true, verbose: true });
    
    const validate = ajv.compile(schema);
    const isValid = validate(data);

    if (!isValid && validate.errors) {
      const errors = validate.errors.map(formatError);
      return {
        isValid: false,
        errors,
      };
    }

    return {
      isValid: true,
    };
  } catch (error) {
    return {
      isValid: false,
      errors: [
        {
          path: '',
          message: error instanceof Error ? error.message : 'Schema validation failed',
        },
      ],
    };
  }
}

function formatError(error: ErrorObject): ValidationError {
  let message = error.message || 'Validation failed';
  let path = error.instancePath || '/';

  // Format specific error types for better readability
  switch (error.keyword) {
    case 'required':
      message = `Missing required property: ${error.params.missingProperty}`;
      break;
    case 'type':
      message = `Invalid type. Expected ${error.params.type}, got ${typeof error.data}`;
      break;
    case 'enum':
      message = `Value must be one of: ${error.params.allowedValues.join(', ')}`;
      break;
    case 'minimum':
      message = `Value must be >= ${error.params.limit}`;
      break;
    case 'maximum':
      message = `Value must be <= ${error.params.limit}`;
      break;
    case 'minLength':
      message = `String must be at least ${error.params.limit} characters`;
      break;
    case 'maxLength':
      message = `String must be at most ${error.params.limit} characters`;
      break;
    case 'pattern':
      message = `String must match pattern: ${error.params.pattern}`;
      break;
    case 'format':
      message = `Invalid ${error.params.format} format`;
      break;
    case 'additionalProperties':
      message = `Additional property not allowed: ${error.params.additionalProperty}`;
      break;
  }

  return {
    path,
    message,
    keyword: error.keyword,
    params: error.params,
  };
}

export const commonSchemas = {
  string: {
    type: 'object',
    properties: {
      value: { type: 'string' },
    },
    required: ['value'],
  },
  number: {
    type: 'object',
    properties: {
      value: { type: 'number' },
    },
    required: ['value'],
  },
  email: {
    type: 'object',
    properties: {
      email: { type: 'string', format: 'email' },
    },
    required: ['email'],
  },
  url: {
    type: 'object',
    properties: {
      url: { type: 'string', format: 'uri' },
    },
    required: ['url'],
  },
  date: {
    type: 'object',
    properties: {
      date: { type: 'string', format: 'date' },
    },
    required: ['date'],
  },
  dateTime: {
    type: 'object',
    properties: {
      dateTime: { type: 'string', format: 'date-time' },
    },
    required: ['dateTime'],
  },
};

export function generateSchemaFromJson(data: any): any {
  if (data === null) {
    return { type: 'null' };
  }

  if (Array.isArray(data)) {
    if (data.length === 0) {
      return { type: 'array', items: {} };
    }
    return {
      type: 'array',
      items: generateSchemaFromJson(data[0]),
    };
  }

  if (typeof data === 'object') {
    const properties: Record<string, any> = {};
    const required: string[] = [];

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        properties[key] = generateSchemaFromJson(data[key]);
        required.push(key);
      }
    }

    return {
      type: 'object',
      properties,
      required,
    };
  }

  if (typeof data === 'string') {
    return { type: 'string' };
  }

  if (typeof data === 'number') {
    return { type: 'number' };
  }

  if (typeof data === 'boolean') {
    return { type: 'boolean' };
  }

  return {};
}

