import React, { Component } from 'react';
import {Redirect, Link}           from 'react-router-dom';

import RaisedButton         from 'material-ui/RaisedButton';
import SelectField          from 'material-ui/SelectField';
import MenuItem             from 'material-ui/MenuItem';

import db_com               from '../db_com';

export default class EventSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            selected_event: "",
            semester: "",
            redirect: false,
        }
    }

    componentWillMount() {
        //get event list
        this.updateEventList();
    }

    updateEventList() {
        db_com.get_event_list()
        .then(events => {
            this.setState({events});
        });
    }

    getEventList() {
        return this.state.events.map((event) => (
            <MenuItem key={event.event_id} value={event.event_id} primaryText={event.event_name + " " + event.semester_year} />
        ));
    }

    render() {
        this.updateEventList();
        var eventList = this.getEventList();
        return (
            <div className="wrapper">
                {this.state.redirect && 
                    <Redirect to={`checkin/` + this.state.selected_event}/>
                }
                <div className="card">

                    <SelectField
                    floatingLabelText="Event"
                    className={`card-item display-true`}
                    value={this.state.selected_event}
                    onChange={this.onSelect.bind(this)}>
                        {eventList}    
                    </SelectField>

                    <RaisedButton 
                    className="card-item"
                    onClick={this.onSubmit.bind(this)}
                    label={"Submit"}
                    primary />

                    <hr className="divider"/>
                    <Link to="/new">add an event</Link>
                </div>
            </div>
        )
    }

    onSubmit() {
        if(this.state.selected_event === "") {
            return;
        }
        this.setState({redirect: true});
        //do something with event_id
    }

    onSelect(event, index, value) {
        this.setState({selected_event: value});
    }
}