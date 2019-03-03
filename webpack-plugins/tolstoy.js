const { getOptions } = require('loader-utils')
const validateOptions = require('schema-utils')

const {
  extractStringLiterals,
  translate,
  keywordsMap,
  transliterationMap,
} = require('./helpers')

const schema = {
  type: 'object',
  properties: {
    test: {
      type: 'string'
    }
  }
}


function loader(source) {
  const options = getOptions(this)
  validateOptions(schema, options, 'Tolstoy Loader')

  // консоль.сообщить('Hi, FrontCon!') --> консоль.сообщить(!!STRING12!!)
  const { source: withoutStringLiterals, literalsMap } = extractStringLiterals(source)

  // константа фоо --> const фоо
  const withKeywordsTranspiled = translate(withoutStringLiterals, keywordsMap)

  // const фоо --> const foo
  const transliterated = translate(withKeywordsTranspiled, transliterationMap)

  // console.log(!!STRING12!!) --> console.log('Hi, FrontCon!')
  const withStringLiterals = translate(transliterated, literalsMap)

  return withStringLiterals
}

module.exports = loader