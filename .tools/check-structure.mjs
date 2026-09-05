/* Landmark tag balance check. Uses split() rather than regex so shell
   escaping can never corrupt the patterns. */
import fs from 'node:fs';
import path from 'node:path';

export function htmlPages(root = '.') {
  const out = [];
  (function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (['.git', '.tools', 'node_modules'].includes(entry.name)) continue;
      const p = path.posix.join(dir.split(path.sep).join('/'), entry.name);
      if (entry.isDirectory()) walk(p);
      else if (entry.name.endsWith('.html')) out.push(p.replace(/^\.\//, ''));
    }
  })(root);
  return out;
}

const count = (s, needle) => s.split(needle).length - 1;

const TAGS = ['main', 'header', 'footer', 'section', 'article', 'nav'];

if (process.argv[1] && process.argv[1].endsWith('check-structure.mjs')) {
  const pages = htmlPages('.');
  const problems = [];

  for (const file of pages) {
    const s = fs.readFileSync(file, 'utf8');
    for (const tag of TAGS) {
      const open = count(s, '<' + tag + '>') + count(s, '<' + tag + ' ');
      const close = count(s, '</' + tag + '>');
      if (open !== close) problems.push({ file, tag, open, close });
    }
  }

  const byTag = {};
  for (const p of problems) (byTag[p.tag] ||= []).push(p);

  console.log('pages checked:', pages.length);
  for (const [tag, list] of Object.entries(byTag)) {
    console.log('\n<' + tag + '> imbalance on ' + list.length + ' pages:');
    for (const p of list.slice(0, 6)) {
      console.log('   ' + p.file + '  open=' + p.open + ' close=' + p.close);
    }
    if (list.length > 6) console.log('   … and ' + (list.length - 6) + ' more');
  }
  if (!problems.length) console.log('\nAll landmark tags balanced.');
}
