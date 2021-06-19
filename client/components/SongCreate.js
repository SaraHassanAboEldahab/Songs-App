import React, { Component } from 'react'
import { graphql } from "react-apollo"
import gql from "graphql-tag"
import query from "../queries/fetchSongsList"
import { Link, hashHistory } from "react-router"


class SongCreate extends Component {

  constructor(props) {
    super(props)
    this.state = { title: "" }
  }

  onSubmit(e) {
    e.preventDefault()
    //when we call this.props.mutate it will invoke the function which is below (mutation)
    //and we will pass in it the configuration or query object which will have variables property which we use to pass all different query variables that we want to send to the mutation
    // console.log(this.props)
    this.props.mutate({
      variables: { title: this.state.title },
      //refetchQuery is an array which we can pass in it a list of queries which should rerun (refetch) after the mutation is successfully executed
      refetchQueries: [{ query: query }]
    }).then(() => hashHistory.push("/"))
  }
  render() {
    return (
      <div style={{ marginTop: "25px" }}>
        <Link to="/" className="">
          <h5>Back</h5>
        </Link>
        <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label><strong>Song Title:</strong></label>
          <input value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
        </form>
      </div>
    )
  }
}

const mutation = gql`
   mutation AddSong($title:String){
     addSong(title:$title){
      title
    }
  }
`

export default graphql(mutation)(SongCreate)
