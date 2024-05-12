To configure babel for aurum set your .babelrc file to look like the following:

```json
{
    "presets": ["@babel/preset-env"],
    "plugins": [
        [
            "@babel/transform-react-jsx",
            {
                "pragma": "Aurum.factory"
            }
        ]
    ]
}
```

Aurum is written in typescript and provides declaration files that can be used in javascript to get good autocomplete.
