import React, { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Message from '../../components/Message'
import CheckoutSteps from '../../components/CheckoutSteps'
import * as actionCreators from '../../actions'

function PlaceOrder({ history, orderCreate, cart, createOrder, createOrderReset }) {

    const { order, error, success } = orderCreate
    let newCart = { ...cart }
    newCart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + parseFloat(item.price) * item.qty, 0).toFixed(2)
    newCart.shippingPrice = (newCart.itemsPrice > 100 ? 0 : 10).toFixed(2)
    newCart.taxPrice = Number((0.082) * newCart.itemsPrice).toFixed(2)

    newCart.totalPrice = (Number(newCart.itemsPrice) + Number(newCart.shippingPrice) + Number(newCart.taxPrice)).toFixed(2)


    if (!cart.paymentMethod) {
        history.push('/payment')
    }

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
            createOrderReset()
        }
        // eslint-disable-next-line
    }, [success, history])

    const placeOrder = () => {
        const data = {
            orderItems: newCart.cartItems,
            shippingAddress: newCart.shippingAddress,
            paymentMethod: newCart.paymentMethod,
            itemsPrice: newCart.itemsPrice,
            shippingPrice: newCart.shippingPrice,
            taxPrice: newCart.taxPrice,
            totalPrice: newCart.totalPrice,
        }
        createOrder(data)
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2 className='text-right' style={{ direction: 'rtl' }}>نحوه ارسال</h2>

                            <p >
                                {newCart.shippingAddress?.address},  {newCart.shippingAddress?.city}
                                {'  '}
                                {newCart.shippingAddress?.postalCode},
                                {'  '}
                                {newCart.shippingAddress?.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2 className='text-right'>نحوه پرداخت</h2>
                            <p>
                                {newCart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>سبد خرید</h2>
                            {newCart.cartItems.length === 0 ? <Message variant='info'>
                                سبد خرید شما خالی است
                            </Message> : (
                                    <ListGroup variant='flush'>
                                        {newCart.cartItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>

                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </Col>

                                                    <Col md={4}>
                                                        {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                        </ListGroup.Item>

                    </ListGroup>

                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2 className='text-right'>خلاصه سفارش</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>مبلغ سفارش:</Col>
                                    <Col>${newCart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>مبلغ ارسال سفارش:</Col>
                                    <Col>${newCart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>مالیات:</Col>
                                    <Col>${newCart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>مبلغ کل:</Col>
                                    <Col>${newCart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>


                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={newCart.cartItems === 0}
                                    onClick={placeOrder}
                                >
                                    ثبت سفارش
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        orderCreate: state.orders.orderCreate,
        cart: state.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createOrder: (order) => dispatch(actionCreators.createOrder(order)),
        createOrderReset: () => dispatch(actionCreators.createOrderReset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrder)
