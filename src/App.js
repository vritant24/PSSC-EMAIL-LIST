import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import firebase from './firebase';
import CheckIn from './pages/check-in'

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { messages: [] }; // <- set up react state
  // }
  // componentWillMount(){
  //   /* Create reference to messages in Firebase Database */
  //   let messagesRef = firebase.database().ref('messages').orderByKey().limitToLast(100);
  //   messagesRef.on('child_added', snapshot => {
  //     /* Update React state when message is added at Firebase Database */
  //     let message = { text: snapshot.val(), id: snapshot.key };
  //     this.setState({ messages: [message].concat(this.state.messages) });
  //   })
  // }
  // addMessage(e){
  //   e.preventDefault(); // <- prevent form submit from reloading the page
  //   /* Send the message to Firebase */
  //   firebase.database().ref('messages').push( this.inputEl.value );
  //   this.inputEl.value = ''; // <- clear the input
  // }
  // render() {
  //   return (
  //     <form onSubmit={this.addMessage.bind(this)}>
  //       <input type="text" ref={ el => this.inputEl = el }/>
  //       <input type="submit"/>
  //       <ul>
  //         { /* Render the list of messages */
  //           this.state.messages.map( message => <li key={message.id}>{message.text}</li> )
  //         }
  //       </ul>
  //     </form>
  //   );
  // }

    render() {
      return (
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <CheckIn/>
        </MuiThemeProvider>
      )
    }
}

export default App;
