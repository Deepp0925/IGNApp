import Animated, {Easing} from 'react-native-reanimated';

const {
  Value,
  clockRunning,
  startClock,
  stopClock,
  cond,
  concat,
  block,
  set,
  timing,
} = Animated;

export function RunInfinite(
  clock: Animated.Clock,
  value: number,
  dest: number,
  duration: number = 1000,
) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration,
    toValue: new Value(0),
    easing: Easing.linear,
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, [
      // we stop
      stopClock(clock),

      // set flag ready to be restarted
      set(state.finished, 0),
      // same value as the initial defined in the state creation
      set(state.position, 0),

      // very important to reset this ones !!! as mentioned in the doc about timing is saying
      set(state.time, 0),
      set(state.frameTime, 0),

      // and we restart
      startClock(clock),
    ]),
    state.position,
  ]);
}

export function RunAnimation(
  clock: Animated.Clock,
  duration: number,
  value: number | Animated.Value<number>,
  dest: number,
  easingFunc: Animated.EasingFunction = Easing.linear,
) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration,
    toValue: new Value(0),
    easing: easingFunc,
  };

  return block([
    cond(
      clockRunning(clock),
      [
        // if the clock is already running we update the toValue, in case a new dest has been passed in
        set(config.toValue, dest),
      ],
      [
        // if the clock isn't running we reset all the animation params and start the clock
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock),
      ],
    ),
    // we run the step here that is going to update position
    timing(clock, state, config),
    // if the animation is over we stop the clock
    cond(state.finished, stopClock(clock)),
    // we made the block return the updated position
    state.position,
  ]);
}
