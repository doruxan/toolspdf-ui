import type { Metadata } from 'next';

function getString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

function getMetadataTitle(metadata: Metadata): string | undefined {
  const title = metadata.title;
  if (typeof title === 'string') return title;
  if (title && typeof title === 'object' && 'absolute' in title) {
    return getString((title as { absolute?: unknown }).absolute);
  }
  return undefined;
}

export function withCanonicalMetadata(pageMetadata: Metadata, canonical: string): Metadata {
  const title = getMetadataTitle(pageMetadata) ?? 'RawTools';
  const description = pageMetadata.description ?? '';

  const openGraphTitle =
    getString((pageMetadata.openGraph as { title?: unknown } | undefined)?.title) ?? title;
  const openGraphDescription =
    getString((pageMetadata.openGraph as { description?: unknown } | undefined)?.description) ??
    description;

  const twitterTitle =
    getString((pageMetadata.twitter as { title?: unknown } | undefined)?.title) ?? title;
  const twitterDescription =
    getString((pageMetadata.twitter as { description?: unknown } | undefined)?.description) ??
    description;

  return {
    ...pageMetadata,
    alternates: {
      ...(pageMetadata.alternates ?? {}),
      canonical,
    },
    openGraph: {
      ...(pageMetadata.openGraph ?? {}),
      title: openGraphTitle,
      description: openGraphDescription,
      url: canonical,
    },
    twitter: {
      ...(pageMetadata.twitter ?? {}),
      title: twitterTitle,
      description: twitterDescription,
    },
  };
}


