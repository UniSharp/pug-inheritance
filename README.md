# Pug Inheritance - Another Implementation by UniSharp

[![Build Status](https://travis-ci.org/UniSharp/pug-inheritance.svg?branch=master)](https://travis-ci.org/UniSharp/pug-inheritance)

Get files which include or extend the given [Pug](https://github.com/pugjs/pug) file.

## Installation

### Via npm

```bash
npm install @unisharp/pug-inheritance --save
```

### Via yarn

```bash
yarn add @unisharp/pug-inheritance
```

## Usage

```javascript
const PugInheritance = require('@unisharp/pug-inheritance');

let pugInheritance = new PugInheritance('resources/pug/**/*.pug');
```

### Inheritance files

```javascript
console.log(pugInheritance.getInheritance('resources/pug/layout/app.pug'));
```

#### Output

```
[
    'resources/pug/layout/app.pug',
    'resources/pug/index.pug',
    'resources/pug/page.pug'
]
```

## Integration with [gulp-pug](https://github.com/pugjs/gulp-pug)

See [@unisharp/gulp-pug-inheritance](https://github.com/UniSharp/gulp-pug-inheritance).

## License

[MIT](https://unisharp.mit-license.org/)
