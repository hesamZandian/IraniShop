import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'
import * as actionCreators from '../../actions'

function UserEdit({ match, history, getUserDetails, updateUser, userUpdateReset, userDetails, userUpdate }) {

    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const { error, loading, user } = userDetails

    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate

    useEffect(() => {

        if (successUpdate) {
            userUpdateReset()
            history.push('/admin/userlist')
        } else {

            if (!user?.name || user?._id !== Number(userId)) {
                getUserDetails(userId)
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
// eslint-disable-next-line
    }, [user, userId, successUpdate, history])

    const submitHandler = (e) => {
        e.preventDefault()
        const data = { _id: user._id, name, email, isAdmin }
        updateUser(data)
    }

    return (
        <div>
            <FormContainer>
                <h1 className='text-right Font-Yekan '>ویرایش کاربر</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='name'>
                                <Form.Label className='text-right Font-Yekan  w-100' style={{ direction: "rtl" }}>نام و نام خانوادگی</Form.Label>
                                <Form.Control

                                    type='name'
                                    placeholder='نام و نام خانوادگی'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='email'>
                                <Form.Label className='text-right Font-Yekan  w-100' style={{ direction: "rtl" }}>ایمیل</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='ایمیل'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='isadmin' style={{ direction: "rtl" }}>
                                <Form.Check
                                    type='checkbox'
                                    label='کاربر ادمین'
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                >
                                </Form.Check>
                            </Form.Group>

                            <Button type='submit' variant='primary'>
                                ویرایش
                        </Button>

                        </Form>
                    )}

            </FormContainer >
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        userDetails: state.user.userDetails,
        userUpdate: state.user.userUpdate
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserDetails: (id) => dispatch(actionCreators.getUserDetails(id)),
        updateUser: (user) => dispatch(actionCreators.updateUser(user)),
        userUpdateReset: () => dispatch(actionCreators.userUpdateReset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit)