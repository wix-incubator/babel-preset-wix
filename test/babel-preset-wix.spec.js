const {expect} = require('chai');
const path = require('path');

describe('babel-preset-wix', () => {
  let pwd;
  beforeEach(() => pwd = process.cwd());
  afterEach(() => {
    delete require.cache[require.resolve('../index')];
    process.chdir(pwd);
  });

  it('should return env preset in development mode', () => {
    process.env.NODE_ENV = 'development';
    expect(require('../index')).to.eql({
      presets: [['env', {modules: 'commonjs'}], 'react', 'stage-2'],
      plugins: ['transform-decorators-legacy', 'syntax-dynamic-import']
    });
  });

  it('should return env preset in production mode', () => {
    process.env.NODE_ENV = 'production';
    expect(require('../index')).to.eql({
      presets: [['env', {modules: 'commonjs'}], 'react', 'stage-2'],
      plugins: ['transform-decorators-legacy', 'syntax-dynamic-import']
    });
  });

  it('should return env preset in test mode', () => {
    process.env.NODE_ENV = 'test';
    expect(require('../index')).to.eql({
      presets: [['env', {targets: {node: 'current'}, modules: 'commonjs'}], 'react', 'stage-2'],
      plugins: ['transform-decorators-legacy', 'syntax-dynamic-import', 'transform-dynamic-import']
    });
  });

  it('should prefer BABEL_ENV over NODE_ENV', () => {
    process.env.NODE_ENV = 'test';
    process.env.BABEL_ENV = 'development';
    expect(require('../index')).to.eql({
      presets: [['env', {modules: 'commonjs'}], 'react', 'stage-2'],
      plugins: ['transform-decorators-legacy', 'syntax-dynamic-import']
    });
  });

  it('should not transpile imports in case package declares module', () => {
    process.env.NODE_ENV = 'production';
    process.chdir(path.join(__dirname, 'es-modules-test-dir'));
    expect(require('../index')).to.eql({
      presets: [['env', {modules: false}], 'react', 'stage-2'],
      plugins: ['transform-decorators-legacy', 'syntax-dynamic-import']
    });
  });
});

