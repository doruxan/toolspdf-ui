import { Metadata } from 'next';
import PasswordGenerator from '@/components/tools/string/PasswordGenerator';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'Password Generator - Strong Random Password Generator | RawTools',
  description: 'Generate strong random passwords with customizable length and character types. Includes password strength meter. Fast, secure, browser-based. 100% free.',
  keywords: 'password generator, random password, strong password, secure password generator, password strength',
  openGraph: {
    title: 'Password Generator - Strong Random Password Generator',
    description: 'Generate strong random passwords with customizable options. Fast, secure, browser-based.',
    type: 'website',
  
    url: 'https://rawtools.io/password-generator',
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
    title: 'Password Generator - Strong Passwords | RawTools',
    description: 'Generate strong random passwords. Customizable length and character types with strength meter.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/password-generator');
}

export default function PasswordGeneratorPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Password Generator',
    description: 'Free online tool to generate strong random passwords. Customize length, character types, and batch generate up to 100 passwords. Includes password strength meter.',
    url: 'https://rawtools.io/password-generator',
  });

  const howToSchema = generateHowToSchema({
    name: 'Password Generator',
    description: 'How to generate strong passwords',
    url: 'https://rawtools.io/password-generator',
  }, [
    'Set password length (4-128 characters)',
    'Choose character types (uppercase, lowercase, numbers, symbols)',
    'Click generate',
    'Check strength meter, copy secure password'
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <AdBanner dataAdSlot="1234567916" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="String Tools" toolName="Password Generator" currentHref="/password-generator" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Password Generator</h1>
              <p className="text-muted-foreground">Generate strong random passwords with customizable options</p>
            </div>

            <PasswordGenerator />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Generate Strong Passwords</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Set password length (4-128 characters)</li>
                <li>Choose character types (uppercase, lowercase, numbers, symbols)</li>
                <li>Click generate</li>
                <li>Check strength meter, copy secure password</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Password Generator Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Customizable Length:</strong> 4-128 characters</li>
                <li><strong>Character Type Selection:</strong> Uppercase, lowercase, numbers, symbols</li>
                <li><strong>Strength Meter:</strong> Indicates weak, medium, or strong</li>
                <li><strong>Batch Generation:</strong> Create up to 100 passwords at once</li>
                <li><strong>Cryptographically Secure:</strong> Uses Web Crypto API</li>
                <li><strong>100% Free:</strong> No limits on generation</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">What Makes a Strong Password?</h3>
              <p className="text-muted-foreground">
                Strong passwords use <strong>length, randomness, and character diversity</strong>. A 12-character password with uppercase, lowercase, numbers, and symbols has 62^12 combinations (3.2 quintillion), taking centuries to crack with current technology.
              </p>
              <p className="text-muted-foreground">
                Humans create predictable passwords like &quot;P@ssw0rd123&quot; which crackers test first. Password generators create truly random strings like &quot;Kq7#mP2$vL9x&quot; with no patterns. Length matters more than complexity—a 16-character password with just lowercase letters is stronger than an 8-character password with all character types.
              </p>
              <p className="text-muted-foreground">
                Use cases: Creating account passwords for websites, generating API keys, securing database connections, WiFi passwords, application secrets, and temporary access credentials. Always use a password manager to store generated passwords—never reuse passwords across sites.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All password generation happens locally in your browser using cryptographically secure random numbers. Passwords are never uploaded to servers, stored, or logged. The generation uses Web Crypto API, keeping your passwords completely private.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1234567821" />
          </div>
        </div>
      </div>
    </div>
  );
}

