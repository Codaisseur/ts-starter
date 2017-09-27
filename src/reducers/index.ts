import { combineReducers } from 'redux'

import { reducer as counter, State as CounterState } from './counter'
import { reducer as info, State as InfoState } from './info'

interface StoreEnhancerState { }

export interface RootState extends StoreEnhancerState {
  counter: CounterState,
  info: InfoState
}

export const rootReducer = combineReducers<RootState>({
  counter,
  info
})
