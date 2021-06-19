import gql from "graphql-tag"

// ! means u have to provide this argument
export default gql`
 query getSong($id:ID!){ 
  song(id:$id){
    id
    title
    lyrics{
      id
      content
      likes
    }
 }
}
`
