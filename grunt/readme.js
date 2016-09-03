const path = require('path');
const fs = require('fs');
const m = require('match-file-utility');
const pkg = JSON.parse(fs.readFileSync('package.json'));
const config = pkg.gruntBuild;
const _ = require('lodash');

function capitalCase(string) {
  var spaced = string.trim().replace(/-|_/g, ' ').split(' ');
  var s = spaced.map(function (a) {
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
  const test = require('../test/');

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

  test.then(function (object) {
    text.push('# ' + capitalCase(pkg.name) + ' ' + pkg.version);
    text.push('#### License: ' + pkg.license || 'MIT License');

    text.push('');

    if (object.passed === object.total) {
      text.push('#### ✅ All ' + object.total + ' tests pass');
    } else {
      text.push('#### 🚫 ' + object.passed + ' of ' + object.total + ' tests passed (' + Math.round((object.passed / object.total) * 100) + '%)');
    }

    text.push('');

    text.push('## Table of Contents');

    text.push('');
    text.push('#### Overview');
    text.push('');

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
      text.push('');
      text.push('#### Content');
      text.push('');
    }

    content.forEach(function (a) {
      var name = path.basename(a).replace(/\.md$/, '');
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
      text.push('');
      text.push('## Notes');
      text.push('');
      text.push(fs.readFileSync(notes, 'utf8'));
    }

    if (hasExample) {
      text.push('');
      text.push('## Example');
      text.push('');
      text.push(fs.readFileSync(example, 'utf8'));
    }

    text.push('');

    content.forEach(function (a) {
      var string = fs.readFileSync(a, 'utf8');
      var name = path.basename(a).replace(/\.md$/, '');
      text.push('### ' + name + ' ... \([top](#table-of-contents)\)');
      text.push('');
      text.push(string);
    });

    fs.writeFileSync('README.md', text.join('\n'));

    callback();
  });
}

module.exports = {
  glob : ['src/readme/**/*.md'],
  task : task
};
