import React,{Component} from 'react'
import {getShowInfo} from  './api.js'

class Show extends Component {
    state = {
        showId:'',
        data:''
    }

    static getDerivedStateFromProps(nextProps,prevState){
        if (nextProps.showId != prevState.showId)
        {
            return {showId:nextProps.showId}
        }
        return null;
    }

    componentDidUpdate(prevProps,prevState){
        if (prevProps.showId !== this.props.showId){
            getShowInfo(this.props.showId).then(film=>this.setState({data:film}));
        }      
    }


    render(){
        const {showID,data} = this.state;
        return  (
        <div className="show">
            <img className="show-image" 
            src={data === '' ? '' : data.image.medium}/>
            <h2 className="show-labe t-show-name">
            {data === '' ? '' : data.name}
            </h2>
            <p className="show-text t-show-genre">
            <b>Жанр:</b>
            {data === '' ? '' : data.genres.join(',')}
            </p>
            <p className="show-text t-show-summary">
            {data === '' ? '' : data.summary}
            </p>
        </div>  
        );
    }
}

export default Show;