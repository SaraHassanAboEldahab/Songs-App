import React from 'react'
import gql from "graphql-tag"
import query from "../queries/fetchSongsList"
import { graphql } from "react-apollo"
import { Link } from "react-router"


const SongList = (props) => {

  const onSongDelete = (id) => {
    props.mutate({
      variables: { id }
      // refetchQueries: [{ query }] //1st way
    }).then(() => props.data.refetch()) //2nd way
  }
  const renderSongs = () => {
    return props.data.songs.map(({ id, title }) => {
      return (
        <li className="collection-item">
          <Link key={id} to={`/songs/${id}`}>
            {title}
          </Link>
          <i className="material-icons delete" onClick={() => onSongDelete(id)}>
            delete
            </i>
        </li>
      )
    })
  }
  if (props.data.loading) {
    return <div>Loading....</div>
  }
  return (
    <div>
      <ul className="collection">
        {renderSongs()}
      </ul>
      <Link to="/songs/new" className="right">
        <button className="btn blue">Add Song</button>
      </Link>
    </div>
  )
}

const mutation = gql`
mutation Delete($id:ID){
  deleteSong(id:$id){
    id
  }
}
`
export default graphql(mutation)(
  graphql(query)(SongList)
)