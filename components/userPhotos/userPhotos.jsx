import React from 'react';
import {
  Typography,
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton 
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { Link } from "react-router-dom";
import './userPhotos.css';
import fetchModel from "../../lib/fetchModelData";

const PHOTOS = "Photos of ";

/**
 * Define UserPhotos
 */
class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    let newUser;
    let newPhotos;
    this.state = {
      user: newUser,
      photos: newPhotos
    };
  }

  componentDidMount = () => {
    let newUserId = this.props.match.params.userId;
    let photoProm = fetchModel(`http://localhost:3000/photosOfUser/${newUserId}`);
    photoProm.then(response => {
      this.setState({photos: response.data});
      console.log('photo fetched');
      console.log(this.state.photos);
    });
    let userProm = fetchModel(`http://localhost:3000/user/${newUserId}`);
    userProm.then(response => {
      this.setState({user: response.data});
      console.log(this.state.user);
      console.log('user fetched');
      //this.props.changeView(DETAILS, `${this.state.user.first_name} ${this.state.user.last_name}`);
    });
  }

  render() {
    return (
      <Grid container justify="space-evenly" className="root">
        <Grid item xs={12}>
        <Typography variant="h3">
            {this.state.user.first_name} {this.state.user.last_name}&apos;s photos
        </Typography>
        </Grid>
        {this.state.photos.map(photo => (
          <Grid item xs={12} key={photo._id}>
            <Card className="card">
            <CardHeader
              avatar={
            <Avatar aria-label="recipe" className="avatar">
            R
            </Avatar>
          }
          action={
          <IconButton aria-label="settings">
          </IconButton>
        }
        title={`${this.state.user.first_name} ${this.state.user.last_name}`}
        subheader={photo.date_time}
      />
              <CardMedia
                className="media"
                component="img"
                image={`/images/${photo.file_name}`}
                title={this.state.user.first_name}
                />
                <CardActions>
                  <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                  </CardActions>
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  {photo.comments
                    ? photo.comments.map(comment => {
                        return (
                          <Grid container key={comment._id}>
                            <Grid item xs={2}>
                              {comment.date_time}
                            </Grid>
                            <Grid item xs={2}>
                              <Link to={`/users/${comment.user._id}`}>
                                {`${comment.user.first_name} ${comment.user.last_name}`}
                              </Link>
                            </Grid>
                            <Grid item xs={8}>
                              {comment.comment}
                            </Grid>
                          </Grid>
                        );
                      })
                    : null}
                </Typography>
              </CardContent>

            </Card>
          </Grid>
        )
        )}
      </Grid>
    );
  }
}

export default UserPhotos;
