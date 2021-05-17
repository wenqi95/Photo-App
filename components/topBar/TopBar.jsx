import React from 'react';
import {
  AppBar, Toolbar, Typography, Button
} from '@material-ui/core';
import {Link} from "react-router-dom";
import './TopBar.css';
import fetchModel from "../../lib/fetchModelData";
/**
 * Define TopBar, a React componment of CS142 project #5
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: this.props.view,
    }
    let prom = fetchModel("http://localhost:3000/test/info");
    prom.then(response => {
      this.setState({version: response.data.__v});
    });
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.view !== prevProps.view) {
      this.setState({
        view: this.props.view,
      });
      let prom = fetchModel("http://localhost:3000/test/info");
      prom.then(response => {
        this.setState({version: response.data.__v});
      });
    }
  }

  render() {
    return (
      <AppBar className="cs142-topbar-appBar" position="absolute">
        <Toolbar>
          <Typography variant="h5" color="inherit">
          <Button variant="contained">
             <Link to={`/`}>
              Home
             </Link>    
          </Button> 
          </Typography>
          <Typography variant="body1">
              version: {this.state.version}
          </Typography>
          <Typography variant="h5" color="inherit">
              {this.state.view}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
