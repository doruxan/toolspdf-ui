import { Metadata } from 'next';
import HashGenerator from '@/components/tools/string/HashGenerator';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import StructuredData from '@/components/seo/StructuredData';
import { generateSoftwareApplicationSchema, generateHowToSchema, generateFAQSchema } from '@/lib/seo/schemas';
import { withCanonicalMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pageMetadata: Metadata = {
  title: 'Hash Generator - MD5, SHA-256, SHA-512 | RawTools',
  description: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes online. Fast, secure, browser-based hash generator. Perfect for checksums and data integrity. 100% free.',
  keywords: 'hash generator, md5 generator, sha256 generator, sha512 generator, checksum calculator, hash calculator',
  openGraph: {
    title: 'Hash Generator - MD5, SHA-256, SHA-512',
    description: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes. Fast, secure, browser-based.',
    type: 'website',
  
    url: 'https://rawtools.io/hash-generator',
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
    title: 'Hash Generator - MD5, SHA-256, SHA-512 | RawTools',
    description: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes. Perfect for checksums and data integrity.',
  
    images: ['/og-image.svg'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCanonicalMetadata(pageMetadata, 'https://rawtools.io/hash-generator');
}

export default function HashGeneratorPage() {
  const toolSchema = generateSoftwareApplicationSchema({
    name: 'Hash Generator',
    description: 'Free online tool to generate MD5, SHA-1, SHA-256, and SHA-512 hashes. Uses cryptographically strong algorithms for checksums and data integrity.',
    url: 'https://rawtools.io/hash-generator',
  });

  const howToSchema = generateHowToSchema({
    name: 'Hash Generator',
    description: 'How to generate cryptographic hashes',
    url: 'https://rawtools.io/hash-generator',
  }, [
    'Enter text to hash',
    'Click generate hashes',
    'View MD5, SHA-1, SHA-256, SHA-512 outputs',
    'Copy desired hash'
  ]);

  const faqSchema = generateFAQSchema([
    {
      question: 'What is a cryptographic hash?',
      answer: 'A cryptographic hash is a one-way function that converts input data of any size into a fixed-size output (hash or digest). Key properties: deterministic (same input = same hash), irreversible (cannot recover input from hash), avalanche effect (tiny input change = completely different hash), collision-resistant (hard to find two inputs with same hash). Example: SHA-256("hello") always produces "2cf24dba5fb0a30e...".'
    },
    {
      question: 'What is the difference between MD5, SHA-1, SHA-256, and SHA-512?',
      answer: 'MD5 (128-bit) and SHA-1 (160-bit) are deprecated due to collision vulnerabilities; use only for non-security checksums. SHA-256 (256-bit) is the current standard for most applications: file integrity, digital signatures, blockchain. SHA-512 (512-bit) offers higher security for long-term cryptographic needs but is slower. Recommendation: SHA-256 for general use, SHA-512 for high-security/long-term data, never MD5/SHA-1 for security.'
    },
    {
      question: 'Can I use hashes for password storage?',
      answer: 'No. Never use fast hashes (MD5, SHA-256) for passwords. Attackers can test billions of hashes per second using GPUs. Use password-specific algorithms: bcrypt, scrypt, Argon2. These are intentionally slow (adaptive cost factor) and include salts (random data preventing rainbow table attacks). Example: Argon2 takes 100ms per hash, limiting attackers to 10 guesses/second vs 10 billion/second with SHA-256.'
    },
    {
      question: 'What are common use cases for hashes?',
      answer: 'File integrity verification: compare file hash before/after transfer to detect corruption or tampering. Digital signatures: hash documents before signing (faster than signing entire document). Data deduplication: identify duplicate files by comparing hashes. Git version control: commit IDs are SHA-1 hashes. Blockchain: block integrity via hash chains. Caching: use hash of request as cache key. NOT for passwords (use bcrypt/Argon2).'
    },
    {
      question: 'What is a hash collision?',
      answer: 'A hash collision occurs when two different inputs produce the same hash output. Collisions are inevitable (infinite inputs → finite outputs) but should be computationally infeasible. MD5 collisions can be found in seconds (broken algorithm). SHA-1 collisions cost $100K to generate (deprecated). SHA-256 collisions are theoretically possible but require 2^128 operations (impossible with current technology). For practical purposes, SHA-256 is collision-free.'
    },
    {
      question: 'How do I verify file integrity with hashes?',
      answer: 'Download the file and its published hash (often on the official website). Generate the hash of your downloaded file using the same algorithm (e.g., SHA-256). Compare the two hashes character-by-character. If identical, the file is intact and authentic. If different, the file is corrupted or tampered with—do not use it. Example: Linux ISOs publish SHA-256 checksums; users verify downloads before installation to ensure no malware injection during transit.'
    }
  ]);

  return (
    <div className="w-full">
      <StructuredData data={toolSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={faqSchema} />
      <AdBanner dataAdSlot="1234567904" className="mb-6" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Breadcrumbs category="String Tools" toolName="Hash Generator" currentHref="/hash-generator" />
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Hash Generator</h1>
              <p className="text-muted-foreground">Generate MD5, SHA-256, SHA-512 hashes for checksums and integrity</p>
            </div>

            <HashGenerator />
            
            <div className="mt-12 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How to Generate Hashes</h2>
              <ol className="text-muted-foreground space-y-2">
                <li>Enter text to hash</li>
                <li>Click generate hashes</li>
                <li>View MD5, SHA-1, SHA-256, SHA-512 outputs</li>
                <li>Copy desired hash</li>
              </ol>
              
              <h3 className="text-xl font-bold text-foreground mt-8">Hash Generator Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Multiple Algorithms:</strong> MD5, SHA-1, SHA-256, SHA-512</li>
                <li><strong>One-Way Hashing:</strong> Cannot reverse hash to get original</li>
                <li><strong>Instant Generation:</strong> Real-time hash computation</li>
                <li><strong>Copy Individual Hashes:</strong> Select algorithm you need</li>
                <li><strong>Checksum Verification:</strong> Verify file integrity</li>
                <li><strong>100% Free:</strong> No limits on hash generation</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8">What are Cryptographic Hashes?</h3>
              <p className="text-muted-foreground">
                Cryptographic hashes are <strong>one-way functions</strong> that produce fixed-size output from any input. Same input always produces same hash. Cannot reverse hash to get original. Even tiny changes in input produce completely different hash (avalanche effect).
              </p>
              <p className="text-muted-foreground">
                MD5 (128-bit) and SHA-1 (160-bit) are deprecated due to collision attacks. Use SHA-256 (256-bit) or SHA-512 (512-bit) for security. MD5 is still acceptable for non-security use like checksums. For password hashing, use bcrypt or Argon2 instead—they&apos;re designed to be slow to resist brute force.
              </p>
              <p className="text-muted-foreground">
                Use cases: File integrity verification (compare hash of downloaded file to published hash), checksums for data transmission, git commit IDs, content-addressable storage, data deduplication, and cache keys. Warning: Never use for password storage—use proper password hashing algorithms.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8">Privacy & Security</h3>
              <p className="text-muted-foreground">
                All hash generation happens locally in your browser. Your text is never uploaded to servers, stored, or logged. The hashing uses JavaScript crypto libraries, keeping your data completely private.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AdSidebar dataAdSlot="1234567815" />
          </div>
        </div>
      </div>
    </div>
  );
}

