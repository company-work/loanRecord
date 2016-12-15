module.exports = {
  path: 'loanContract/:reqNum',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/index'))
    })
  }
};
