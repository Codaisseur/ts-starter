import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../reducers'

interface AppProps {
  name: string
  version: string
  description: string
}

const mapStateToProps = ({ info }: RootState['info']): AppProps => ({
  name: info.name,
  version: info.version,
  description: info.description
})

export class App extends React.PureComponent<AppProps> {
  render(): JSX.Element | false | null {
    const { name, version, description } = this.props

    return(
      <main>
        <h1>{name} - v{version}</h1>

        <p>{description}</p>

        <p>
          <a href='/index.json'>JSON format</a>
        </p>
      </main>
    )
  }
}

export default connect(mapStateToProps)(App)
