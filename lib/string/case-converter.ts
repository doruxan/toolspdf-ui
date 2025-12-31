export type CaseType = 
  | 'lowercase' 
  | 'uppercase' 
  | 'titlecase' 
  | 'sentencecase'
  | 'camelcase' 
  | 'pascalcase' 
  | 'snakecase' 
  | 'kebabcase'
  | 'constantcase'
  | 'dotcase'
  | 'pathcase'
  | 'traincase';

export function toLowerCase(text: string): string {
  return text.toLowerCase();
}

export function toUpperCase(text: string): string {
  return text.toUpperCase();
}

export function toTitleCase(text: string): string {
  return text.replace(/\w\S*/g, (word) => {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
  });
}

export function toSentenceCase(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function toCamelCase(text: string): string {
  return text
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
      return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
    })
    .replace(/\s+/g, '')
    .replace(/[^a-zA-Z0-9]/g, '');
}

export function toPascalCase(text: string): string {
  return text
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter) => {
      return letter.toUpperCase();
    })
    .replace(/\s+/g, '')
    .replace(/[^a-zA-Z0-9]/g, '');
}

export function toSnakeCase(text: string): string {
  return text
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join('_');
}

export function toKebabCase(text: string): string {
  return text
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join('-');
}

export function toConstantCase(text: string): string {
  return text
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toUpperCase())
    .join('_');
}

export function toDotCase(text: string): string {
  return text
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join('.');
}

export function toPathCase(text: string): string {
  return text
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join('/');
}

export function toTrainCase(text: string): string {
  return text
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('-');
}

export function convertCase(text: string, caseType: CaseType): string {
  switch (caseType) {
    case 'lowercase':
      return toLowerCase(text);
    case 'uppercase':
      return toUpperCase(text);
    case 'titlecase':
      return toTitleCase(text);
    case 'sentencecase':
      return toSentenceCase(text);
    case 'camelcase':
      return toCamelCase(text);
    case 'pascalcase':
      return toPascalCase(text);
    case 'snakecase':
      return toSnakeCase(text);
    case 'kebabcase':
      return toKebabCase(text);
    case 'constantcase':
      return toConstantCase(text);
    case 'dotcase':
      return toDotCase(text);
    case 'pathcase':
      return toPathCase(text);
    case 'traincase':
      return toTrainCase(text);
    default:
      return text;
  }
}

