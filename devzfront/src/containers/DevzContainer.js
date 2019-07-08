import React, {Fragment} from 'react';
import HeaderBox from './HeaderBox'
import NavBar from '../components/NavBar'
import DevzSelectionBox from './DevzSelectionBox'
import DevzProfileBox from './DevProfileBox'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import DevProfileBox from './DevProfileBox';
import AddDevBox from './AddDevBox';

class DevzContainer extends React.Component{
constructor(props){
  super(props)
  this.state = {
    developers: [],
    filteredDevelopers: [],
    searchState: 0,
    skillSearch: undefined,
    locationSearch: undefined
  }
  this.getSkill = this.getSkill.bind(this);
  this.filter = this.filter.bind(this);
  this.getLocation = this.getLocation.bind(this);
}


  componentDidMount() {
    fetch("http://localhost:8080/developers")
      .then(res => res.json())
      .then((data) => {
        const newData = data._embedded.developers
        const promises = newData
        Promise.all(promises)
          .then((results) => {
            this.setState({ developers: results});
          });
      });
    }

  getSkill (searchTerm) {
    this.setState( 
     {skillSearch: searchTerm},this.filter );
  }

  getLocation (searchTerm) {
    this.setState(
      {locationSearch: searchTerm},this.filter);
  }


  filter() {
    let skillSearch = this.state.skillSearch
    let locationSearch = this.state.locationSearch
    if ((skillSearch !== undefined && locationSearch !== undefined) && (skillSearch !== "" && locationSearch !== "")){
      fetch(`http://localhost:8080/developers/${skillSearch}/${locationSearch}`)
        .then(res => res.json())
        .then((data) => {
          console.log(data)
          if(data.length > 0){
            this.setState({ developers: data});
          }
        });
  }
  else if (skillSearch !== undefined && skillSearch !== ""){     
    let lowerSearch = this.state.skillSearch.toLowerCase();
      fetch(`http://localhost:8080/developers/skill/${lowerSearch}`)
        .then(res => res.json())
        .then((data) => {
          if (data.length > 0) {
            this.setState({ developers: data });
          }
        });
      }
  else if (locationSearch !== undefined && locationSearch !== "") {
        let lowerSearch = this.state.locationSearch.toLowerCase();
        fetch(`http://localhost:8080/developers/${lowerSearch}`)
          .then(res => res.json())
          .then((data) => {
            if (data.length > 0) {
              this.setState({ developers: data });
            }
          });
        }
  }

  render (){
    return(
      <Router>
        <React.Fragment>
          <NavBar />
          <Route 
              exact path="/"
              render={() => {
                return (
                  <React.Fragment>
                    <HeaderBox getSkill={this.getSkill} getLocation={this.getLocation} />
                    <DevzSelectionBox
                      dataOnLoad={this.state.developers}
                      filteredData={this.state.filteredDevelopers}
                    />
                  </React.Fragment>
                )
              }} 
            />
          <Route exact path="/dev-profile" component={DevProfileBox}/>
          <Route path="/add-developer" component={AddDevBox}/>
        </React.Fragment>
      </Router>
    )
  }

}

export default DevzContainer;
