/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/**
 * This is custom intermediate function to convert translations objects to i18next resource strings
 * `i18next-scanner expects strings such like:
 *
 * <A>{('a.b')}</A>
 *
 * but translations object enables us to write the same thing as:
 *
 * <A>{t(translations.a.b)}</A>
 *
 * So, this function converts them into strings like the first one so that scanner recognizes
 */
// Recursively concatenate all the `variables` until we hit the imported translations object
function replaceTranslationObjectWithString(content, key, keyAsStringValue) {
  return content.replace(`_t(${key}`, `t(${keyAsStringValue}`);
}

function isImportedTranslationObject(content, key) {
  const pattern = `import {.*?${key}.*?} from.+locales/i18n.*`;
  return RegExp(pattern, 'gim').test(content);
}

function stringifyRecursively(content, key) {
  // eslint-disable-next-line prefer-const
  let [root, ...rest] = key.split('.');
  const pattern = `${root} =(.+?);`;
  const regex = RegExp(pattern, 'gim');
  const match = regex.exec(content);
  if (match && match.length > 1) {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const key = match[1].trim();
    root = stringifyRecursively(content, key);
  } else if (isImportedTranslationObject(content, root)) {
    root = null;
  }

  if (root != null) {
    return [root, ...rest].join('.');
  }
  return [...rest].join('.');
}
function stringfyTranslationObjects(content) {
  let contentWithObjectsStringified = content;
  const pattern = /_t\((.+?)[),]/gim;
  const matches = content.matchAll(pattern);
  for (const match of matches) {
    if (match.length < 1) {
      continue;
    }
    const key = match[1];
    let keyAsStringValue = '';
    if (["'", '"', '`'].some((x) => key.includes(x))) {
      keyAsStringValue = key;
    } else {
      keyAsStringValue = stringifyRecursively(content, key);
      keyAsStringValue = `'${keyAsStringValue}'`;
    }
    contentWithObjectsStringified = replaceTranslationObjectWithString(
      contentWithObjectsStringified,
      key,
      keyAsStringValue,
    );
  }
  return contentWithObjectsStringified;
}

module.exports = stringfyTranslationObjects;
