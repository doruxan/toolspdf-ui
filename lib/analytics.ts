// Google Analytics event tracking

export const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Replace with your GA4 ID

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track tool usage
export const trackToolUsage = (toolName: string) => {
  event({
    action: 'tool_used',
    category: 'PDF Tools',
    label: toolName,
  });
};

// Track file downloads
export const trackDownload = (toolName: string, fileType: string) => {
  event({
    action: 'file_downloaded',
    category: 'Downloads',
    label: `${toolName} - ${fileType}`,
  });
};

// Track errors
export const trackError = (errorMessage: string, toolName: string) => {
  event({
    action: 'error',
    category: 'Errors',
    label: `${toolName}: ${errorMessage}`,
  });
};

