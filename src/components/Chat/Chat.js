import React, {Component} from "react";
import Message from "../Message"
import "./Chat.css"

class Chat extends Component {

    state = {messages:[],messageInput:''}

    changeInputMessage = (e) =>{

        this.setState({messageInput:e.target.value});

    }

    sendMessageOnEnter = (e) => {

        if(e.key === 'Enter'){

            this.setState(prevState => ({
            messages: [...prevState.messages, {text:this.state.messageInput}]
          }));

            this.setState({messageInput:''});
        } 

    }

    render(){
        return (

            <div className="chat">
            
                <div className="message-list">
                    <div className="messages">
                        {this.state.messages.map((m,i) => <Message key={i} text={m.text}/> )}
                    </div>
                </div>
                
                <input type="text" className="input-message" value={this.state.messageInput} 
                onChange={this.changeInputMessage} onKeyPress={this.sendMessageOnEnter} />
                 
                 
            </div>

        );
    }
}

export default Chat;