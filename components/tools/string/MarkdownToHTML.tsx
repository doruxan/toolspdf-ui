'use client';

import { useState } from 'react';
import { markdownToHTML } from '@/lib/string/converters';
import { JSONTextarea } from '@/components/shared/JSONTextarea';
import { Button } from '@/components/shared/Button';
import { Eye } from 'lucide-react';

export default function MarkdownToHTML() {
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState('');
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    if (!markdown) return;

    setLoading(true);
    try {
      const converted = await markdownToHTML(markdown);
      setHtml(converted);
    } catch (error) {
      console.error('Conversion failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMarkdown('');
    setHtml('');
  };

  return (
    <div className="space-y-6">
      <JSONTextarea
        value={markdown}
        onChange={setMarkdown}
        label="Markdown Input"
        placeholder="Enter Markdown text..."
        accept=".md,.txt"
        minHeight="min-h-64"
      />

      <div className="flex gap-4">
        <Button onClick={handleConvert} disabled={!markdown || loading}>
          {loading ? 'Converting...' : 'Convert to HTML'}
        </Button>
        <Button
          variant="secondary"
          onClick={() => setPreview(!preview)}
          disabled={!html}
        >
          <Eye className="h-4 w-4 mr-2" />
          {preview ? 'Show HTML Code' : 'Show Preview'}
        </Button>
        <Button variant="secondary" onClick={handleClear}>
          Clear
        </Button>
      </div>

      {html && (
        <>
          {preview ? (
            <div className="bg-background border-2 border-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Preview</h3>
              <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          ) : (
            <>
              <JSONTextarea
                value={html}
                onChange={() => {}}
                label="HTML Output"
                readOnly
                minHeight="min-h-64"
              />
              <Button
                variant="secondary"
                onClick={() => navigator.clipboard.writeText(html)}
              >
                Copy HTML
              </Button>
            </>
          )}
        </>
      )}
    </div>
  );
}

