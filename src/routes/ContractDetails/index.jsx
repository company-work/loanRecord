module.exports = {
  path: 'contractDetails/:contractId',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/index'))
    })
  }
};
