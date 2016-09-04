const path = require('path');
const fs = require('fs');
const m = require('match-file-utility');
const pkg = JSON.parse(fs.readFileSync('package.json'));
const config = pkg.gruntBuild;
const _ = require('lodash');
const linkLicense = require('./linkLicense');

const padLeft = require('../lib/padLeft');
const padRight = require('../lib/padRight');

function capitalCase(string) {
  let spaced = string.trim().replace(/-|_/g, ' ').split(' ');
  let s = spaced.map(function (a) {
    return /^[A-Z]/.test(a) ? a : a[0].toUpperCase() + a.substr(1).toLowerCase();
  }).join(' ');

  return s[0].toUpperCase() + s.slice(1);
}

function exists(file) {
  try {
    fs.statSync(file);
    return true;
  } catch(e) {
    return false;
  }
}

function task(callback) {
  const test = require('../../test/');

  const source = config.isSite
    ? 'src/application/readme/'
    : 'src/readme/';

  let description = source + 'description.md';
  let notes = source + 'notes.md';
  let example = source + 'example.md';
  let installation = source + 'installation.md';
  let content = m(source + 'content/', /\.md$/);

  let hasDescription = exists(description);
  let hasNotes = exists(notes);
  let hasExample = exists(example);
  let hasInstallation = exists(installation);

  let text = [];

  test.silence();

  test.then(function (test_results) {
    text.push('# ' + capitalCase(pkg.name) + ' ' + pkg.version);

    text.push('#### License: ' + linkLicense(pkg.license || 'MIT'));

    text.push('');

    if (test_results.int_passed === test_results.int_total) {
      text.push('#### ✅ All ' + test_results.int_total + ' tests pass');
    } else {
      text.push('#### 🚫 ' + test_results.int_passed + ' of ' + test_results.int_total + ' tests passed (' + Math.round((test_results.int_passed / test_results.int_total) * 100) + '%)');
    }

    text.push('', '## Table of Contents');

    text.push('', '#### Overview', '');

    text.push('- [Description](#description)');

    if (hasInstallation) {
      text.push('- [Installation](#installation)');
    }

    if (hasNotes) {
      text.push('- [Notes](#notes)');
    }

    if (hasExample) {
      text.push('- [Example](#example)');
    }

    if (content.length) {
      text.push('', '#### Content', '');
    }

    content.forEach(function (a) {
      let name = path.basename(a).replace(/\.md$/, '');
      text.push('- [' + name + '](#' + _.kebabCase(name.toLowerCase()) + '--top)');
    });

    text.push('', '## Description', '');

    if (hasDescription) {
      text.push(fs.readFileSync(description, 'utf8'));
    } else {
      text.push('No description provided');
    }

    if (hasInstallation) {
      text.push('', '## Installation', '');
      text.push(fs.readFileSync(installation, 'utf8'));
    }

    if (hasNotes) {
      text.push('', '## Notes', '');
      text.push(fs.readFileSync(notes, 'utf8'));
    }

    if (hasExample) {
      text.push('', '## Example', '');
      text.push(fs.readFileSync(example, 'utf8'));
    }

    text.push('');

    content.forEach(function (a) {
      let string = fs.readFileSync(a, 'utf8');
      let name = path.basename(a).replace(/\.md$/, '');
      text.push('### ' + name + ' ... \([top](#table-of-contents)\)');
      text.push('');
      text.push(string);
    });

    text.push('', '## Tests');

    text.push('', '```');

    for (var k in test_results.passed) {
      text.push(
        padLeft(test_results.passed[k].index, 5, ' ') + '. ' + padRight(test_results.passed[k].name, 68, '.') + ' ✅'
      );
    }

    for (k in test_results.failed) {
      text.push(
        '\n' + padLeft(self.failed[k].index + '. ', 6, ' ') + padRight(self.failed[k].name + ' ', 66, '.') + ' 🚫' +
        '\n +' + ' Expected: ' + padLeft(typeToString(self.failed[k].b), 66, ' ') +
        '\n -' + '   Actual: ' + padLeft(typeToString(self.failed[k].a), 66, ' ')
      );
    }

    text.push('```', '');

    fs.writeFileSync('README.md', text.join('\n'));

    callback();
  });
}

module.exports = {
  glob : ['src/readme/**/*.md'],
  task : task
};
