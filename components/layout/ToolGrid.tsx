import Link from 'next/link';
import { 
  Layers, 
  Scissors, 
  Minimize2, 
  Image as ImageIcon, 
  FileImage, 
  RotateCw, 
  Unlock, 
  Lock, 
  Droplet,
  Trash2,
  FileCheck,
  Hash,
  ArrowUpDown,
  FileCode,
  Crop,
  EyeOff
} from 'lucide-react';

const tools = [
  {
    name: 'Merge PDF',
    description: 'Combine multiple PDF files into one document',
    href: '/merge-pdf',
    icon: Layers,
    color: 'tool-merge',
  },
  {
    name: 'Split PDF',
    description: 'Extract pages or split into separate documents',
    href: '/split-pdf',
    icon: Scissors,
    color: 'tool-split',
  },
  {
    name: 'Compress PDF',
    description: 'Reduce PDF file size without losing quality',
    href: '/compress-pdf',
    icon: Minimize2,
    color: 'tool-compress',
  },
  {
    name: 'PDF to JPG',
    description: 'Convert PDF pages to JPG images',
    href: '/pdf-to-jpg',
    icon: ImageIcon,
    color: 'tool-convert',
  },
  {
    name: 'JPG to PDF',
    description: 'Convert images to PDF document',
    href: '/jpg-to-pdf',
    icon: FileImage,
    color: 'tool-convert',
  },
  {
    name: 'Rotate PDF',
    description: 'Rotate pages in your PDF document',
    href: '/rotate-pdf',
    icon: RotateCw,
    color: 'tool-rotate',
  },
  {
    name: 'Unlock PDF',
    description: 'Remove password protection from PDF',
    href: '/unlock-pdf',
    icon: Unlock,
    color: 'tool-unlock',
  },
  {
    name: 'Protect PDF',
    description: 'Add password protection to your PDF',
    href: '/protect-pdf',
    icon: Lock,
    color: 'tool-protect',
  },
  {
    name: 'Watermark PDF',
    description: 'Add text or image watermark to PDF',
    href: '/watermark-pdf',
    icon: Droplet,
    color: 'tool-watermark',
  },
  {
    name: 'Remove Pages',
    description: 'Delete specific pages from your PDF',
    href: '/remove-pages',
    icon: Trash2,
    color: 'tool-remove',
  },
  {
    name: 'Extract Pages',
    description: 'Extract specific pages into a new PDF',
    href: '/extract-pages',
    icon: FileCheck,
    color: 'tool-extract',
  },
  {
    name: 'Add Page Numbers',
    description: 'Add page numbers to your PDF document',
    href: '/add-page-numbers',
    icon: Hash,
    color: 'tool-number',
  },
  {
    name: 'Organize PDF',
    description: 'Reorder and rearrange PDF pages',
    href: '/organize-pdf',
    icon: ArrowUpDown,
    color: 'tool-organize',
  },
  {
    name: 'HTML to PDF',
    description: 'Convert HTML or text to PDF document',
    href: '/html-to-pdf',
    icon: FileCode,
    color: 'tool-html',
  },
  {
    name: 'Crop PDF',
    description: 'Adjust margins and crop PDF pages',
    href: '/crop-pdf',
    icon: Crop,
    color: 'tool-crop',
  },
  {
    name: 'Redact PDF',
    description: 'Black out sensitive information in PDF',
    href: '/redact-pdf',
    icon: EyeOff,
    color: 'tool-redact',
  },
];

export default function ToolGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => {
        const Icon = tool.icon;
        return (
          <Link
            key={tool.href}
            href={tool.href}
            className="group relative p-6 bg-background border-2 border-border rounded-xl hover:border-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col gap-4">
              <div className={`w-14 h-14 min-w-[3.5rem] min-h-[3.5rem] rounded-lg bg-gradient-to-br from-${tool.color} to-primary/50 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon className="h-7 w-7 text-white" width={28} height={28} aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{tool.description}</p>
              </div>
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-primary text-sm font-semibold">Try Now →</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

