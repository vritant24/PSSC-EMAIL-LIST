import React, { Component } from 'react';
import {Redirect}           from 'react-router-dom';

import RaisedButton         from 'material-ui/RaisedButton';
import AutoComplete         from 'material-ui/AutoComplete';

import db_com               from '../db_com';

export default class EventAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            selected_event: "",
            semester: "fall_17",
            redirect: false,
        }
    }

    componentWillMount() {
        //get event list
        db_com.get_event_list()
        .then(events => {
            this.setState({events});
        });
    }

    getEventList() {
        return this.state.events.map((event) => (
            event.event_name
        ));
    }

    render() {
        var eventList = this.getEventList();
        return (
            <div className="wrapper">
                {this.state.redirect && 
                    <Redirect to={`/`}/>
                }
                <div className="card">

                    <AutoComplete
                    floatingLabelText="Type event name"
                    searchText={this.state.searchText}
                    onUpdateInput={this.handleUpdateInput}
                    filter={AutoComplete.caseInsensitiveFilter}
                    dataSource={eventList} />

                    <h3>Fall 17</h3>

                    <RaisedButton 
                    className="card-item"
                    onClick={this.onSubmit.bind(this)}
                    label={"Submit"}
                    primary />
                </div>
            </div>
        )
    }


    handleUpdateInput = (searchText) => {
        this.setState({
          selected_event: searchText,
        });
      };
    
      handleNewRequest = () => {
        this.setState({
          selected_event: '',
        });
      };
    

    onSubmit() {
        if(this.state.selected_event.trim() === "") {
            return;
        }
        db_com.add_event(this.state.events.length, this.state.selected_event, this.state.semester)
        .then(e => (
            this.setState({redirect :true})
        ));
    }

    onSelect(event, index, value) {
        this.setState({selected_event: value});
    }
}