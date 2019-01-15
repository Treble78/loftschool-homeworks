import React, { PureComponent } from 'react';
import Card from '../Card';
import './Todo.css';
import withLocalstorage from '../../HOCs/withLocalstorage';

class Todo extends PureComponent {
  
  state = {
    inputValue: ''
  };

  getId() {
    const { savedData } = this.props;
    if(!savedData) return 1;
    const biggest = savedData.reduce((acc, el) => Math.max(acc, el.id), 0);
    return biggest + 1;
  }

  handleChange = (e) => {
    this.setState({inputValue: e.target.value})
  };

  createNewTaskByEnter = (e) => {
    e.key === 'Enter' && this.createNewTask()
  };

  toggleTaskStatus = (task) => {
    const {saveData} = this.props;
    return () => {
      const updatedTask = {
        id: task.id,
        isComplete: !task.isComplete,
        text: task.text
      };
      saveData(updatedTask);
    }
  };

  createNewTask = () => {
    const {saveData} = this.props;
    const {inputValue} = this.state;
    if(inputValue) {
        const newTask = {
        id: this.getId(),
        isComplete: false,
        text: inputValue
      };
      
      this.setState({ inputValue: '' });
      saveData(newTask);
    }
    
  };

  renderEmptyTask = () => {
    return (
      <div className='todo-item t-todo'>Задач нет</div>
    )
  }

  renderTask = task => {
    return (
      <div className='todo-item t-todo' key={task.id}>
        <p className='todo-item__text'>{task.text}</p>
        <span 
          className='todo-item__flag t-todo-complete-flag'
          data-todo-id={task.id}
          onClick={this.toggleTaskStatus(task)}
        >
          {`[${task.isComplete ? 'x' : ' '}]`}
        </span>
      </div>
    )
  };

  render() {
    const {savedData} = this.props;
    const {inputValue} = this.state;
    return (
      <Card title='Список дел'>
        <div className='todo t-todo-list'>
          <div className='todo-item todo-item-new'>
            <input 
              className='todo-input t-input' 
              placeholder='Введите задачу' 
              onChange={this.handleChange}
              onKeyPress={this.createNewTaskByEnter}
              value={inputValue}
            />
            <span className='plus t-plus' onClick={this.createNewTask}>+</span>
          </div>
          {savedData ? 
            savedData.map((record) => this.renderTask(record) ) : 
            this.renderEmptyTask()}
        </div>
      </Card>
    )
  }
}

export default withLocalstorage('todo-app', [])(Todo);
