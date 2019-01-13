import React, { PureComponent } from 'react';
import Card from '../Card';
import './Todo.css';
import withLocalstorage from '../../HOCs/withLocalstorage';

class Todo extends PureComponent {
  state = {
    inputValue: ''
  };

  handleChange = event => {};
  createNewRecordByEnter = event => {};
  toggleRecordComplete = event => {};
  createNewRecord = () => {};
  renderEmptyRecord = () => {};
  renderRecord = () => {};

 render(){
   return false;
 }
}

export default withLocalstorage('todo-app', [])(Todo);
