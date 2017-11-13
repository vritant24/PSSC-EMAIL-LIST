import React, { Component } from 'react';
import AutoComplete         from 'material-ui/AutoComplete';
import db_com               from '../db_com';

export default class EventSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            selected_event: "",
            semester: "",
        }
    }

    componentWillMount() {
        //get event list
        db_com.get_event_list()
        .then(events => {
            this.setState({events});
        });
    }

    render() {
        return (
            <div className="wrapper">
                <div className="card">
                    <AutoComplete
                        className={`card-item`}
                        floatingLabelText="Event Name"/>
                </div>
            </div>
        )
    }
}