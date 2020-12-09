module.exports = {
    "extends": "eslint:recommended",
    "env": {
        "es6": true,
        "browser": true
    },
    //"parser": "babel-eslint", 
    "parserOptions": {
        "sourceType": "module", // allows import and export
        "ecmaVersion": 7
    },
    "rules": {
         "no-console": "off"
    },
    "globals": {
        "console": "readonly",
        "require": "readonly",
        "process": "readonly",
        "module": "readonly",
        "__dirname": "readonly",

    }
}