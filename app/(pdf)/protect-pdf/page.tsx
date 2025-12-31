import { Metadata } from 'next';
import ProtectPDF from '@/components/tools/ProtectPDF';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema, generateFAQSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'Protect PDF Online Free - Add Password to PDF',
  description: 'Free online tool to add password protection to PDF files. Secure your PDFs with encryption. Fast and works in your browser.',
  keywords: 'protect pdf, password protect pdf, secure pdf online free, encrypt pdf',
  openGraph: {
    title: 'Protect PDF Online Free - Add Password',
    description: 'Add password protection to PDF files. 100% free, secure, and fast.',
    type: 'website',
  
    url: 'https://rawtools.io/protect-pdf',
    siteName: 'RawTools',
    images: [{
      url: '/og-image.svg',
      width: 1200,
      height: 630,
      alt: 'RawTools Logo',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Protect PDF with Password | RawTools',
    description: 'Add password protection to PDF files. Secure, fast, browser-based encryption.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/protect-pdf');
}


export default function ProtectPDFPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Protect PDF',
    description: 'Free online tool to add password protection to PDF files.',
    url: 'https://rawtools.io/protect-pdf',
  });

  const howToSchema = generateHowToSchema({
    name: 'Protect PDF',
    description: 'How to password protect PDF files',
    url: 'https://rawtools.io/protect-pdf',
  }, [
    'Upload your PDF file',
    'Enter a strong password',
    'Click the "Protect PDF" button',
    'Download your password-protected PDF'
  ]);

  const faqSchema = generateFAQSchema([
    {
      question: 'What encryption level does PDF password protection use?',
      answer: 'Most PDF tools use 128-bit or 256-bit AES (Advanced Encryption Standard) encryption, the same encryption used by banks and government agencies. 128-bit AES provides strong protection for most use cases. 256-bit AES offers higher security for sensitive documents. Both are considered unbreakable with current technology when using strong passwords. Older 40-bit RC4 encryption is obsolete and should not be used.'
    },
    {
      question: 'What makes a strong PDF password?',
      answer: 'Strong PDF passwords should be: 12+ characters long, include uppercase and lowercase letters, contain numbers and symbols, avoid dictionary words or personal info (names, birthdates), and be unique (not reused from other accounts). Example strong password: "7mQ#nP9$xR2@wZ4L". Weak password: "MyName2024!". Use a password manager to generate and store complex passwords securely.'
    },
    {
      question: 'Can password-protected PDFs be cracked?',
      answer: 'With a strong password (16+ random characters), modern PDF encryption is effectively unbreakable. However, weak passwords (short, dictionary words, common patterns) can be cracked using brute-force attacks or password lists. A 6-character lowercase password can be cracked in minutes. A 16-character mixed-case password with symbols would take billions of years. Always use strong, random passwords for sensitive documents.'
    },
    {
      question: 'What is the difference between owner and user passwords?',
      answer: 'User password (open password) controls who can open the PDF. Recipients must enter this password to view the document. Owner password (permissions password) controls editing, printing, and copying, but allows viewing without a password. Use user passwords for confidential documents. Use owner passwords to prevent editing while allowing distribution. Many tools set the same password for both.'
    },
    {
      question: 'Can I remove password protection if I forget the password?',
      answer: 'No. If you forget the password, the PDF is permanently inaccessible (that is the point of encryption). There are no legitimate "backdoors." Password recovery services use brute-force attacks and only work on weak passwords. For important documents: store passwords in a password manager, maintain unencrypted backups in secure locations, or use password recovery hints (but not obvious ones).'
    },
    {
      question: 'Does password protection reduce PDF compatibility?',
      answer: 'No. Password-protected PDFs are widely supported by all major PDF viewers (Adobe Acrobat, Foxit, Chrome, Edge, macOS Preview). The recipient only needs to enter the password to view the document. However, very old PDF readers (pre-2010) may not support modern encryption standards like 256-bit AES. For maximum compatibility, use 128-bit AES encryption and share the password securely with recipients.'
    }
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={faqSchema} />
      <AdBanner dataAdSlot="1616161616" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="PDF Tools" toolName="Protect PDF" currentHref="/protect-pdf" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Protect PDF</h1>
              <p className="text-muted-foreground">Add password protection to your PDF</p>
            </div>

            <ProtectPDF />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Password Protect PDF</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Upload your PDF file</li>
                <li>Enter a strong password</li>
                <li>Click the "Protect PDF" button</li>
                <li>Download your password-protected PDF</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">PDF Protection Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Strong Encryption:</strong> 128-bit AES encryption standard</li>
                <li><strong>Custom Password:</strong> Choose any password you want</li>
                <li><strong>Instant Protection:</strong> Encrypt PDFs in seconds</li>
                <li><strong>No File Limits:</strong> Protect files of any size</li>
                <li><strong>Browser-Based:</strong> Password never sent to servers</li>
                <li><strong>Universal Compatibility:</strong> Works with all PDF readers</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">Why Password Protect PDFs?</h3>
              <p className="text-muted-foreground">
                PDF password protection secures <strong>sensitive documents from unauthorized access</strong>. Scenario: You&apos;re emailing financial statements to your accountant. Add a password so if the email is intercepted or forwarded, only your accountant (who knows the password) can open it.
              </p>
              <p className="text-muted-foreground">
                Common use cases: Protecting confidential contracts, securing tax documents, encrypting medical records, safeguarding employee information, protecting intellectual property, securing legal documents, and adding privacy to personal files before cloud storage.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All PDF encryption happens locally in your browser. Your password and files never leave your device—encryption is performed using JavaScript on your computer. The protected PDF is generated locally—complete privacy guaranteed.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1717171717" />
          </div>
        </div>
      </div>
    </div>
  );
}

