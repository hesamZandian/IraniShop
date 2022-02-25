import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'
import * as actionCreators from '../../actions'


function ProductEdit({ match, history, productUpdateReset, listProductDetails, updateProduct, productDetails, productUpdate }) {

    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState(null)
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const { error, loading, product, categories, brands } = productDetails

    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate
    
    useEffect(() => {

        if (successUpdate) {
            productUpdateReset()
            history.push('/admin/productlist')
        } else {
            if (!product?.name || product._id !== Number(productId)) {
                listProductDetails(productId)
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                if (product.brand) {
                    setBrand(product.brand)  
                }else {
                    setBrand(brands[0]._id)
                }
                if (product.category) {
                    setCategory(product.category)
                }else {
                    setCategory(categories[0]._id)
                }
                setCountInStock(product.countInStock)
                setDescription(product.description)

            }
        }



    }, [product, productId, history, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        const data = {
            _id: productId,
            name,
            price,
            image,
            brand,
            category: parseInt(category),
            countInStock,
            description
        }
        updateProduct(data)
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', productId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/products/upload/', formData, config)


            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
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
                                    placeholder='نام محصول'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='price'>
                                <Form.Label className='w-100 text-right Font-Yekan '>قیمت</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='قیمت'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>


                            <Form.Group controlId='image'>
                                <Form.Label className='w-100 text-right Font-Yekan '>عکس</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='عکس'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                >
                                </Form.Control>

                                <Form.File
                                    id='image-file'
                                    label='انتخاب فایل'
                                    custom
                                    onChange={uploadFileHandler}
                                >

                                </Form.File>
                                {uploading && <Loader />}

                            </Form.Group>


                            <Form.Group controlId='brand'>
                                <Form.Label className='w-100 text-right Font-Yekan '>برند</Form.Label>
                                <Form.Control
                                as='select'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}>
                                <option value='' className='Font-Yekan '>انتخاب برند</option>
                                {brands && brands.map((item => {
                                    return (
                                    <option value={item._id} className='Font-Yekan '>{item.name}</option>
                                    )
                                }))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='countinstock'>
                                <Form.Label className='w-100 text-right Font-Yekan '>تعداد در انبار</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='تعداد در انبار'
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
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
                            <Form.Group controlId='description'>
                                <Form.Label className='w-100 text-right Font-Yekan '>توضیحات</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
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
        productDetails: state.products.productDetails,
        productUpdate: state.products.productUpdate
    }
}

const mapDispatchToProps = dispatch => {
    return {
        listProductDetails: (id) => dispatch(actionCreators.listProductDetails(id)),
        productUpdateReset: () => dispatch(actionCreators.productUpdateReset()),
        updateProduct: (data) => dispatch(actionCreators.updateProduct(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit)