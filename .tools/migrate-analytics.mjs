import fs from 'node:fs';
import path from 'node:path';

export function pages(root = '.') {
  const out = [];
  (function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (e.name === '.git' || e.name === '.tools' || e.name === 'node_modules') continue;
      const p = path.posix.join(d.split(path.sep).join('/'), e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith('.html')) out.push(p.replace(/^\.\//, ''));
    }
  })(root);
  return out;
}

if (import.meta.url === `file://${process.argv[1].split(path.sep).join('/')}` || process.argv[2] === 'run') {
  const files = pages('.');
  let ga = 0, gsc = 0;
  const untouched = [];
  for (const f of files) {
    const before = fs.readFileSync(f, 'utf8');
    let s = before;
    s = s.replace(/<script>\s*\(function\(\)\{var GA_ID[\s\S]*?<\/script>/, () => {
      ga++;
      return '<script src="/js/analytics.js" defer></script>';
    });
    s = s.replace(/<meta name="google-site-verification" content="REPLACE_WITH_YOUR_GSC_TOKEN">\s*/g, () => {
      gsc++;
      return '';
    });
    if (s !== before) fs.writeFileSync(f, s);
    else untouched.push(f);
  }
  console.log('pages scanned      :', files.length);
  console.log('GA blocks replaced :', ga);
  console.log('GSC metas removed  :', gsc);
  console.log('files untouched    :', untouched.length, untouched.slice(0, 5));
}
