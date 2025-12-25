export interface Tool {
  title: string;
  href: string;
  icon: string;
  description: string;
  category: string;
  color?: string;
}

export interface ToolCategory {
  id: string;
  name: string;
  description: string;
  seoKeywords: string;
  tools: Tool[];
}

export const toolCategories: ToolCategory[] = [
  {
    id: 'pdf-tools',
    name: 'Free Online PDF Tools',
    description: 'Process PDFs directly in your browser - merge, split, compress, and convert. 100% free, no limits.',
    seoKeywords: 'pdf tools, merge pdf, split pdf, compress pdf, pdf to jpg, jpg to pdf, free pdf tools online',
    tools: [
      {
        title: 'Merge PDF',
        href: '/merge-pdf',
        icon: 'Layers',
        description: 'Combine multiple PDF files into one document',
        category: 'pdf-tools',
        color: 'tool-merge',
      },
      {
        title: 'Split PDF',
        href: '/split-pdf',
        icon: 'Scissors',
        description: 'Extract pages or split into separate documents',
        category: 'pdf-tools',
        color: 'tool-split',
      },
      {
        title: 'Compress PDF',
        href: '/compress-pdf',
        icon: 'Minimize2',
        description: 'Reduce PDF file size without losing quality',
        category: 'pdf-tools',
        color: 'tool-compress',
      },
      {
        title: 'PDF to JPG',
        href: '/pdf-to-jpg',
        icon: 'ImageIcon',
        description: 'Convert PDF pages to JPG images',
        category: 'pdf-tools',
        color: 'tool-convert',
      },
      {
        title: 'JPG to PDF',
        href: '/jpg-to-pdf',
        icon: 'FileImage',
        description: 'Convert images to PDF document',
        category: 'pdf-tools',
        color: 'tool-convert',
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
    id: 'ecommerce-tools',
    name: 'Shopify & E-Commerce Tools',
    description: 'Professional calculators and tools for Shopify store operators. Calculate profit, fees, and more.',
    seoKeywords: 'shopify calculator, profit calculator, shopify fees, ltv cac calculator, shopify tools',
    tools: [
      {
        title: 'Shopify Profit Calculator',
        href: '/shopify-profit-calculator',
        icon: 'DollarSign',
        description: 'Calculate per-order profit, contribution margin, and break-even revenue',
        category: 'ecommerce-tools',
      },
      {
        title: 'Shopify Fees Calculator',
        href: '/shopify-fees-calculator',
        icon: 'CreditCard',
        description: 'Estimate processing fees and transaction fees across all Shopify plans',
        category: 'ecommerce-tools',
      },
      {
        title: 'LTV/CAC Calculator',
        href: '/shopify-ltv-cac-calculator',
        icon: 'TrendingUp',
        description: 'Measure customer lifetime value and acquisition cost ratio',
        category: 'ecommerce-tools',
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
    id: 'iban-tools',
    name: 'IBAN Tools',
    description: 'Validate, generate, and analyze International Bank Account Numbers (IBAN) for 80+ countries. Complete toolkit for banking data.',
    seoKeywords: 'iban validator, iban checker, iban generator, validate iban, iban format, iban parser, batch iban validator',
    tools: [
      {
        title: 'IBAN Validator',
        href: '/iban-validator',
        icon: 'CheckCircle',
        description: 'Validate IBANs with real-time verification for 80+ countries',
        category: 'iban-tools',
        color: 'tool-validate',
      },
      {
        title: 'IBAN Generator',
        href: '/iban-generator',
        icon: 'Sparkles',
        description: 'Generate valid test IBANs for development and testing',
        category: 'iban-tools',
        color: 'tool-generate',
      },
      {
        title: 'IBAN Parser',
        href: '/iban-parser',
        icon: 'Search',
        description: 'Extract bank code, branch code, and account details from IBANs',
        category: 'iban-tools',
        color: 'tool-parse',
      },
      {
        title: 'IBAN Formatter',
        href: '/iban-formatter',
        icon: 'AlignLeft',
        description: 'Format IBANs for print or electronic use with batch support',
        category: 'iban-tools',
        color: 'tool-format',
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

