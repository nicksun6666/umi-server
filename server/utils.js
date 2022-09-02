module.exports = {
  handleData: (data, res, successFn = () => {}, failFn = () => {}) => {
    if (data) {
      console.log('success');
      successFn()
    } else {
      console.log('fail');
      failFn()
    }
  },
}
