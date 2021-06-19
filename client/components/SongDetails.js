import React from 'react'
import query from "../queries/fetchSong"
import { graphql } from "react-apollo"
import { Link } from "react-router"
import LyricCreate from "./LyricCreate"
import LyricList from './LyricList'

const SongDetails = (props) => {
  console.log(props)
  const { song } = props.data
  return (
    <div>
      {song ?
        <div>
          <Link to="/" className="">
            <h5>Back</h5>
          </Link>
          <h3>{song.title}</h3>
          <LyricList lyrics={song.lyrics} />
          <LyricCreate songId={props.params.id} />
        </div> :
        null
      }
    </div>
  )
}

export default graphql(query, {
  options: (props) => {
    return {
      variables: { id: props.params.id }
    }
  }
})(SongDetails)
