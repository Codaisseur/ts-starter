import * as React from 'react'
import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { RootState } from '../../reducers'
import { RootAction } from '../../actions'
import { actionCreators } from '../../actions/counter'

interface StaticCounterProps {
  counter: number
}

interface DispatchCounterProps {
  onIncrement: Function
  onDecrement: Function
}

const mapStateToProps = ({ counter }: RootState['counter']): StaticCounterProps => ({
  counter
})

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => bindActionCreators({
  onIncrement: actionCreators.incrementCounter,
  onDecrement: actionCreators.decrementCounter
}, dispatch);

export class Counter extends React.PureComponent<StaticCounterProps & DispatchCounterProps & any> {
  public render(): JSX.Element | false | null {
    const { counter } = this.props

    return(
      <div className='Counter'>
        <p>
          <button onClick={this.onDecrement.bind(this)}>-</button>
          { counter }
          <button onClick={this.onIncrement.bind(this)}>+</button>
        </p>
      </div>
    )
  }

  private onIncrement(): void {
    this.props.onIncrement()
  }

  private onDecrement(): void {
    this.props.onDecrement()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
