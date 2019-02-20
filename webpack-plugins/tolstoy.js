const transpileMap = {
  'константа': 'const',
  'консоль': 'console',
  'сообщить': 'log',
  'предупредить': 'warn',
  'ошибка': 'error',
  'вернуть': 'return',
  'Математика': 'Math',
  'пол': 'floor',
  'случайно': 'random',
  'функция': 'function',
  'переменная': 'let',
}

var transliterationMap = { "Ё": "YO", "Й": "I", "Ц": "TS", "У": "U", "К": "K", "Е": "E", "Н": "N", "Г": "G", "Ш": "SH", "Щ": "SCH", "З": "Z", "Х": "H", "Ъ": "", "ё": "yo", "й": "i", "ц": "ts", "у": "u", "к": "k", "е": "e", "н": "n", "г": "g", "ш": "sh", "щ": "sch", "з": "z", "х": "h", "ъ": "", "Ф": "F", "Ы": "I", "В": "V", "А": "A", "П": "P", "Р": "R", "О": "O", "Л": "L", "Д": "D", "Ж": "ZH", "Э": "E", "ф": "f", "ы": "i", "в": "v", "а": "a", "п": "p", "р": "r", "о": "o", "л": "l", "д": "d", "ж": "zh", "э": "e", "Я": "Ya", "Ч": "CH", "С": "S", "М": "M", "И": "I", "Т": "T", "Ь": "", "Б": "B", "Ю": "YU", "я": "ya", "ч": "ch", "с": "s", "м": "m", "и": "i", "т": "t", "ь": "", "б": "b", "ю": "yu" }

const translate = (text, map) => Object.entries(map).reduce((acc, [key, value]) => {
  const regex = new RegExp(key, 'g')
  return acc.replace(regex, value)
}, text)

const extractStringLiterals = text => {
  const literalsMap = text
    .match(/\'.+\'/g)
    .reduce((acc, next, idx) => {
      acc[next] = `!!STRING${idx}!!`;
      return acc
    }, {})
  return {
    literalsMap,
    text: translate(text, literalsMap)
  }
}

function loader(source) {
  // const options = getOptions(this);

  // validateOptions(schema, options, 'Example Loader');

  const stringLiterals = extractStringLiterals(source)

  const keywordsTranspiled = translate(stringLiterals.text, transpileMap)
  const translated = translate(keywordsTranspiled, transliterationMap)

  const reversedLiteralsMap = Object.entries(stringLiterals.literalsMap).reduce((acc, [key, value]) => {
    acc[value] = key
    return acc
  }, {})

  const withStringLiterals = translate(translated, reversedLiteralsMap)

  return withStringLiterals
}

module.exports = loader