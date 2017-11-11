import React, { Component } from 'react';

export default class EventSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            selected_event: "",
            semester: "",
        }
    }
}