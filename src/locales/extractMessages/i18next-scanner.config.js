/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const stringfyTranslationObjects = require('./stringfyTranslations.js');

function parseContent(content, parser, shouldStringfyObjects = true) {
  let cleanedContent = content;
  if (shouldStringfyObjects) {
    cleanedContent = stringfyTranslationObjects(content);
  }
  parser.parseFuncFromString(cleanedContent);
}

module.exports = {
  input: ['src/app/**/**.{ts,tsx}', '!**/node_modules/**', '!src/app/**/*.test.{js,jsx}'],
  output: './',
  options: {
    debug: false,
    removeUnusedKeys: false,
    func: {
      list: ['t'],
      extensions: [''], // We dont want this extension because we manually check on transform function below
    },
    lngs: ['en', 'ar'],
    defaultLng: 'en',
    defaultNs: 'translation',
    resource: {
      loadPath: 'src/locales/{{lng}}/{{ns}}.json',
      savePath: 'src/locales/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    keySeparator: '.', // char to separate keys
    nsSeparator: ':', // char to split namespace from key
    interpolation: {
      prefix: '{{',
      suffix: '}}',
    },
  },
  transform: function transform(file, enc, done) {
    const extensions = ['.ts', '.tsx'];

    const { base, ext } = path.parse(file.path);
    if (extensions.includes(ext) && !base.includes('.d.ts')) {
      const content = fs.readFileSync(file.path, enc);
      const shouldStringfyObjects = base === 'messages.js';
      parseContent(content, this.parser, shouldStringfyObjects);
    }

    done();
  },
};

module.exports.parseContent = parseContent;
