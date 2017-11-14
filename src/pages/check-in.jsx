import React, { Component } from 'react';
import RaisedButton         from 'material-ui/RaisedButton';
import TextField            from 'material-ui/TextField';
import Checkbox             from 'material-ui/Checkbox';
import SelectField          from 'material-ui/SelectField';
import MenuItem             from 'material-ui/MenuItem';
import {c}                  from './constants';
import db_com               from '../db_com';

export default class CheckIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            [c.email]         : "",
            [c.name]          : "",
            [c.major]         : "",  
            [c.email_list]    : false,
            [c.display]       : false,
            [c.email_error]   : false,
            [c.name_error]    : false,
            [c.years]         : [],
            [c.selected_year] : null,
            [c.event_id]      : null,
            [c.event]         : null, 

        }
        this.button_text = c.button_1;
        this.checkbox_id = c.checkbox_id;
    }

    
    componentWillMount() {
        db_com.get_years()
        .then(years => this.setState({years}));
        this.setState({[c.event_id] : 0, [c.event] : "Scavenger Hunt Fall 17"});
    }
    
    getSelectItems() {
        return this.state[c.years].map(y => (
            <MenuItem key={y.year_id} value={y.year_id} primaryText={y.year} />
        ))
    }

    render() {
        var selectList = this.getSelectItems();
        return (
            <div className="wrapper">
                <h2>{this.state.event}</h2>
                <div className="card">
                    <TextField 
                        key="1" 
                        className={`card-item`}
                        floatingLabelText="Purdue Email"
                        type="email"
                        errorText={(this.state[c.email_error]) && "Please enter a valid Purdue Email"}
                        onKeyPress={(!this.state[c.display]) && this.onKeypress.bind(this)}
                        onChange={this.onChangeInput.bind(this, c.email)}
                        value={this.state[c.email]} />
                    
                    <TextField 
                        key="2"
                        className={`card-item display-${this.state.display}`}
                        floatingLabelText="Full Name"
                        errorText={(this.state[c.name_error]) && "Please enter a valid name"}
                        onChange={this.onChangeInput.bind(this, c.name)} 
                        value={this.state[c.name]} />

                    <TextField 
                        key="3" 
                        className={`card-item display-${this.state.display}`}
                        floatingLabelText="Major"
                        onChange={this.onChangeInput.bind(this, c.major)}
                        value={this.state[c.major]} />

                    <SelectField
                        floatingLabelText="Year"
                        className={`card-item display-${this.state.display}`}
                        value={this.state[c.selected_year]}
                        onChange={this.onSelect.bind(this)}>
                            {selectList}
                      </SelectField>

                    <Checkbox 
                        key="4"
                        className={`card-item display-${this.state.display}`}
                        label="I want to receive emails about future PSSC events."
                        checked={this.state[c.email_list]} 
                        onCheck={this.onChangeCheckbox.bind(this)} />
                   
                    <RaisedButton 
                        className="card-item"
                        onClick={this.onSubmit.bind(this)}
                        label={this.button_text}
                        primary />
                </div>
            </div>
        )   
    }

    onSelect(event, index, value) {
        this.setState({[c.selected_year]: value});
    }

    onChangeCheckbox() {
        this.setState((prev) => ({
            [c.email_list]: !prev[c.email_list]
        }));
    }

    onChangeInput(id, e) {
        this.setState({
            [id]: e.target.value
        });
    }

    onSubmit() {
        if(!this.validEmail()) {
            this.setState({[c.email_error]: true})
            return;
        } else this.setState({[c.email_error]: false});
        
        if(!this.state[c.display]) {
            this.fetchUser();
            this.setState({
                [c.display]: true
            })
            this.button_text = c.button_2;
            return;
        }

        if(!this.validInputs()) {
            this.setState({[c.name_error]: true})
            return;
        } else this.setState({[c.name_error]: false});

        if (this.submitUser()) {
            this.resetState();
        }
    }

    validEmail() {
        var reg = /^([A-Za-z0-9_\-\.])+\@(purdue\.edu)$/;
        
        if (reg.test(this.state[c.email]) === false) {
            return false;
        }
        return true;
    }

    validInputs() {
        if(this.state[c.name].trim() === "") {
            return false;
        }
        //if name contains number false, else true
        return !/[^a-zA-z ]/i.test(this.state[c.name]);
    }

    onKeypress(e) {
        if (e.key === 'Enter') {
          this.onSubmit();
        }
    }

    fetchUser() {
        db_com.get_user(this.getUserId())
        .then(user => {
            this.setState({
                [c.name]: user.name,
                [c.major]: user.major,
                [c.email_list]: user.email_list,
                [c.selected_year]: user.year
            });
        })
    }

    submitUser() {
        return db_com.add_user(this.getUserId(), this.state[c.name], this.state[c.major], this.state[c.email_list], this.state[c.selected_year], this.state[c.event_id])
    }

    getUserId() {
        var user_email  = this.state[c.email];
        return user_email.substr(0, user_email.indexOf('@'));
    }

    resetState() {
        this.setState({
            [c.email]         : "",
            [c.name]          : "",
            [c.major]         : "",  
            [c.email_list]    : false,
            [c.display]       : false,
            [c.email_error]   : false,
            [c.name_error]    : false,
            [c.selected_year] : null,
        })
    }
}