export function ToolPlaceholder({ label }: { label: string }) {
  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
        <p className="text-sm text-gray-600">Tool UI placeholder</p>
        <p className="mt-2 font-medium text-gray-900">{label}</p>
        <p className="mt-2 text-sm text-gray-700">
          The calculator/generator UI will render here. The long-form SEO content below is fully indexable.
        </p>
      </div>
    </div>
  )
}



