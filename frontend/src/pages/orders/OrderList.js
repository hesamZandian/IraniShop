import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import * as actionCreators from '../../actions'
import momentJalaali from 'moment-jalaali'

function OrderList({ history, listOrders, orderList, userLogin }) {


    const { loading, error, orders } = orderList

    const { userInfo } = userLogin



    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            listOrders()
        } else {
            history.push('/login')
        }

    }, [history, userInfo])


    return (
        <div>
            <h1 className='text-right Font-Yekan '>سفارشات</h1>
            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>کاربر</th>
                                    <th>تاریخ</th>
                                    <th>مبلغ نهایی</th>
                                    <th>پرداخت شده</th>
                                    <th>تحویل داده شده</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order.user && order.user.name}</td>
                                        <td>{momentJalaali(order.createdAt).format('jYYYY-jM-jD')}</td>
                                        <td>${order.totalPrice}</td>

                                        <td>{order.isPaid ? (
                                            momentJalaali(order.paidAt).format('jYYYY-jM-jD')
                                        ) : (
                                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                            )}
                                        </td>

                                        <td>{order.isDelivered ? (
                                            momentJalaali(order.deliveredAt).format('jYYYY-jM-jD')
                                        ) : (
                                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                            )}
                                        </td>

                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button variant='light' className='btn-sm'>
                                                    جزئیات
                                                </Button>
                                            </LinkContainer>


                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userLogin: state.user.userLogin,
        orderList: state.orders.orderList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        listOrders: () => dispatch(actionCreators.listOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)