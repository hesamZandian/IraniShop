import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../../components/Message'
import * as actionCreators from '../../actions'

function Cart({ match, location, history, cart, addToCart, removeFromCart }) {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const { cartItems } = cart

    useEffect(() => {
        if (productId) {
            addToCart(productId, qty)
        }
    }, [productId, qty])


    const removeFromCartHandler = (id) => {
        removeFromCart(id)
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={8} className='text-right'>
                <h1 className='text-right'>سبد خرید</h1>
                {cartItems.length === 0 ? (
                    <Message variant='info'>
                        سبد شما خالی است <Link to='/'>بازگشت به صفحه اصلی</Link>
                    </Message>
                ) : (
                        <ListGroup variant='flush'>
                            {cartItems.map(item => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>

                                        <Col md={2}>
                                            ${item.price}
                                        </Col>

                                        <Col md={3}>
                                            <Form.Control
                                                as="select"
                                                value={item.qty}
                                                onChange={(e) => addToCart(item.product, Number(e.target.value))}
                                            >
                                                {

                                                    [...Array(item.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }

                                            </Form.Control>
                                        </Col>

                                        <Col md={1}>
                                            <Button
                                                type='button'
                                                variant='light'
                                                onClick={() => removeFromCartHandler(item.product)}
                                            >
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>تعداد  ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) محصول</h2>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup.Item>
                        <Button
                            type='button'
                            className='btn-block'
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}
                        >
                            تایید نهایی و پرداخت
                        </Button>
                    </ListGroup.Item>


                </Card>
            </Col>
        </Row>
    )
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (id, qty) => dispatch(actionCreators.addToCart(id, qty)),
        removeFromCart: (id) => dispatch(actionCreators.removeFromCart(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)