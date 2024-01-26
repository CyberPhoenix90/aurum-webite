Aurumjs is a DOM rendering library inspired by react and angular.

## Getting started

Install:

> $ npm install aurumjs

To use Aurum you need to compile JSX or TSX using a transpiler such as typescript, vite, esbuild or any of the other many options.

### With Babel

Example .babelrc

```
{
  "presets": [
    "@babel/preset-env",
  ],
  "plugins": [
    [
      "@babel/transform-react-jsx",
      {
        "pragma": "Aurum.factory",
        "pragmaFrag": "Aurum.Fragment"
      }
    ]
  ]
}
```

### With typescript or a typescript compatible transpiler

In tsconfig.json put the jsxFactory option

```
    "compilerOptions": {
        "jsxFactory": "Aurum.factory"
        "jsxFragmentFactory": "Aurum.Fragment"
    }
```
