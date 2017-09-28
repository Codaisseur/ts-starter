import { combineReducers } from 'redux'

import { reducer as counterReducer, State as CounterState } from './counter'
import { reducer as infoReducer, State as InfoState } from './info'

interface StoreEnhancerState { }

export interface RootState extends StoreEnhancerState {
  counter: CounterState,
  info: InfoState
}

export const rootReducer = combineReducers<RootState>({
  counter: counterReducer,
  info: infoReducer
})

export const sanitizeState = ({ counter, info }: RootState): RootState => { // tslint-ignore-line no-shadowed-variable
  return { counter, info }
}
