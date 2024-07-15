import React from 'react'
import {Card, CardBody} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import YouTubeAudio from './YouTubeAudio'
const Product = ({product}) => {
  return (
    <Card className='my-3 p-3 rounded'>
        <Link to={ `/product/${product._id}`}>
            <Card.Img src={product.image} variant='top'/>
        </Link>

        <Card.Body>
            <Link to={ `/product/${product._id}`}>
                <Card.Title as='div'>
                    <strong>{product.name} </strong>
                </Card.Title>
            </Link>


        <Card.Text as='div'>
            <YouTubeAudio music={product.music}/>

        </Card.Text>





        </Card.Body>
       
    </Card>
  ) 
}

export default Product
