import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import * as actionCreators from '../../actions'
import momentJalaali from 'moment-jalaali'

function Profile({ history, userUpdateProfileReset,  getUserDetails, listMyOrders, updateUserProfile, userDetails, userLogin, userUpdateProfile, myOrderList }) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')


    const { error, loading, user } = userDetails

    const { userInfo } = userLogin

    const { success } = userUpdateProfile

    const { loading: loadingOrders, error: errorOrders, orders } = myOrderList


    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || success || userInfo._id !== user._id) {
                userUpdateProfileReset()
                getUserDetails('profile')
                listMyOrders()
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [history, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('رمز عبور با رمز عبور تکراری یکسان نیست')
        } else {
            const data = {
                'id': user._id,
                'name': name,
                'email': email,
                'password': password
            }
            updateUserProfile(data)
            setMessage('')
        }

    }
    return (
        <Row>
            <Col md={3}>
                <h2 className='text-right Font-Yekan '>حساب کاربری</h2>

                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name'>
                        <Form.Label className='w-100 text-right Font-Yekan ' style={{ direction: "rtl" }}>نام و نام خانوادگی</Form.Label>
                        <Form.Control
                            required
                            type='name'
                            placeholder='نام و نام خانوادگی'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label className='w-100 text-right Font-Yekan ' style={{ direction: "rtl" }}>ایمیل</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='ایمیل'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label className='w-100 text-right Font-Yekan ' style={{ direction: "rtl" }}>رمز عبور</Form.Label>
                        <Form.Control

                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label className='w-100 text-right Font-Yekan ' style={{ direction: "rtl" }}>تکرار رمز عبور</Form.Label>
                        <Form.Control

                            type='password'
                            placeholder='تکرار رمز عبور'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        ویرایش
                </Button>

                </Form>
            </Col>

            <Col md={9}>
                <h2 className='text-right Font-Yekan '>سفارشات من</h2>
                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant='danger'>{errorOrders}</Message>
                ) : (
                            <Table striped responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>شناسه</th>
                                        <th>تاریخ</th>
                                        <th>مبلغ کل</th>
                                        <th>مبلغ پرداخت شده</th>
                                        <th>ارسال شده</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{momentJalaali(order.createdAt).format('jYYYY-jM-jD')}</td>
                                            <td>${order.totalPrice}</td>
                                            <td>{order.isPaid ? momentJalaali(order.paidAt).format('jYYYY-jM-jD') : (
                                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                            )}</td>
                                            <td>
                                                <LinkContainer to={`/order/${order._id}`}>
                                                    <Button className='btn-sm'>جزئیات</Button>
                                                </LinkContainer>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
            </Col>
        </Row>
    )
}

const mapStateToProps = (state) => {
    return {
        userDetails: state.user.userDetails,
        userLogin: state.user.userLogin,
        userUpdateProfile: state.user.userUpdateProfile,
        myOrderList: state.orders.myOrderList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        userUpdateProfileReset: () => dispatch(actionCreators.userUpdateProfileReset()),
        getUserDetails: (id) => dispatch(actionCreators.getUserDetails(id)),
        listMyOrders: () => dispatch(actionCreators.listMyOrders()),
        updateUserProfile: (user) => dispatch(actionCreators.updateUserProfile(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)