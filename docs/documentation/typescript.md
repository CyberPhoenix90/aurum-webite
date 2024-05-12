To use aurum with typescript all you have to do is go to your tsconfig and set the jsxFactory option as follows:

```json
    "compilerOptions": {
        "jsxFactory": "Aurum.factory",
        "jsxFragmentFactory": "Aurum.Fragment"
    }
```

Aurum is fully written in typescript and ships with declaration files for a comfortable auto complete and type checking experience
