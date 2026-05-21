const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory() && item !== 'node_modules' && item !== '.next') {
      results = results.concat(walk(full));
    } else if (full.endsWith('.jsx') || full.endsWith('.js')) {
      results.push(full);
    }
  }
  return results;
}

const srcDir = path.join(__dirname, 'src');
const files = walk(srcDir);
let changed = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;

  // 1. Replace standalone Link import from react-router-dom
  if (content.includes("import { Link } from 'react-router-dom'")) {
    content = content.replace(/import \{ Link \} from 'react-router-dom'/g, "import Link from 'next/link'");
    modified = true;
  }

  // 2. Replace Link to= with href=
  if (content.includes('<Link to=')) {
    content = content.split('<Link to=').join('<Link href=');
    modified = true;
  }

  // 3. Replace useNavigate imports and usage
  if (content.includes("import { useNavigate } from 'react-router-dom'")) {
    content = content.replace("import { useNavigate } from 'react-router-dom'", "import { useRouter } from 'next/navigation'");
    content = content.replace(/const navigate = useNavigate\(\)/g, 'const router = useRouter()');
    // navigate('/path') -> router.push('/path')  navigate(-1) -> router.back()
    content = content.replace(/\bnavigate\((-1)\)/g, 'router.back()');
    content = content.replace(/\bnavigate\(/g, 'router.push(');
    modified = true;
  }

  // 4. Replace useParams import from react-router-dom
  if (content.includes("import { useParams } from 'react-router-dom'")) {
    content = content.replace("import { useParams } from 'react-router-dom'", "import { useParams } from 'next/navigation'");
    modified = true;
  }

  // 5. Handle combined imports like: import { useParams, Link } from 'react-router-dom'
  if (content.includes("from 'react-router-dom'")) {
    // Replace remaining react-router-dom imports with next/navigation equivalents
    content = content.replace(
      /import \{ ([^}]+) \} from 'react-router-dom'/g,
      (match, imports) => {
        const parts = imports.split(',').map(s => s.trim());
        const navImports = [];
        const linkImport = [];
        for (const p of parts) {
          if (p === 'Link') linkImport.push(p);
          else navImports.push(p
            .replace('useNavigate', 'useRouter')
            .replace('useLocation', 'usePathname')
          );
        }
        const lines = [];
        if (linkImport.length > 0) lines.push("import Link from 'next/link'");
        if (navImports.length > 0) lines.push(`import { ${navImports.join(', ')} } from 'next/navigation'`);
        return lines.join('\n');
      }
    );
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(file, content, 'utf8');
    changed++;
    process.stdout.write('Updated: ' + path.relative(srcDir, file) + '\n');
  }
}

process.stdout.write('Total files updated: ' + changed + '\n');
