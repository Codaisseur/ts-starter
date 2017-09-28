import { Reducer } from 'redux'
import { RootAction } from '../actions'
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter'

export type State = Readonly<{
  counter: number
}>

export const reducer: Reducer<State['counter']> = (state = 0, { type }: RootAction) => {
  switch (type) {
    case INCREMENT_COUNTER:
      return state + 1

    case DECREMENT_COUNTER:
      return state - 1

    default:
      return state
  }
}
