module.exports = {
  path: 'contractSign',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/index'))
    })
  }
};
