export default function App({
  $target
}) {
  const initialState = {}
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState
    }
  }
}