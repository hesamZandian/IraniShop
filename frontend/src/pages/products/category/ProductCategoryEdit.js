import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'
import FormContainer from '../../../components/FormContainer'
import * as actionCreators from '../../../actions'


function ProductCategoryEdit({ match, history, getProductCategoryDetails, updateProductCategory, productCategoryUpdateReset, productCategoryDetails, productCategoryUpdate }) {

    const productCategoryId = match.params.id

    const [name, setName] = useState('')


    const { error, loading, category } = productCategoryDetails

    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productCategoryUpdate

    useEffect(() => {

        if (successUpdate) {
           productCategoryUpdateReset()
            history.push('/admin/categorylist')
        } else {
            if (!category?.name || category._id !== Number(productCategoryId)) {
                getProductCategoryDetails(productCategoryId)
            } else {
                setName(category.name)
            }
        }



    }, [category, productCategoryId, history, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        updateProductCategory({
            _id: productCategoryId,
            name
        })
    }

    return (
        <div>
            <FormContainer>
                <h1>ویرایش دسته بندی</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='name'>
                                <Form.Label className='w-100 text-right Font-Yekan '>نام دسته</Form.Label>
                                <Form.Control

                                    type='name'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
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

const mapStateToProps = (state) => {
    return {
        productCategoryDetails: state.products.productCategoryDetails,
        productCategoryUpdate: state.products.productCategoryUpdate
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProductCategoryDetails: (id) => dispatch(actionCreators.getProductCategoryDetails(id)),
        updateProductCategory: (product) => dispatch(actionCreators.updateProductCategory(product)),
        productCategoryUpdateReset: () => dispatch(actionCreators.productCategoryUpdateReset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategoryEdit)