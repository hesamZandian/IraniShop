import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'
import * as actionCreators from '../../actions'

function BrandEdit({ match, history, getBrandDetails, updateBrand, updateBrandReset, brandDetails, brandUpdate }) {

    const brandId = match.params.id

    const [name, setName] = useState('')
    const [category, setCategory] = useState(null)


    const { error, loading, brand, categories } = brandDetails

    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = brandUpdate
    
    useEffect(() => {

        if (successUpdate) {
            updateBrandReset()
            history.push('/admin/brandList')
        } else {
            if (!brand?.name || brand._id !== Number(brandId)) {
                getBrandDetails(brandId)
            } else {
                setName(brand.name)
                setCategory(brand.category)
            }
        }



    }, [brand, brandId, history, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        const data = {
            _id: brandId,
            name,
            category: parseInt(category),
        }
        updateBrand(data)
    }

    return (
        <div>
            <FormContainer>
                <h1>ویرایش محصول</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='name'>
                                <Form.Label className='w-100 text-right Font-Yekan '>نام محصول</Form.Label>
                                <Form.Control

                                    type='name'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='category'>
                                <Form.Label className='w-100 text-right Font-Yekan '>دسته بندی</Form.Label>
                                <Form.Control
                                as='select'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}>
                                <option value='' className='Font-Yekan '>انتخاب دسته بندی</option>
                                {categories && categories.map((item => {
                                    return (
                                    <option value={item._id} className='Font-Yekan '>{item.name}</option>
                                    )
                                }))}
                                </Form.Control>
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

const mapStateToProps = state => {
    return {
        brandDetails: state.brands.brandDetails,
        brandUpdate: state.brands.brandUpdate
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getBrandDetails: (id) => dispatch(actionCreators.getBrandDetails(id)),
        updateBrand: (brand) => dispatch(actionCreators.updateBrand(brand)),
        updateBrandReset: () => dispatch(actionCreators.updateBrandReset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandEdit)