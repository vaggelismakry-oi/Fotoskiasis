/* Copy the public website into a clean folder for deployment.

   `wrangler pages deploy .` uploads the whole working folder, so the
   maintenance scripts, CI workflow, editor settings and this README were all
   publicly served (/.tools/case-studies.mjs, /.github/workflows/deploy.yml,
   /README.md …). This copies everything except those. The folder is built
   outside the repository so the tools that walk the repo never meet a second
   copy of every page.

       node .tools/build-dist.mjs [outDir]    # default: <system temp>/fotoskiasis-dist
       npx --yes wrangler@4 pages deploy <outDir> --project-name=fotoskiasis-preview --branch=main --commit-dirty=true
                                                                              */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const root = path.resolve('.');
const out = path.resolve(process.argv[2] || path.join(os.tmpdir(), 'fotoskiasis-dist'));
if (!fs.existsSync(path.join(root, '_headers'))) throw new Error('run from the repository root');
if (out === root || out.startsWith(root + path.sep)) throw new Error('build outside the repository, not ' + out);

/* Not part of the website. Dotfiles and dot-folders (.git, .github, .tools,
   .claude, .wrangler, .gitignore, .nojekyll) are skipped at every level. */
const SKIP = new Set(['node_modules', 'README.md']);
const skip = (name) => name.startsWith('.') || SKIP.has(name);

fs.rmSync(out, { recursive: true, force: true });
let files = 0, bytes = 0;
(function copy(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    if (skip(entry.name)) continue;
    const src = path.join(from, entry.name), dst = path.join(to, entry.name);
    if (entry.isDirectory()) copy(src, dst);
    else if (entry.isFile()) { fs.copyFileSync(src, dst); files++; bytes += fs.statSync(src).size; }
  }
})(root, out);

for (const must of ['index.html', 'el/index.html', '_headers', '_redirects', 'sitemap.xml', 'robots.txt', '404.html']) {
  if (!fs.existsSync(path.join(out, must))) throw new Error('missing from the build: ' + must);
}
console.log('site files :', files, '(' + (bytes / 1048576).toFixed(1) + ' MB)');
console.log('built at   :', out);
