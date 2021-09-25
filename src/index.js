import React from 'react';
import ReactDOM from 'react-dom';

const root = document.querySelector('#root');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRenderForm: true,
      error: false
    }
  }

  handleUnmountButtonClick = () => {
    console.log('try unmount');
    this.setState({isRenderForm: false});
  }

  static getDerivedStateFromError(error) {
    console.log('getDerivedStateFromError');
    return {error: error};
  }

  componentDidCatch() {
    console.log('componentDidCatch');
  }

  render() {
    if (this.state.error) {
      return <div>Произошла ошибка</div>;
    }
    return this.state.isRenderForm && <Form getDerivedStateFromPropsResult="getDerivedStateFromPropsResult" handleUnmountButtonClick={this.handleUnmountButtonClick} />
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      disabled: false,
      unmount: false,
      shouldUpdate: true,
      isError: false
    }
    this.inputRef = React.createRef();
  }

  handleInputChange(evt) {
    const value = evt.target.value;
    this.setState({
      value,
      disabled: this.isReact(value),
    });
  }

  handleFocusButtonClick() {
    console.log(this.inputRef);
    this.inputRef.current.focus();
  }

  handleUpdateButtonClick() {
    console.log('try update');
    this.setState(this.state);
  }

  handleCheckboxChange = (evt) => {
    this.setState({shouldUpdate: evt.target.checked});
  }

  handleErrorButtonClick() {
    this.setState({isError: true});
  }

  isReact(str) {
    return str.toLowerCase().includes('react') || str.toLowerCase().includes('реакт');
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate');
    console.log('snapshot: ', snapshot);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  shouldComponentUpdate() {
    console.log('shouldComponentUpdate: ', this.state.shouldUpdate);
    return this.state.shouldUpdate;
  }

  static getDerivedStateFromProps(props) {
    console.log('getDerivedStateFromProps');
    return {
      getDerivedStateFromPropsResult: props.getDerivedStateFromPropsResult
    };
  }

  getSnapshotBeforeUpdate() {
    console.log('getSnapshotBeforeUpdate');
    return 'getSnapshotBeforeUpdateSnapshot';
  }

  render() {
    console.log('render');
    if (this.state.isError) {
      throw new Error('Error');
    }
    return (
      <form action="/" method="post">
        <input
          ref={this.inputRef}
          value={this.state.value}
          onChange={(evt) => this.handleInputChange(evt)}
          type="text" />
        <button type="submit" disabled={this.state.disabled}>Принять</button>
        <button type="button" onClick={() => this.handleFocusButtonClick()}>Фокус</button>
        <button type="button" onClick={() => this.handleUpdateButtonClick()}>Обновить</button>
        <button type="button" onClick={() => this.props.handleUnmountButtonClick()}>Удалить</button>
        <button type="button" onClick={() => this.handleErrorButtonClick()}>Генерировать ошибку</button>
        <input id="shouldUpdateCheckbox" type="checkbox" defaultChecked={true} onChange={(evt) => this.handleCheckboxChange(evt)} />
        <label htmlFor="shouldUpdateCheckbox">Обновлять ли компонент</label>
        <div>{this.state.getDerivedStateFromPropsResult}</div>
      </form>
    )
  }
}

ReactDOM.render(<App />, root);
