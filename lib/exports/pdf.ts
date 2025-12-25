export function printToPDF(elementId?: string): void {
  if (typeof window === 'undefined') return
  
  if (elementId) {
    // Mark the specific element for printing
    const element = document.getElementById(elementId)
    if (element) {
      element.setAttribute('data-print-target', 'true')
    }
  }
  
  // Add class to body to trigger print-specific styles
  document.body.classList.add('print-mode')
  
  // Trigger print
  window.print()
  
  // Cleanup after print dialog closes
  setTimeout(() => {
    document.body.classList.remove('print-mode')
    if (elementId) {
      const element = document.getElementById(elementId)
      if (element) {
        element.removeAttribute('data-print-target')
      }
    }
  }, 100)
}

