import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import FormContainer from '../../components/FormContainer'
import CheckoutSteps from '../../components/CheckoutSteps'
import * as actionCreators from '../../actions'

function Shipping({ history, cart, saveShippingAddress }) {

    const { shippingAddress } = cart


    const [address, setAddress] = useState(shippingAddress?.address)
    const [city, setCity] = useState(shippingAddress?.city)
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode)
    const [country, setCountry] = useState(shippingAddress?.country)

    const submitHandler = (e) => {
        e.preventDefault()
        saveShippingAddress({ address, city, postalCode, country })
        history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1 className='text-right'>نحوه ارسال</h1>
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='address'>
                    <Form.Label className='w-100 text-right' style={{ direction: 'rtl' }}>آدرس</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='آدرس'
                        value={address ? address : ''}
                        onChange={(e) => setAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label className='w-100 text-right' style={{ direction: 'rtl' }}>شهر</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='شهر'
                        value={city ? city : ''}
                        onChange={(e) => setCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label className='w-100 text-right' style={{ direction: 'rtl' }}>کد پستی</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='کد پستی'
                        value={postalCode ? postalCode : ''}
                        onChange={(e) => setPostalCode(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label className='w-100 text-right' style={{ direction: 'rtl' }}>کشور</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='کشور'
                        value={country ? country : ''}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    ادامه
                </Button>
            </Form>
        </FormContainer>
    )
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveShippingAddress: (data) => dispatch(actionCreators.saveShippingAddress(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shipping)
