// RootActions
import { Actions as CounterActions } from './counter'

export type RootAction =
  CounterActions[keyof CounterActions]
  // | ... more action types here
