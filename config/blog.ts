export interface BlogCategory {
  id: string;
  name: string;
  toolCategory: string | null;
  description: string;
}

export const blogCategories: Record<string, BlogCategory> = {
  pdf: {
    id: 'pdf',
    name: 'PDF Guides',
    toolCategory: 'pdf-tools',
    description: 'Learn how to work with PDF files effectively',
  },
  ecommerce: {
    id: 'ecommerce',
    name: 'E-Commerce',
    toolCategory: 'ecommerce-tools',
    description: 'Tips and guides for running a successful Shopify store',
  },
  productivity: {
    id: 'productivity',
    name: 'Productivity',
    toolCategory: null,
    description: 'General productivity tips and workflows',
  },
  json: {
    id: 'json',
    name: 'JSON Tools',
    toolCategory: 'json-tools',
    description: 'Guides for working with JSON data: conversion, validation, and manipulation',
  },
};

export function getBlogCategory(categoryId: string): BlogCategory | undefined {
  return blogCategories[categoryId];
}

export function getAllBlogCategories(): BlogCategory[] {
  return Object.values(blogCategories);
}

