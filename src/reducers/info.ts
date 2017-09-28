import { Reducer } from 'redux'

export type State = Readonly<{
  info: {
    name: string
    description: string
    version: string
  }
}>

const pkg = require('../../package.json')
const info = {
  name: pkg.name,
  version: pkg.version,
  description: pkg.description
}

export const reducer: Reducer<State['info']> = (state = info) => {
  return state
}
