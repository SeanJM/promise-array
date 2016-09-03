const path = require('path');
const fs = require('fs');
const m = require('match-file-utility');
const pkg = JSON.parse(fs.readFileSync('package.json'));
const config = pkg.gruntBuild;
const _ = require('lodash');

module.exports = {
  glob : ['src/readme/**/*.md'],
  task : function () {
    const test = require('../test/');

    const source = config.isSite
      ? 'src/application/readme/'
      : 'src/readme/';

    let files = m(source, /\.md$/);

    let description = files.filter(a => /description\.md$/.test(a))[0];
    let content = files.filter(a => !/(description|example|notes)\.md$/.test(a));
    let notes = files.filter(a => /notes\.md$/.test(a))[0];
    let example = files.filter(a => /example\.md$/.test(a))[0];

    let text = [];

    test
      .silence()
      .then(function (object) {
        text.push('# ' + pkg.name.replace(/-|_/g, ' ' + pkg.version));
        text.push('#### License: ' + pkg.license || 'MIT License');

        text.push('');

        text.push('Tests passed ' + object.passed + ' of ' + object.total + ' (' + Math.round(object.passed / object.total * 100) + '%)');

        text.push('');
        text.push('***');
        text.push('');

        text.push('## Table of Contents');

        text.push('');
        text.push('#### Overview');
        text.push('');

        text.push('- [Description](#description)');

        if (notes) {
          text.push('- [Notes](#notes)');
        }

        if (example) {
          text.push('- [Example](#example)');
        }

        if (content.length) {
          text.push('');
          text.push('#### Content');
          text.push('');
        }

        content.forEach(function (a) {
          var name = path.basename(a).replace(/\.md$/, '');
          text.push('- [' + name + '](#' + _.kebabCase(name.toLowerCase()) + '--top)');
        });

        text.push('');
        text.push('## Description');
        text.push('');

        if (description) {
          text.push(fs.readFileSync(description, 'utf8'));
        } else {
          text.push('No description provided');
        }

        if (notes) {
          text.push('');
          text.push('## Notes');
          text.push('');
          text.push(fs.readFileSync(notes, 'utf8'));
        }

        if (example) {
          text.push('');
          text.push('## Example');
          text.push('');
          text.push(fs.readFileSync(example, 'utf8'));
        }


        text.push('');
        text.push('***');
        text.push('');

        content.forEach(function (a) {
          var string = fs.readFileSync(a, 'utf8');
          var name = path.basename(a).replace(/\.md$/, '');
          text.push('### ' + name + ' ... \([top](#table-of-contents)\)');
          text.push('');
          text.push(string);
        });

        fs.writeFileSync('README.md', text.join('\n'));
      });
  }
};
