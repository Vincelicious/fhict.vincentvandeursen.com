const mix = require('laravel-mix');
require('laravel-mix-purgecss');

mix.js('src/js/alethkar.js', 'js')
mix.postCss('src/css/alethkar.css', 'css', [
  require('postcss-import'),
  require('postcss-nested'),
  require('tailwindcss'),
  require('autoprefixer'),
])

if (mix.inProduction()) {
  mix.version();
  mix.purgeCss({
    folders: ['templates', 'layouts', 'partials', 'resources'],
    // whitelist: ['a', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'ol', 'ul', 'li'],
    whitelistPatternsChildren: [/^content$/],
  });
}
