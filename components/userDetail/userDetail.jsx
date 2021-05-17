import React from 'react';
import {
  Grid,
  Button,
  Typography
} from '@material-ui/core';

import {Link} from "react-router-dom";
import './userDetail.css';
import fetchModel from "../../lib/fetchModelData";

const DETAILS = "Info about ";

/**
 * Define UserDetail, a React componment of CS142 project #5
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    let newUser;
    this.state = {
      user: newUser
    }
  }

  componentDidMount = () => {
    let newUserId = this.props.match.params.userId;
    let prom = fetchModel(`http://localhost:3000/user/${newUserId}`);
    prom.then(response => {
      this.setState({user: response.data});
      console.log(this.state.user);
      this.props.changeView(DETAILS, `${this.state.user.first_name} ${this.state.user.last_name}`);
    });

  }

   componentDidUpdate = () => {
     let newUserId = this.props.match.params.userId;
    if (this.state.user._id !== newUserId) {
       let prom = fetchModel(`http://localhost:3000/user/${newUserId}`);
      prom.then(response => {
        let newUser = response.data;
         this.setState({user: newUser});
         this.props.changeView(DETAILS, `${this.state.user.first_name} ${this.state.user.last_name}`);
       });
     }
   }

  render() {
    return this.state.user ? (
      <Grid container spacing={8}>
        <Grid xs={6} item>
          <Typography variant="h3">
            {`${this.state.user.first_name} ${this.state.user.last_name}`}
          </Typography>
          <Typography variant="h5">
            {this.state.user.occupation} <br/>
            based in {this.state.user.location}
          </Typography>
          <Typography variant="body1">
            {this.state.user.description}
          </Typography>
        </Grid>
        <Grid xs={4} item>
          <Button variant="contained">
             <Link to={`/photos/${this.state.user._id}`}>
              See photos
             </Link>    
          </Button>          
        </Grid>
      </Grid>


    ) : (
      <div />
    );
  }
}

export default UserDetail;
