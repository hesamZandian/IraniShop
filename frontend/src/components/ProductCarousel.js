import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import * as actionCreators from '../actions'

function ProductCarousel({ listTopProducts, productTopRated }) {

    const { error, loading, products } = productTopRated

    useEffect(() => {
        listTopProducts()
    }, [])

    return (loading ? <Loader />
        : error
            ? <Message variant='danger'>{error}</Message>
            : (
                <Carousel pause='hover' className='bg-dark' style={{ direction: "ltr" }}>
                    {products.map(product => (
                        <Carousel.Item key={product._id}>
                            <Link to={`/product/${product._id}`}>
                                <Image src={product.image} alt={product.name} fluid style={{ borderRadius: 0 }} />
                                <Carousel.Caption className='carousel.caption'>
                                    <h4 style={{ direction: 'rtl' }}>{product.name} (${product.price})</h4>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )

    )
}

const mapStateToProps = (state) => {
    return {
        productTopRated: state.products.productTopRated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        listTopProducts: () => dispatch(actionCreators.listTopProducts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCarousel)
