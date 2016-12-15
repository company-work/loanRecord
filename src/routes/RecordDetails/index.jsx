module.exports = {
  path: 'recordDetails/:loanReqNum',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/index'))
    })
  }
};
