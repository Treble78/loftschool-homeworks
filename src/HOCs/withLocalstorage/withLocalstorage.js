import React, { Component } from 'react';
import { load, save } from '../../localstorage';

const withLocalstorage = (storageKey, notasks) => (WrappedComponent)  => {
    return class extends Component{
        state = {
            savedData: notasks
        }

        saveData = (task) => {

            const {savedData} = this.state;
            let dataArr = [];

            const isOldRecord = (record) => record.id === task.id

            if(!savedData){
                dataArr = [task]
            } 
            else if( savedData.findIndex(isOldRecord) !== -1) {
                dataArr = savedData.map(item => isOldRecord(item) ? task : item)
            } 
            else { dataArr = [...savedData, task] }

            save(storageKey, dataArr);
            this.setState({savedData: load(storageKey)})
        }

        componentDidMount() {
            this.setState({savedData: load(storageKey)})
        }

        render(){
            
            return (
                <WrappedComponent 
                    savedData={this.state.savedData} 
                    saveData={this.saveData} 
                    {...this.props}
                >
                </WrappedComponent>
            )
        }
    }
};

export default withLocalstorage;
