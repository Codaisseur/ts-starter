import * as React from 'react'

interface AppProps {
  name: string
  version: number
  description: string
}

export default class App extends React.PureComponent<AppProps> {
  render(): JSX.Element {
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
