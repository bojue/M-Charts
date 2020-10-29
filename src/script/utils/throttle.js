export function throttle(fn, time) {
    let _lastTime = null;
    return function () {
      let _nowTime = + new Date()
      if (_nowTime - _lastTime > time || !_lastTime) {
        fn();
        _lastTime = _nowTime
      }
    }
};
