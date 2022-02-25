import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import * as actionCreators from '../../actions'
import { connect } from 'react-redux'

function UsersList({ history, listUsers, deleteUser, userList, userLogin, userDelete }) {


    const { loading, error, users } = userList

    const { userInfo } = userLogin

    const { success: successDelete } = userDelete


    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            listUsers()
        } else {
            history.push('/login')
        }

    }, [history, successDelete, userInfo])


    const deleteHandler = (id) => {

        if (window.confirm('آیا از حذف کاربر مورد نظر مطمئن هستید?')) {
            deleteUser(id)
        }
    }

    return (
        <div>
            <h1 className='text-right Font-Yekan '>کاربران</h1>
            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>شناسه</th>
                                    <th>نام و نام خانوادگی</th>
                                    <th>ایمیل</th>
                                    <th>ادمین</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin ? (
                                            <i className='fas fa-check' style={{ color: 'green' }}></i>
                                        ) : (
                                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                            )}</td>

                                        <td>
                                            <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>

                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userList: state.user.userList,
        userLogin: state.user.userLogin,
        userDelete: state.user.userDelete
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        listUsers: () => dispatch(actionCreators.listUsers()),
        deleteUser: (id) => dispatch(actionCreators.deleteUser(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList)
