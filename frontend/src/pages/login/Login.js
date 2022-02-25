import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'
import * as actionCreators from '../../actions'

function Login({ location, history, login, userLogin }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const redirect = location.search ? location.search.split('=')[1] : '/'

    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        login(email, password)
    }

    return (
        <FormContainer>
            <h1 className='text-right Font-Yekan '>ورود</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='email'>
                    <Form.Label className='w-100 text-right Font-Yekan '>ایمیل</Form.Label>
                    <Form.Control
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
                        type='password'
                        placeholder='رمز عبور'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    ورود
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    کاربر جدید هستید? <Link
                        to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        ثبت نام
                        </Link>
                </Col>
            </Row>

        </FormContainer>
    )
}

const mapStateToProps = (state) => {
    return {
        userLogin: state.user.userLogin
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (email, password) => dispatch(actionCreators.login(email, password))
    }
}

export default (mapStateToProps, mapDispatchToProps)(Login)
