import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import * as actionCreators from '../../actions'
import momentJalaali from 'moment-jalaali'

function Order({ match, history, getOrderDetails, payOrder, deliverOrder, orderPayReset, orderDeliverReset, orderDetails, orderPay, orderDeliver, userLogin }) {
    const orderId = match.params.id


    const [sdkReady, setSdkReady] = useState(false)

    const { order, error, loading } = orderDetails

    const { loading: loadingPay, success: successPay } = orderPay

    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const { userInfo } = userLogin

    let itemsPrice = 0
    if (!loading && !error && order.orderItems) {
        itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }


    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AeDXja18CkwFUkL-HQPySbzZsiTrN52cG13mf9Yz7KiV2vNnGfTDP0wDEN9sGlhZHrbb_USawcJzVDgn'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    useEffect(() => {

        if (!userInfo) {
            history.push('/login')
        }

        if (!order || successPay || order._id !== Number(orderId) || successDeliver) {
            orderPayReset()
            orderDeliverReset()

            getOrderDetails(orderId)
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
        // eslint-disable-next-line
    }, [order, orderId, successPay, successDeliver])


    const successPaymentHandler = (paymentResult) => {
        payOrder(orderId, paymentResult)
    }

    const deliverHandler = () => {
        deliverOrder(order)
    }

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
                <div>
                    <h1 className='text-right Font-Yekan ' style={{ direction: 'rtl' }}>سفارش: {order.Id}</h1>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2 className='text-right Font-Yekan '>اطلاعات سفارش دهنده</h2>
                                    <p className='text-right Font-Yekan '><strong>نام: </strong> {order.user?.name}</p>
                                    <p className='text-right Font-Yekan '><strong>ایمیل: </strong><a href={`mailto:${order.user?.email}`}>{order.user?.email}</a></p>
                                    <p className='text-right Font-Yekan '>
                                        <strong>آدرس: </strong>
                                        {order.shippingAddress?.address},  {order.shippingAddress?.city}
                                        {'  '}
                                        {order.shippingAddress?.postalCode},
                                {'  '}
                                        {order.shippingAddress?.country}
                                    </p>

                                    {order.isDelivered ? (
                                        <Message variant='success'><span className='text-right' style={{ direction: 'rtl' }}>ارسال شده در {momentJalaali(order.deliveredAt).format('jYYYY-jM-jD')}</span></Message>
                                    ) : (
                                            <Message variant='warning'><span className='text-right w-100 d-inline-block'>ارسال نشده</span></Message>
                                        )}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2 className='text-right Font-Yekan '>نحوه پرداخت</h2>
                                    <p>
                                        {order.paymentMethod}
                                    </p>
                                    {order.isPaid ? (
                                        <Message variant='success'>پرداخت شده در {momentJalaali(order.paidAt).format('jYYYY-jM-jD')}</Message>
                                    ) : (
                                            <Message variant='warning'><span className='text-right w-100 d-inline-block'>پرداخت نشده</span></Message>
                                        )}

                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2 className='text-right Font-Yekan ' >اطلاعات سفارش</h2>
                                    {order.orderItems?.length === 0 ? <Message variant='info'>
                                        سفارش خالی است
                            </Message> : (
                                            <ListGroup variant='flush'>
                                                {order.orderItems && order.orderItems.map((item, index) => (
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
                                        <h2 className='text-right Font-Yekan '>خلاصه سفارش</h2>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col className='text-right'>مبلغ سفارش:</Col>
                                            <Col>${itemsPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col className='text-right'>هزینه نحوه ارسال:</Col>
                                            <Col>${order.shippingPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col className='text-right'>مالیات:</Col>
                                            <Col>${order.taxPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col className='text-right'>مبلغ کل:</Col>
                                            <Col>${order.totalPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>


                                    {!order.isPaid && (
                                        <ListGroup.Item>
                                            {loadingPay && <Loader />}

                                            {!sdkReady ? (
                                                <Loader />
                                            ) : (
                                                    <PayPalButton
                                                        amount={order.totalPrice}
                                                        onSuccess={successPaymentHandler}
                                                    />
                                                )}
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                                {loadingDeliver && <Loader />}
                                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <ListGroup.Item>
                                        <Button
                                            type='button'
                                            className='btn btn-block'
                                            onClick={deliverHandler}
                                        >
                                            ارسال شده
                                        </Button>
                                    </ListGroup.Item>
                                )}
                            </Card>
                        </Col>
                    </Row>
                </div>
            )
}

const mapStateToProps = (state) => {
    return {
        orderDetails: state.orders.orderDetails,
        orderPay: state.orders.orderPay,
        orderDeliver: state.orders.orderDeliver,
        userLogin: state.user.userLogin
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOrderDetails: (id) => dispatch(actionCreators.getOrderDetails(id)),
        payOrder: (id, paymentResult) => dispatch(actionCreators.payOrder(id, paymentResult)),
        deliverOrder: (order) => dispatch(actionCreators.deliverOrder(order)),
        orderPayReset: () => dispatch(actionCreators.orderPayReset()),
        orderDeliverReset: () => dispatch(actionCreators.orderDeliverReset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)
