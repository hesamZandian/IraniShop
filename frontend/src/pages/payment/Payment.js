import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { connect, useDispatch } from 'react-redux'
import FormContainer from '../../components/FormContainer'
import CheckoutSteps from '../../components/CheckoutSteps'
import * as actionCreators from '../../actions'

function Payment({ history, savePaymentMethod }) {


    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    // if (!shippingAddress?.address) {
    //     history.push('/shipping')
    // }

    const submitHandler = (e) => {
        e.preventDefault()
        savePaymentMethod(paymentMethod)
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />

            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>انتخاب نحوه پرداخت</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal or Credit Card'
                            id='paypal'
                            name='paymentMethod'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >

                        </Form.Check>
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    ادامه
                </Button>
            </Form>
        </FormContainer>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        savePaymentMethod: (data) => dispatch(actionCreators.savePaymentMethod(data))
    }
}

export default connect(null, mapDispatchToProps)(Payment)
