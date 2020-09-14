import React from 'react'
import { Jumbotron } from 'react-bootstrap'
import Layout from '../../components/Layouts'

/**
* @author
* @function Home
**/

const Home = (props) => {
  return(
    <Layout>
        <Jumbotron style={{margin: '5rem',background:"#fff"}} className="text-center">
            <h1>Admin - DashBoard</h1>
            
        </Jumbotron>
    </Layout>
   )

 }

export default Home