Aurumjs is a DOM rendering library inspired by react and angular.

## Getting started

Install:

> $ npm install aurumjs

To use Aurum you need to compile JSX or TSX using a transpiler such as typescript, vite, esbuild or any of the other many options.

#### With typescript or a typescript compatible transpiler

In tsconfig.json put the jsxFactory option

```json
    "compilerOptions": {
        "jsxFactory": "Aurum.factory"
        "jsxFragmentFactory": "Aurum.Fragment"
    }
```

### With vite

In your vite.config.js put the esbuild options

```javascript
import { defineConfig } from 'vite';

export default defineConfig({
    esbuild: {
        jsxFactory: 'Aurum.factory',
        jsxFragment: 'Aurum.Fragment'
    }
});
```

#### With Babel

Example .babelrc

```json
{
    "presets": ["@babel/preset-env"],
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

#### To render with aurum you can attach it to a DOM element like this:

```tsx
import { Aurum } from 'aurumjs';

Aurum.attach(<div>Hello world</div>, document.body);
```

#### Seed project

You can copy this seed project to get started:

https://github.com/CyberPhoenix90/aurum-seed-typescript
