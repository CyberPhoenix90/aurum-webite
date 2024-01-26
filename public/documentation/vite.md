To use aurum with vite you can either use the typescript configuration linked [here](#/getting_started/typescript) or you use the vite config:

```javascript
import { defineConfig } from 'vite';

export default defineConfig({
    esbuild: {
        jsxFactory: 'Aurum.factory',
        jsxFragment: 'Aurum.Fragment'
    }
});
```
