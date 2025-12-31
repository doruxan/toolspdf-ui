export interface Tool {
  title: string;
  href: string;
  icon: string;
  description: string;
  category: string;
  color?: string;
  featured?: boolean;
}

export interface ToolCategory {
  id: string;
  name: string;
  description: string;
  seoKeywords: string;
  tools: Tool[];
  faqs?: { question: string; answer: string }[];
}

export const toolCategories: ToolCategory[] = [
  {
    id: 'pdf-tools',
    name: 'PDF Tools',
    description: 'Process PDFs directly in your browser - merge, split, compress, and convert. 100% free, no limits.',
    seoKeywords: 'pdf tools, merge pdf, split pdf, compress pdf, pdf to jpg, jpg to pdf, free pdf tools online',
    faqs: [
      {
        question: 'Are these PDF tools really free?',
        answer: 'Yes, all our PDF tools are 100% free to use with no limits on file size or usage.'
      },
      {
        question: 'Is it safe to process confidential documents?',
        answer: 'Absolutely. All processing happens locally in your browser. Your files never leave your device and are never uploaded to our servers.'
      },
      {
        question: 'Do I need to install any software?',
        answer: 'No, RawTools works entirely in your web browser. You can use it on Windows, Mac, Linux, or mobile devices without installing anything.'
      },
      {
        question: 'How many files can I merge at once?',
        answer: 'There is no hard limit on the number of files you can merge. Since processing happens on your device, it depends on your computer\'s memory.'
      }
    ],
    tools: [
      {
        title: 'Merge PDF',
        href: '/merge-pdf',
        icon: 'Layers',
        description: 'Combine multiple PDF files into one document',
        category: 'pdf-tools',
        color: 'tool-merge',
        featured: true,
      },
      {
        title: 'Split PDF',
        href: '/split-pdf',
        icon: 'Scissors',
        description: 'Extract pages or split into separate documents',
        category: 'pdf-tools',
        color: 'tool-split',
        featured: true,
      },
      {
        title: 'Compress PDF',
        href: '/compress-pdf',
        icon: 'Minimize2',
        description: 'Reduce PDF file size without losing quality',
        category: 'pdf-tools',
        color: 'tool-compress',
        featured: true,
      },
      {
        title: 'PDF to JPG',
        href: '/pdf-to-jpg',
        icon: 'ImageIcon',
        description: 'Convert PDF pages to JPG images',
        category: 'pdf-tools',
        color: 'tool-convert',
        featured: true,
      },
      {
        title: 'JPG to PDF',
        href: '/jpg-to-pdf',
        icon: 'FileImage',
        description: 'Convert images to PDF document',
        category: 'pdf-tools',
        color: 'tool-convert',
        featured: true,
      },
      {
        title: 'Rotate PDF',
        href: '/rotate-pdf',
        icon: 'RotateCw',
        description: 'Rotate pages in your PDF document',
        category: 'pdf-tools',
        color: 'tool-rotate',
      },
      {
        title: 'Unlock PDF',
        href: '/unlock-pdf',
        icon: 'Unlock',
        description: 'Remove password protection from PDF',
        category: 'pdf-tools',
        color: 'tool-unlock',
        featured: true,
      },
      {
        title: 'Protect PDF',
        href: '/protect-pdf',
        icon: 'Lock',
        description: 'Add password protection to your PDF',
        category: 'pdf-tools',
        color: 'tool-protect',
      },
      {
        title: 'Watermark PDF',
        href: '/watermark-pdf',
        icon: 'Droplet',
        description: 'Add text or image watermark to PDF',
        category: 'pdf-tools',
        color: 'tool-watermark',
      },
      {
        title: 'Remove Pages',
        href: '/remove-pages',
        icon: 'Trash2',
        description: 'Delete specific pages from your PDF',
        category: 'pdf-tools',
        color: 'tool-remove',
      },
      {
        title: 'Extract Pages',
        href: '/extract-pages',
        icon: 'FileCheck',
        description: 'Extract specific pages into a new PDF',
        category: 'pdf-tools',
        color: 'tool-extract',
      },
      {
        title: 'Add Page Numbers',
        href: '/add-page-numbers',
        icon: 'Hash',
        description: 'Add page numbers to your PDF document',
        category: 'pdf-tools',
        color: 'tool-number',
      },
      {
        title: 'Organize PDF',
        href: '/organize-pdf',
        icon: 'ArrowUpDown',
        description: 'Reorder and rearrange PDF pages',
        category: 'pdf-tools',
        color: 'tool-organize',
      },
      {
        title: 'HTML to PDF',
        href: '/html-to-pdf',
        icon: 'FileCode',
        description: 'Convert HTML or text to PDF document',
        category: 'pdf-tools',
        color: 'tool-html',
      },
      {
        title: 'Crop PDF',
        href: '/crop-pdf',
        icon: 'Crop',
        description: 'Adjust margins and crop PDF pages',
        category: 'pdf-tools',
        color: 'tool-crop',
      },
      {
        title: 'Redact PDF',
        href: '/redact-pdf',
        icon: 'EyeOff',
        description: 'Black out sensitive information in PDF',
        category: 'pdf-tools',
        color: 'tool-redact',
      },
    ],
  },
  {
    id: 'json-tools',
    name: 'JSON Tools',
    description: 'Convert, format, validate, and manipulate JSON data. CSV/Excel converters, beautifier, minifier, mapper, schema validator, and more.',
    seoKeywords: 'json tools, csv to json, excel to json, json formatter, json beautifier, json validator, json mapper, json minifier',
    faqs: [
      {
        question: 'Can I handle large JSON files?',
        answer: 'Yes, since processing is client-side, the limit is your browser memory. We handle files up to several hundred megabytes smoothly.'
      },
      {
        question: 'Is my data private?',
        answer: 'Completely. Your JSON, CSV, or Excel files are processed in your browser memory and never sent to any server.'
      },
      {
        question: 'Do you support minification?',
        answer: 'Yes, our JSON Minifier tool can compress your JSON by removing whitespace, and our Formatter can beautify it back.'
      }
    ],
    tools: [
      {
        title: 'CSV to JSON',
        href: '/csv-to-json',
        icon: 'FileJson',
        description: 'Convert CSV files to JSON format with custom delimiters and headers',
        category: 'json-tools',
        color: 'tool-convert',
        featured: true,
      },
      {
        title: 'Excel to JSON',
        href: '/excel-to-json',
        icon: 'FileSpreadsheet',
        description: 'Convert Excel (.xlsx) files to JSON format with sheet selection',
        category: 'json-tools',
        color: 'tool-convert',
        featured: true,
      },
      {
        title: 'JSON Formatter',
        href: '/json-formatter',
        icon: 'Code2',
        description: 'Format, beautify, and validate JSON with syntax highlighting',
        category: 'json-tools',
        color: 'tool-format',
        featured: true,
      },
      {
        title: 'JSON Minifier',
        href: '/json-minifier',
        icon: 'Minimize2',
        description: 'Remove whitespace and compress JSON to reduce file size',
        category: 'json-tools',
        color: 'tool-compress',
        featured: true,
      },
      {
        title: 'JSON Mapper',
        href: '/json-mapper',
        icon: 'GitBranch',
        description: 'Extract nested properties from JSON with visual tree selector',
        category: 'json-tools',
        color: 'tool-parse',
      },
      {
        title: 'JSON Schema Validator',
        href: '/json-schema-validator',
        icon: 'CheckCircle',
        description: 'Validate JSON data against JSON Schema specifications',
        category: 'json-tools',
        color: 'tool-validate',
      },
      {
        title: 'JSON Diff',
        href: '/json-diff',
        icon: 'GitCompare',
        description: 'Compare two JSON files with side-by-side highlighting',
        category: 'json-tools',
        color: 'tool-compare',
      },
      {
        title: 'JSON Escape/Unescape',
        href: '/json-escape',
        icon: 'Quote',
        description: 'Escape or unescape JSON strings for safe transmission',
        category: 'json-tools',
        color: 'tool-format',
      },
      {
        title: 'JSON Query',
        href: '/json-query',
        icon: 'Search',
        description: 'Query JSON data using JSONPath expressions',
        category: 'json-tools',
        color: 'tool-parse',
      },
    ],
  },
  {
    id: 'iban-tools',
    name: 'IBAN Tools',
    description: 'Validate, generate, and analyze International Bank Account Numbers (IBAN) for 80+ countries. Complete toolkit for banking data.',
    seoKeywords: 'iban validator, iban checker, iban generator, validate iban, iban format, iban parser, batch iban validator',
    faqs: [
      {
        question: 'Is my banking data safe?',
        answer: 'Yes. We do not store or transmit any IBANs you enter. All validation and processing happens locally in your browser.'
      },
      {
        question: 'Which countries are supported?',
        answer: 'We support IBAN validation and generation for all SEPA countries and many others, totaling over 80 countries worldwide.'
      },
      {
        question: 'What is the difference between validation and formatting?',
        answer: 'Validation checks if an IBAN is mathematically correct and follows country rules. Formatting adds spaces for readability without changing the validity.'
      }
    ],
    tools: [
      {
        title: 'IBAN Validator',
        href: '/iban-validator',
        icon: 'CheckCircle',
        description: 'Validate IBANs with real-time verification for 80+ countries',
        category: 'iban-tools',
        color: 'tool-validate',
        featured: true,
      },
      {
        title: 'IBAN Generator',
        href: '/iban-generator',
        icon: 'Sparkles',
        description: 'Generate valid test IBANs for development and testing',
        category: 'iban-tools',
        color: 'tool-generate',
        featured: true,
      },
      {
        title: 'IBAN Parser',
        href: '/iban-parser',
        icon: 'Search',
        description: 'Extract bank code, branch code, and account details from IBANs',
        category: 'iban-tools',
        color: 'tool-parse',
        featured: true,
      },
      {
        title: 'IBAN Formatter',
        href: '/iban-formatter',
        icon: 'AlignLeft',
        description: 'Format IBANs for print or electronic use with batch support',
        category: 'iban-tools',
        color: 'tool-format',
        featured: true,
      },
      {
        title: 'Batch IBAN Validator',
        href: '/batch-iban-validator',
        icon: 'List',
        description: 'Validate up to 1000 IBANs at once with CSV import/export',
        category: 'iban-tools',
        color: 'tool-batch',
      },
      {
        title: 'Check Digit Calculator',
        href: '/iban-check-calculator',
        icon: 'Calculator',
        description: 'Calculate and verify IBAN check digits using MOD-97',
        category: 'iban-tools',
        color: 'tool-calculate',
      },
      {
        title: 'Country Lookup',
        href: '/iban-country-info',
        icon: 'Globe',
        description: 'View IBAN format rules and examples for 80+ countries',
        category: 'iban-tools',
        color: 'tool-info',
      },
    ],
  },
  {
    id: 'ecommerce-tools',
    name: 'Shopify & E-Commerce Tools',
    description: 'Professional calculators and tools for Shopify store operators. Calculate profit, fees, and more.',
    seoKeywords: 'shopify calculator, profit calculator, shopify fees, ltv cac calculator, shopify tools',
    faqs: [
      {
        question: 'Are these calculators updated for current Shopify fees?',
        answer: 'Yes, we regularly update our fee structures to match current Shopify and payment processor rates.'
      },
      {
        question: 'Can I save my calculation results?',
        answer: 'Currently, tools run in your browser session. We recommend taking a screenshot or printing the page to PDF to save your results.'
      },
      {
        question: 'How accurate are the profit calculations?',
        answer: 'Our calculators use standard formulas and official fee structures. However, always verify with your actual financial data for tax or accounting purposes.'
      }
    ],
    tools: [
      {
        title: 'Shopify Profit Calculator',
        href: '/shopify-profit-calculator',
        icon: 'DollarSign',
        description: 'Calculate per-order profit, contribution margin, and break-even revenue',
        category: 'ecommerce-tools',
        featured: true,
      },
      {
        title: 'Shopify Fees Calculator',
        href: '/shopify-fees-calculator',
        icon: 'CreditCard',
        description: 'Estimate processing fees and transaction fees across all Shopify plans',
        category: 'ecommerce-tools',
        featured: true,
      },
      {
        title: 'LTV/CAC Calculator',
        href: '/shopify-ltv-cac-calculator',
        icon: 'TrendingUp',
        description: 'Measure customer lifetime value and acquisition cost ratio',
        category: 'ecommerce-tools',
        featured: true,
      },
      {
        title: 'Bundle Pricing Calculator',
        href: '/shopify-bundle-pricing-calculator',
        icon: 'Package',
        description: 'Calculate optimal bundle pricing and discount strategies',
        category: 'ecommerce-tools',
      },
      {
        title: 'Break-Even ROAS Calculator',
        href: '/shopify-break-even-roas-calculator',
        icon: 'Target',
        description: 'Calculate minimum return on ad spend to break even',
        category: 'ecommerce-tools',
        featured: true,
      },
      {
        title: 'Return Impact Calculator',
        href: '/shopify-return-refund-impact-calculator',
        icon: 'RotateCcw',
        description: 'Analyze the impact of returns and refunds on profitability',
        category: 'ecommerce-tools',
      },
      {
        title: 'Invoice Generator',
        href: '/shopify-invoice-generator',
        icon: 'FileText',
        description: 'Create professional invoices with line items and tax calculations',
        category: 'ecommerce-tools',
      },
      {
        title: 'Speed Checklist',
        href: '/shopify-speed-checklist',
        icon: 'Zap',
        description: 'Optimize your Shopify store speed with our comprehensive checklist',
        category: 'ecommerce-tools',
      },
    ],
  },
  {
    id: 'string-tools',
    name: 'String Tools',
    description: 'Manipulate, convert, and analyze text. Case converters, encoders, hash generators, regex tester, and more. Fast, secure, browser-based.',
    seoKeywords: 'string tools, case converter, base64 encoder, url encoder, hash generator, regex tester, lorem ipsum, jwt decoder',
    faqs: [
      {
        question: 'Are string tools safe to use with sensitive data?',
        answer: 'Yes. All string processing happens locally in your browser. Your text never leaves your device and is never uploaded to our servers.'
      },
      {
        question: 'Do I need to install any software?',
        answer: 'No, all string tools work entirely in your web browser. Just paste your text and start using the tools immediately.'
      },
      {
        question: 'Can I process large amounts of text?',
        answer: 'Yes, since processing is client-side, you can handle large text files. The limit depends on your browser memory, but most tools handle several megabytes smoothly.'
      },
      {
        question: 'Are the hash functions secure?',
        answer: 'Our hash generators use industry-standard algorithms (MD5, SHA-256, SHA-512). However, for password hashing, use bcrypt or Argon2 instead.'
      }
    ],
    tools: [
      {
        title: 'Case Converter',
        href: '/case-converter',
        icon: 'Type',
        description: 'Convert text between camelCase, snake_case, kebab-case, PascalCase, and more',
        category: 'string-tools',
        color: 'tool-format',
        featured: true,
      },
      {
        title: 'Word Counter',
        href: '/word-counter',
        icon: 'FileText',
        description: 'Count words, characters, sentences, paragraphs, and estimate reading time',
        category: 'string-tools',
        color: 'tool-parse',
        featured: true,
      },
      {
        title: 'Base64 Encoder',
        href: '/base64-encoder',
        icon: 'Code2',
        description: 'Encode and decode text to/from Base64 format',
        category: 'string-tools',
        color: 'tool-convert',
        featured: true,
      },
      {
        title: 'URL Encoder',
        href: '/url-encoder',
        icon: 'Link',
        description: 'Encode and decode URLs and query parameters',
        category: 'string-tools',
        color: 'tool-convert',
        featured: true,
      },
      {
        title: 'Hash Generator',
        href: '/hash-generator',
        icon: 'Shield',
        description: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes',
        category: 'string-tools',
        color: 'tool-protect',
        featured: true,
      },
      {
        title: 'Lorem Ipsum Generator',
        href: '/lorem-ipsum-generator',
        icon: 'FileType',
        description: 'Generate placeholder text with customizable paragraphs and words',
        category: 'string-tools',
        color: 'tool-generate',
        featured: true,
      },
      {
        title: 'Find & Replace',
        href: '/find-replace',
        icon: 'Search',
        description: 'Search and replace text with regex support and case options',
        category: 'string-tools',
        color: 'tool-parse',
        featured: true,
      },
      {
        title: 'Line Sorter',
        href: '/line-sorter',
        icon: 'ArrowUpDown',
        description: 'Sort lines alphabetically, numerically, or by length',
        category: 'string-tools',
        color: 'tool-organize',
        featured: true,
      },
      {
        title: 'Duplicate Line Remover',
        href: '/duplicate-remover',
        icon: 'Trash2',
        description: 'Remove duplicate lines and keep unique entries',
        category: 'string-tools',
        color: 'tool-remove',
        featured: true,
      },
      {
        title: 'UUID Generator',
        href: '/uuid-generator',
        icon: 'Sparkles',
        description: 'Generate v4 UUIDs for development and testing',
        category: 'string-tools',
        color: 'tool-generate',
        featured: true,
      },
      {
        title: 'Password Generator',
        href: '/password-generator',
        icon: 'Lock',
        description: 'Generate strong random passwords with customizable options',
        category: 'string-tools',
        color: 'tool-protect',
        featured: true,
      },
      {
        title: 'Slug Generator',
        href: '/slug-generator',
        icon: 'Hash',
        description: 'Convert text to URL-friendly slugs',
        category: 'string-tools',
        color: 'tool-format',
        featured: true,
      },
      {
        title: 'JWT Decoder',
        href: '/jwt-decoder',
        icon: 'Key',
        description: 'Decode and inspect JWT tokens without verification',
        category: 'string-tools',
        color: 'tool-parse',
      },
      {
        title: 'HTML Entity Encoder',
        href: '/html-entity-encoder',
        icon: 'Code',
        description: 'Encode and decode HTML entities and special characters',
        category: 'string-tools',
        color: 'tool-convert',
      },
      {
        title: 'Text Diff',
        href: '/text-diff',
        icon: 'GitCompare',
        description: 'Compare two texts side-by-side with highlighting',
        category: 'string-tools',
        color: 'tool-compare',
      },
      {
        title: 'Regex Tester',
        href: '/regex-tester',
        icon: 'Asterisk',
        description: 'Test regular expressions with match highlighting and explanations',
        category: 'string-tools',
        color: 'tool-validate',
      },
      {
        title: 'String Reverser',
        href: '/string-reverser',
        icon: 'RotateCcw',
        description: 'Reverse text, words, or sentences',
        category: 'string-tools',
        color: 'tool-format',
      },
      {
        title: 'Whitespace Remover',
        href: '/whitespace-remover',
        icon: 'Minimize2',
        description: 'Remove extra spaces, trim, and normalize whitespace',
        category: 'string-tools',
        color: 'tool-compress',
      },
      {
        title: 'Binary Converter',
        href: '/binary-converter',
        icon: 'Binary',
        description: 'Convert between binary, hexadecimal, and decimal',
        category: 'string-tools',
        color: 'tool-convert',
      },
      {
        title: 'Remove Accents',
        href: '/remove-accents',
        icon: 'RemoveFormatting',
        description: 'Strip diacritics and accents for ASCII-safe text',
        category: 'string-tools',
        color: 'tool-format',
      },
      {
        title: 'Markdown to HTML',
        href: '/markdown-to-html',
        icon: 'FileCode',
        description: 'Convert Markdown to HTML with live preview',
        category: 'string-tools',
        color: 'tool-convert',
      },
      {
        title: 'HTML to Text',
        href: '/html-to-text',
        icon: 'FileType',
        description: 'Strip HTML tags and extract plain text',
        category: 'string-tools',
        color: 'tool-convert',
      },
      {
        title: 'Character Frequency',
        href: '/character-counter',
        icon: 'BarChart3',
        description: 'Analyze character and word frequency distribution',
        category: 'string-tools',
        color: 'tool-parse',
      },
      {
        title: 'Bracket Matcher',
        href: '/bracket-matcher',
        icon: 'Braces',
        description: 'Check if brackets and parentheses are balanced',
        category: 'string-tools',
        color: 'tool-validate',
      },
      {
        title: 'Emoji Extractor',
        href: '/emoji-extractor',
        icon: 'Smile',
        description: 'Extract all emojis from text',
        category: 'string-tools',
        color: 'tool-parse',
      },
    ],
  },
];

// Helper functions
export function getAllTools(): Tool[] {
  return toolCategories.flatMap((category) => category.tools);
}

export function getToolByHref(href: string): Tool | undefined {
  return getAllTools().find((tool) => tool.href === href);
}

export function getToolsByCategory(categoryId: string): Tool[] {
  const category = toolCategories.find((cat) => cat.id === categoryId);
  return category?.tools || [];
}

export function getCategoryByToolHref(href: string): ToolCategory | undefined {
  return toolCategories.find((category) =>
    category.tools.some((tool) => tool.href === href)
  );
}
