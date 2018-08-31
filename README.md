# babel-preset-wix

This plugins combines some commonly used Babel presets ans plugins.

Presets:

* babel-preset-env
* babel-preset-react
* babel-preset-stage-2

Plugins:

* babel-plugin-syntax-dynamic-import
* babel-plugin-transform-decorators-legacy
* babel-plugin-transform-dynamic-import _(testing environment only)_

## Installation

```bash
npm install --save babel-preset-wix
```

## Usage

To use `babel-preset-wix` your `.babelrc` file should look like this

```json
{"presets": ["wix"]}
```

### ES Modules

By default `babel-preset-wix` compiles modules to commonjs format.

if you want to skip module compilation and keep imports/exports, you can add `module` property to your `package.json` file.

```json
{
  "module": "dist/src/index.js"
}
```

### Loose mode

There's also a *loose* flavour of this plugin, which enables `loose` and `useBuiltIns` options of `babel-preset-env`.

```json
{"presets": ["wix/loose"]}
```
