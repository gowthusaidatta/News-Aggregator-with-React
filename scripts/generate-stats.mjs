import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const assetsDir = path.join(rootDir, 'dist', 'assets');
const outputFile = path.join(rootDir, 'stats.html');

const jsFiles = fs.existsSync(assetsDir)
  ? fs
      .readdirSync(assetsDir)
      .filter((file) => file.endsWith('.js'))
      .map((file) => {
        const fullPath = path.join(assetsDir, file);
        const size = fs.statSync(fullPath).size;
        return {
          file,
          size,
          sizeKb: (size / 1024).toFixed(2),
        };
      })
  : [];

const totalSize = jsFiles.reduce((sum, file) => sum + file.size, 0);
const rows = jsFiles
  .map(
    (file) => `
      <tr>
        <td>${file.file}</td>
        <td>${file.sizeKb} KB</td>
      </tr>`,
  )
  .join('\n');

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bundle Stats</title>
    <style>
      body {
        font-family: Arial, Helvetica, sans-serif;
        margin: 0;
        padding: 32px;
        background: #f5f7fb;
        color: #102a43;
      }
      main {
        max-width: 960px;
        margin: 0 auto;
        background: white;
        border-radius: 20px;
        padding: 28px;
        box-shadow: 0 18px 42px rgba(15, 23, 42, 0.12);
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 18px;
      }
      th, td {
        text-align: left;
        padding: 12px 14px;
        border-bottom: 1px solid #d9e2ec;
      }
      th {
        background: #f0f4f8;
      }
      .summary {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 16px;
        margin-top: 20px;
      }
      .card {
        padding: 16px;
        border-radius: 16px;
        background: #102a43;
        color: white;
      }
      .muted {
        color: #627d98;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Production Bundle Stats</h1>
      <p class="muted">Generated from the latest Vite build output.</p>
      <div class="summary">
        <div class="card">
          <strong>JS chunks</strong>
          <div>${jsFiles.length}</div>
        </div>
        <div class="card">
          <strong>Total JS size</strong>
          <div>${(totalSize / 1024).toFixed(2)} KB</div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Chunk</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>
          ${rows || '<tr><td colspan="2">No JavaScript assets found.</td></tr>'}
        </tbody>
      </table>
    </main>
  </body>
</html>
`;

fs.writeFileSync(outputFile, html, 'utf8');
console.log(`Generated ${path.relative(rootDir, outputFile)} from ${jsFiles.length} JS assets.`);
