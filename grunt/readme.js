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
        text.push('***');
        text.push('');

        text.push('### Tests');

        text.push(
          '<span style="display: inline-block; width: 100px; position: relative; height: 30px; background: rgb(220, 225, 236)">' +
            '<span style="width: ' + object.passed / object.total + '%; background: rgb(0, 195, 100); height : 100%;"></span>' +
            '<span style="width: ' + object.failed / object.total + '%; background: rgb(195, 0, 100); height : 100%;"></span>' +
          '</span>'
        );

        text.push('');
        text.push('- Passed: ' + object.passed);
        text.push('- Failed: ' + object.failed);

        text.push('');
        text.push('***');
        text.push('');

        text.push('## Description');

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

        text.push('## Table of Contents (' + content.length + ')');

        content.forEach(function (a) {
          var name = path.basename(a).replace(/\.md$/, '');
          text.push('- [' + name + '](#' + _.kebabCase(name) + '-top)');
        });

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
