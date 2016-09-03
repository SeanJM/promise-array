const fs = require('fs');
const config = JSON.parse(fs.readFileSync('package.json')).gruntBuild;

const root = config.isSite
  ? 'src/application/'
  : 'src/';

try {
  fs.statSync('src/');
} catch (e) {
  fs.mkdirSync('src/');

  // Include an empty boilerplate test file (these comments are almost unnecessary)
  fs.mkdirSync('test/');
    fs.writeFileSync(
      'test/index.js',
      fs.readFileSync('tinyTest/boilerplate.js', 'utf8')
    );

  // Include an empty README
  fs.writeFileSync(
    'README.md',
    ''
  );

  // Create a gitingore by default
  fs.writeFileSync(
    '.gitignore',
    'node_modules'
  );

  if (config.isSite) {
    // Set up the folder structure for sites
    fs.mkdirSync('src/shared/');

    fs.mkdirSync(root);

    fs.mkdirSync(root + 'scripts');
    fs.mkdirSync(root + 'scripts/constants');
    fs.mkdirSync(root + 'scripts/custom');
    fs.mkdirSync(root + 'scripts/init');
    fs.mkdirSync(root + 'scripts/predicates');
    fs.mkdirSync(root + 'scripts/vendor');
    fs.mkdirSync(root + 'scripts/exports');

    fs.mkdirSync(root + 'styles');
    fs.mkdirSync(root + 'styles/constants');
    fs.mkdirSync(root + 'styles/custom');
    fs.mkdirSync(root + 'styles/functions');
    fs.mkdirSync(root + 'styles/placeholders');
    fs.mkdirSync(root + 'styles/vendor');

    fs.mkdirSync(root + 'components');
    fs.mkdirSync(root + 'containers');
    fs.mkdirSync(root + 'images');
    fs.mkdirSync(root + 'fonts');

    fs.mkdirSync('src/flatman/');
    fs.mkdirSync('src/flatman/pages');
    fs.mkdirSync('src/flatman/components');
    fs.mkdirSync('src/flatman/content');
  } else {
    // Set up the folder structure for plugins
    fs.mkdirSync(root + 'vendor/');
    fs.mkdirSync(root + 'custom/');
    fs.mkdirSync(root + 'constants/');
    fs.mkdirSync(root + 'predicates/');
    fs.mkdirSync(root + 'init/');
    fs.mkdirSync(root + 'exports/');
    fs.mkdirSync(root + 'readme/');
  }

  fs.writeFileSync(
    root + 'readme/description.md',
    '<!--' +
    '\n  Describe to the world what you toiled over. You magnificent being.' +
    '\n  (The title \'Is going to be generated\')' +
    '\n-->'
  );

  fs.writeFileSync(
    root + 'readme/notes.md',
    '\n<!--' +
    '\n  Anything \'notable\' that the user should know' +
    '\n-->'
  );

  if (!congig.isSite) {
    fs.writeFileSync(
      root + 'readme/example.md',
      '\n<!--' +
      '\n  An brief example which showcases your plugin' +
      '\n-->'
    );

    fs.writeFileSync(
      root + 'readme/installation.md',
      '\n<!--' +
      '\n  Installation instructions' +
      '\n-->'
    );
  }
}
