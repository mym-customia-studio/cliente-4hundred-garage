/* Minificador de CSS sin dependencias.
   Uso: node herramientas/minificar-css.js
   Genera assets/css/<nombre>.min.css a partir de cada .css (no .min.css) de assets/css.
   Correrlo después de cada cambio de CSS; las páginas referencian los .min.css. */
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'assets', 'css');

function minificar(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')          // comentarios
    .replace(/\s*\n\s*/g, '')                    // saltos de línea e indentación
    .replace(/\s*([{};,>])\s*/g, '$1')           // espacios alrededor de { } ; , >
    .replace(/([^a-zA-Z0-9)])\s*:\s*/g, '$1:')   // espacio tras ":" en declaraciones (no dentro de calc ni selectores)
    .replace(/;}/g, '}')                         // punto y coma final
    .trim();
}

let total = 0;
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.css') || f.endsWith('.min.css')) continue;
  const origen = path.join(dir, f);
  const destino = path.join(dir, f.replace(/\.css$/, '.min.css'));
  const entrada = fs.readFileSync(origen, 'utf8');
  const salida = minificar(entrada);
  fs.writeFileSync(destino, salida);
  total++;
  console.log(f + ' -> ' + path.basename(destino) + ' (' + entrada.length + ' -> ' + salida.length + ' bytes)');
}
if (!total) console.log('No se encontraron .css en ' + dir);
