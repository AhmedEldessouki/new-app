module.exports = {
  '*.js': ['eslint', 'npm t -- --watchAll=false'],
  '*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx)': [
    'prettier --write',
  ],
}
