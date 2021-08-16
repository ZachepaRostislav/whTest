import { Component } from 'react';

// @material
import { Button, TextField, Grid, Container } from '@material-ui/core';

// styles
import '../../css/main.css';
import './form.css';

export default class Form extends Component {
  state = {
    name: '',
    text: '',
  }

  handler = () => {
    fetch('https://jordan.ashton.fashion/api/goods/30/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(response => {
        if (response.status === 200) {
          return 'Данные успешно отправлены';
        }

        return new Error(response.statusText);
      })


    this.setState({
      name: '',
      text: ''
    })
  }

  render() {

    return (
      <Container className="form-container" fixed maxWidth="sm">
        <form autoComplete="off" style={{ width: "100%", marginBottom: "10px", padding: "0 10%" }}>
          <Grid xs={12}
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
          >
            <TextField
              id="outlined-required"
              label="Enter Your name"
              variant="outlined"
              required="true"
              style={{ width: "100%" }}
              value={this.state.name}
              onChange={event => this.setState({ name: event.target.value })}
            />
            <TextField
              id="outlined-multiline-static"
              label="Enter Your comment"
              multiline
              rows={5}
              variant="outlined"
              required="true"
              value={this.state.text}
              onChange={event => this.setState({ text: event.target.value })}
              style={{ margin: "30px 0 20px", width: "100%" }} />

            <Grid xs={12}
              container
              direction="column"
              justifyContent="center"
              alignItems="flex-end">
              <Button
                variant="contained"
                color="secondary"
                style={{ padding: "15px 45px", textTransform: "uppercase" }}
                onClick={this.handler} >send</Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    )
  }
}
