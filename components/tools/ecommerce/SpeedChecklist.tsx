'use client'

import { useState } from 'react'
import { Card } from '@/components/shared/Card'
import { Button } from '@/components/shared/Button'
import { Badge } from '@/components/shared/Badge'
import { exportToJSON } from '@/lib/exports/json'
import { printToPDF } from '@/lib/exports/pdf'

interface ChecklistItem {
  id: string
  category: string
  task: string
  impact: 'high' | 'medium' | 'low'
  checked: boolean
}

const CHECKLIST_ITEMS: Omit<ChecklistItem, 'checked'>[] = [
  // Images
  { id: 'img-1', category: 'Images', task: 'Compress all product images (use WebP or optimized JPG)', impact: 'high' },
  { id: 'img-2', category: 'Images', task: 'Implement lazy loading for below-the-fold images', impact: 'high' },
  { id: 'img-3', category: 'Images', task: 'Use appropriate image dimensions (no oversized images)', impact: 'medium' },
  { id: 'img-4', category: 'Images', task: 'Add width and height attributes to prevent layout shift', impact: 'medium' },
  
  // Apps
  { id: 'app-1', category: 'Apps', task: 'Audit and remove unused Shopify apps', impact: 'high' },
  { id: 'app-2', category: 'Apps', task: 'Check app script loading times in browser DevTools', impact: 'medium' },
  { id: 'app-3', category: 'Apps', task: 'Defer non-critical app scripts', impact: 'medium' },
  
  // Theme
  { id: 'theme-1', category: 'Theme', task: 'Minimize custom CSS and JavaScript', impact: 'high' },
  { id: 'theme-2', category: 'Theme', task: 'Remove unused theme sections and snippets', impact: 'medium' },
  { id: 'theme-3', category: 'Theme', task: 'Use Shopify 2.0 theme architecture (if applicable)', impact: 'medium' },
  { id: 'theme-4', category: 'Theme', task: 'Eliminate render-blocking resources', impact: 'high' },
  
  // Code
  { id: 'code-1', category: 'Code', task: 'Minify CSS and JavaScript files', impact: 'high' },
  { id: 'code-2', category: 'Code', task: 'Enable browser caching (leverage Shopify CDN)', impact: 'high' },
  { id: 'code-3', category: 'Code', task: 'Reduce third-party scripts (analytics, chat, etc.)', impact: 'medium' },
  { id: 'code-4', category: 'Code', task: 'Implement critical CSS inline for above-the-fold content', impact: 'medium' },
  { id: 'code-5', category: 'Code', task: 'Use async/defer attributes for non-critical scripts', impact: 'high' },
  
  // Fonts
  { id: 'font-1', category: 'Fonts', task: 'Limit custom web fonts (max 2-3 font families)', impact: 'medium' },
  { id: 'font-2', category: 'Fonts', task: 'Use font-display: swap for custom fonts', impact: 'low' },
  
  // Content
  { id: 'content-1', category: 'Content', task: 'Reduce homepage complexity (fewer sections)', impact: 'medium' },
  { id: 'content-2', category: 'Content', task: 'Optimize collection page product counts', impact: 'low' },
  
  // Testing
  { id: 'test-1', category: 'Testing', task: 'Run Google PageSpeed Insights', impact: 'high' },
  { id: 'test-2', category: 'Testing', task: 'Test on real mobile devices', impact: 'high' },
  { id: 'test-3', category: 'Testing', task: 'Monitor Core Web Vitals (LCP, FID, CLS)', impact: 'high' }
]

export function SpeedChecklist() {
  const [items, setItems] = useState<ChecklistItem[]>(
    CHECKLIST_ITEMS.map(item => ({ ...item, checked: false }))
  )
  
  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ))
  }
  
  const categories = Array.from(new Set(items.map(item => item.category)))
  const completedCount = items.filter(item => item.checked).length
  const progressPercent = Math.round((completedCount / items.length) * 100)
  
  const handleExportJSON = () => {
    const completed = items.filter(item => item.checked)
    exportToJSON({ completed, total: items.length, progress: progressPercent }, 'speed-checklist-progress')
  }
  
  return (
    <div id="speed-checklist" className="max-w-5xl mx-auto px-4 py-8">
      <Card title="Progress">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-foreground">
              {completedCount} of {items.length} tasks completed
            </span>
            <span className="text-2xl font-bold text-primary">{progressPercent}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div
              className="bg-primary h-3 rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </Card>
      
      {categories.map(category => {
        const categoryItems = items.filter(item => item.category === category)
        const categoryCompleted = categoryItems.filter(item => item.checked).length
        
        return (
          <Card key={category} title={category} className="mt-6">
            <div className="space-y-3">
              {categoryItems.map(item => (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className="flex items-start gap-3 p-3 border-2 border-border rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleItem(item.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-1 w-5 h-5 rounded cursor-pointer"
                  />
                  <div className="flex-1">
                    <p className={`text-sm ${item.checked ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {item.task}
                    </p>
                  </div>
                  <Badge
                    variant={
                      item.impact === 'high' ? 'error' :
                      item.impact === 'medium' ? 'warning' : 'default'
                    }
                  >
                    {item.impact} impact
                  </Badge>
                </div>
              ))}
              <div className="text-xs text-muted-foreground pt-2">
                {categoryCompleted} / {categoryItems.length} completed
              </div>
            </div>
          </Card>
        )
      })}
      
      <div className="mt-6 flex gap-2">
        <Button variant="secondary" onClick={handleExportJSON}>
          Export Progress (JSON)
        </Button>
        <Button variant="secondary" onClick={() => printToPDF('speed-checklist')}>
          Print Checklist
        </Button>
      </div>
    </div>
  )
}

