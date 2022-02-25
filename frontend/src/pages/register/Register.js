import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'
import * as actionCreators from '../../actions'

function Register({ location, history, userRegister, register }) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const { error, loading, userInfo } = userRegister

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('رمز عبور جدید با رمز عبور تکراری یکسان نیست')
        } else {
            register(name, email, password)
        }

    }

    return (
        <FormContainer>
            <h1>ثبت نام</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label className='w-100 text-right Font-Yekan '>نام و نام خانوادگی</Form.Label>
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
                    <Form.Label className='w-100 text-right Font-Yekan '>ایمیل</Form.Label>
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
                    <Form.Label className='w-100 text-right Font-Yekan '>رمز عبور</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='رمز عبور'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordConfirm'>
                    <Form.Label className='w-100 text-right Font-Yekan '>تکرار رمز عبور</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='تکرار رمز عبور'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    ثبت نام
                </Button>

            </Form>

            <Row className='py-3'>
                <Col>
                    اکانت دارید? <Link
                        to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        ورود
                        </Link>
                </Col>
            </Row>
        </FormContainer >
    )
}

const mapStateToProps = (state) => {
    return {
        userRegister: state.user.userRegister
    }
}

const mapDispatchToProps = dispatch => {
    return {
        register: (name, email, password) => dispatch(actionCreators.register(name, email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
