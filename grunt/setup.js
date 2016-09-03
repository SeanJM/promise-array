const fs = require('fs');
const config = JSON.parse(fs.readFileSync('package.json')).gruntBuild;

try {
  fs.statSync('src/');
} catch (e) {
  fs.mkdirSync('src/');

  // Include an empty boilerplate test file (these comments are almost unnecessary)
  fs.mkdirSync('test/');
    fs.writeFileSync(
      'test/index.js',
      fs.readFileSync('test/boilerplate.js', 'utf8')
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

    fs.mkdirSync('src/application/');

    fs.mkdirSync('src/application/scripts');
    fs.mkdirSync('src/application/scripts/constants');
    fs.mkdirSync('src/application/scripts/custom');
    fs.mkdirSync('src/application/scripts/init');
    fs.mkdirSync('src/application/scripts/predicates');
    fs.mkdirSync('src/application/scripts/vendor');
    fs.mkdirSync('src/application/scripts/exports');

    fs.mkdirSync('src/application/styles');
    fs.mkdirSync('src/application/styles/constants');
    fs.mkdirSync('src/application/styles/custom');
    fs.mkdirSync('src/application/styles/functions');
    fs.mkdirSync('src/application/styles/placeholders');
    fs.mkdirSync('src/application/styles/vendor');

    fs.mkdirSync('src/application/components');
    fs.mkdirSync('src/application/containers');
    fs.mkdirSync('src/application/images');
    fs.mkdirSync('src/application/fonts');

    fs.mkdirSync('src/flatman/');
    fs.mkdirSync('src/flatman/pages');
    fs.mkdirSync('src/flatman/components');
    fs.mkdirSync('src/flatman/content');
  } else {
    // Set up the folder structure for plugins
    fs.mkdirSync('src/vendor/');
    fs.mkdirSync('src/custom/');
    fs.mkdirSync('src/constants/');
    fs.mkdirSync('src/predicates/');
    fs.mkdirSync('src/init/');
    fs.mkdirSync('src/exports/');
    fs.mkdirSync('src/readme/');

    fs.writeFileSync(
      'src/readme/description.md',
      '<!--' +
      '  Describe to the world what you toiled over. You magnificent being.' +
      '  (The title \'Is going to be generated\')' +
      '-->'
    );
  }
}
