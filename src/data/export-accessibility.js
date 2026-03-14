#!/usr/bin/env node

/**
 * Image Accessibility Export Tool
 *
 * Generates various export formats for image accessibility metadata
 * Usage: node src/data/export-accessibility.js [format]
 *
 * Formats:
 *   - csv: CSV file for spreadsheet applications
 *   - json: JSON file for programmatic use
 *   - html: HTML table for documentation
 *   - markdown: Markdown table for documentation
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Since we can't import from TypeScript directly, we'll define the data inline
// In a real setup, you'd import from imageAccessibility.ts

const imageAccessibilityMetadata = {
  'ada-lovelace': {
    id: 'ada-lovelace',
    name: 'Ada Lovelace',
    category: 'The Pioneers',
    altText: 'Ada Lovelace, English mathematician, 1843, wearing period dress',
    title: 'First Computer Programmer',
    ariaDescription: 'Ada Lovelace (1815-1852) was an English mathematician who is recognized as the first computer programmer.',
    role: 'Mathematician & Programmer'
  },
  // ... (in production, import full metadata)
};

/**
 * Generate CSV export
 */
function generateCSV(metadata) {
  const headers = ['ID', 'Name', 'Category', 'Title', 'Role', 'Alt Text', 'Aria Description'];

  let csv = headers.join(',') + '\n';

  Object.values(metadata).forEach((item) => {
    const row = [
      item.id,
      `"${item.name}"`,
      `"${item.category}"`,
      `"${item.title}"`,
      `"${item.role}"`,
      `"${item.altText}"`,
      `"${item.ariaDescription}"`,
    ];
    csv += row.join(',') + '\n';
  });

  return csv;
}

/**
 * Generate JSON export
 */
function generateJSON(metadata) {
  return JSON.stringify(Object.values(metadata), null, 2);
}

/**
 * Generate HTML table export
 */
function generateHTML(metadata) {
  let html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Image Accessibility Metadata</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 2rem;
      background: #f5f5f5;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    th {
      background: #333;
      color: white;
      padding: 12px;
      text-align: left;
      font-weight: 600;
    }
    td {
      padding: 12px;
      border-bottom: 1px solid #eee;
    }
    tr:hover {
      background: #f9f9f9;
    }
    .category {
      font-weight: 500;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.9em;
    }
    .pioneers { background: #e0f7ff; }
    .coders { background: #f0e0ff; }
    .space { background: #ffe0e6; }
    .modern { background: #e0ffe6; }
    .justice { background: #ffe0ff; }
    .community { background: #ffe8d6; }
  </style>
</head>
<body>
  <h1>Image Accessibility Metadata</h1>
  <p>Complete table of accessibility information for all images in the Equity project.</p>

  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Category</th>
        <th>Title</th>
        <th>Role</th>
        <th>Alt Text</th>
        <th>Aria Description</th>
      </tr>
    </thead>
    <tbody>
`;

  Object.values(metadata).forEach((item) => {
    const categoryClass = item.category
      .toLowerCase()
      .replace(/\s+/g, '')
      .substring(0, 8);

    html += `
      <tr>
        <td><code>${item.id}</code></td>
        <td><strong>${item.name}</strong></td>
        <td><span class="category ${categoryClass}">${item.category}</span></td>
        <td>${item.title}</td>
        <td>${item.role}</td>
        <td>${item.altText}</td>
        <td>${item.ariaDescription}</td>
      </tr>
`;
  });

  html += `
    </tbody>
  </table>
</body>
</html>
`;
  return html;
}

/**
 * Generate Markdown table export
 */
function generateMarkdown(metadata) {
  let md = `# Image Accessibility Metadata\n\n`;
  md += `*Generated: ${new Date().toLocaleString('pt-BR')}*\n\n`;
  md += `Total Images: ${Object.values(metadata).length}\n\n`;

  md += `## Complete Table\n\n`;
  md += `| ID | Name | Category | Title | Role |\n`;
  md += `|---|---|---|---|---|\n`;

  Object.values(metadata).forEach((item) => {
    md += `| \`${item.id}\` | ${item.name} | ${item.category} | ${item.title} | ${item.role} |\n`;
  });

  md += `\n## Detailed Descriptions\n\n`;

  Object.values(metadata).forEach((item) => {
    md += `### ${item.name} (\`${item.id}\`)\n\n`;
    md += `- **Category**: ${item.category}\n`;
    md += `- **Title**: ${item.title}\n`;
    md += `- **Role**: ${item.role}\n`;
    md += `- **Alt Text**: ${item.altText}\n`;
    md += `- **Description**: ${item.ariaDescription}\n\n`;
  });

  return md;
}

/**
 * Main export function
 */
function main() {
  const format = process.argv[2] || 'markdown';
  const outputDir = path.join(__dirname, '../../exports');

  // Create exports directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let content;
  let filename;
  let mimeType;

  switch (format.toLowerCase()) {
    case 'csv':
      content = generateCSV(imageAccessibilityMetadata);
      filename = 'image-accessibility.csv';
      mimeType = 'text/csv';
      break;
    case 'json':
      content = generateJSON(imageAccessibilityMetadata);
      filename = 'image-accessibility.json';
      mimeType = 'application/json';
      break;
    case 'html':
      content = generateHTML(imageAccessibilityMetadata);
      filename = 'image-accessibility.html';
      mimeType = 'text/html';
      break;
    case 'markdown':
    case 'md':
      content = generateMarkdown(imageAccessibilityMetadata);
      filename = 'image-accessibility.md';
      mimeType = 'text/markdown';
      break;
    default:
      console.error(`Unknown format: ${format}`);
      console.log('Available formats: csv, json, html, markdown');
      process.exit(1);
  }

  const filepath = path.join(outputDir, filename);
  fs.writeFileSync(filepath, content, 'utf-8');

  console.log(`✅ Export completed: ${filepath}`);
  console.log(`📊 Format: ${format}`);
  console.log(`📦 File size: ${(content.length / 1024).toFixed(2)} KB`);
}

// Run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateCSV, generateJSON, generateHTML, generateMarkdown };
