import React, { Component, Fragment } from 'react';
import NewSkillForm from '../components/NewSkillForm'
import SkillList from '../components/SkillList';

class AddSkillBox extends Component {
    constructor(props) {
        super(props);
        this.handleSkillSubmit = this.handleSkillSubmit.bind(this);
    }

    handleSkillSubmit(newSkill) {
        console.log(newSkill);
        fetch('http://localhost:8080/skills',
            {
                method: 'POST',
                body: JSON.stringify(newSkill),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            // .then(res => res.json())
            // .then(returnData =>

    }

    render() {

        return (
            <Fragment>
                <h1>SKILLZ! Add!</h1>
                <NewSkillForm handleSkillSubmit={this.handleSkillSubmit}/>
            </Fragment>
        )
    }

}

export default AddSkillBox;
