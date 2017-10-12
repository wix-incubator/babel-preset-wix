const {expect} = require('chai');

describe('babel-preset-wix', () => {
  afterEach(() => delete require.cache[require.resolve('../index')]);

  it('should return env preset in development mode', () => {
    process.env.NODE_ENV = 'development';
    expect(require('../index')).to.eql({presets: ['env', 'react', 'stage-2']});
  });

  it('should return env preset in production mode', () => {
    process.env.NODE_ENV = 'production';
    expect(require('../index')).to.eql({presets: ['env', 'react', 'stage-2']});
  });

  it('should return env preset in test mode', () => {
    process.env.NODE_ENV = 'test';
    expect(require('../index')).to.eql({presets: [['env', {targets: {node: 'current'}}], 'react', 'stage-2']});
  });

  it('should prefer BABEL_ENV over NODE_ENV', () => {
    process.env.NODE_ENV = 'test';
    process.env.BABEL_ENV = 'development';
    expect(require('../index')).to.eql({presets: ['env', 'react', 'stage-2']});
  });
});

