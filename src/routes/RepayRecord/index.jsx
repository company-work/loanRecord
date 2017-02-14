module.exports = {
  path: 'repayRecord/:reqNum',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/index'))
    })
  }
};
