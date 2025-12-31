// Lazy-loaded crypto-js for hash generation
// Only imported when user actually generates a hash

export type HashAlgorithm = 'MD5' | 'SHA1' | 'SHA256' | 'SHA512';

export async function generateHash(text: string, algorithm: HashAlgorithm): Promise<string> {
  // For SHA-256 and SHA-512, use native Web Crypto API (no external library needed)
  if (algorithm === 'SHA256' || algorithm === 'SHA512') {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const hashBuffer = await crypto.subtle.digest(algorithm, data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    } catch (error) {
      throw new Error(`Failed to generate ${algorithm} hash`);
    }
  }

  // For MD5 and SHA1, use crypto-js (lazy loaded)
  try {
    const CryptoJS = await import('crypto-js');
    
    switch (algorithm) {
      case 'MD5':
        return CryptoJS.default.MD5(text).toString();
      case 'SHA1':
        return CryptoJS.default.SHA1(text).toString();
      default:
        throw new Error('Unsupported hash algorithm');
    }
  } catch (error) {
    throw new Error(`Failed to generate ${algorithm} hash`);
  }
}

export async function generateAllHashes(text: string): Promise<Record<HashAlgorithm, string>> {
  const [md5, sha1, sha256, sha512] = await Promise.all([
    generateHash(text, 'MD5'),
    generateHash(text, 'SHA1'),
    generateHash(text, 'SHA256'),
    generateHash(text, 'SHA512'),
  ]);

  return {
    MD5: md5,
    SHA1: sha1,
    SHA256: sha256,
    SHA512: sha512,
  };
}

export function validateHashFormat(hash: string, algorithm: HashAlgorithm): boolean {
  const lengths: Record<HashAlgorithm, number> = {
    MD5: 32,
    SHA1: 40,
    SHA256: 64,
    SHA512: 128,
  };

  const expectedLength = lengths[algorithm];
  const hexPattern = /^[a-fA-F0-9]+$/;
  
  return hash.length === expectedLength && hexPattern.test(hash);
}

