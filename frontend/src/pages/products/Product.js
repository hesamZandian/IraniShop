import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Rating from '../../components/Rating'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import * as actionCreators from '../../actions'
import momentJalaali from 'moment-jalaali'

function Product({ match, history, listProductDetails, productDetails, userLogin, productReviewCreate, createProductReview, productCreateReviewReset }) {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')


    const { loading, error, product } = productDetails

    const { userInfo } = userLogin

    const {
        loading: loadingProductReview,
        error: errorProductReview,
        success: successProductReview,
    } = productReviewCreate

    useEffect(() => {
        if (successProductReview) {
            setRating(0)
            setComment('')
            productCreateReviewReset()
        }

        listProductDetails(match.params.id)

    }, [match, successProductReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        createProductReview(match.params.id, { rating, comment })
    }

    return (
        <div>
            {loading ?
                <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <div>
                            <Row>
                                <Col md={6}>
                                    <Image src={product.image} alt={product.name} fluid />
                                </Col>


                                <Col md={3}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item  style={{ direction:"rtl", textAlign: "right" }}>
                                            <h3>{product.name}</h3>
                                        </ListGroup.Item>

                                        <ListGroup.Item style={{ direction:"rtl", textAlign: "right" }}>
                                            <Rating value={product.rating} text={`${product.numReviews}`} color={'#f8e825'} />
                                        </ListGroup.Item>

                                        <ListGroup.Item className='Font-Yekan ' style={{ direction:"rtl", textAlign: "right" }}>
                                            قیمت: ${product.price}
                                        </ListGroup.Item>

                                        <ListGroup.Item className='Font-Yekan ' style={{ direction:"rtl", textAlign: "right" }}>
                                            درباره محصول: {product.description}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>


                                <Col md={3}>
                                    <Card>
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col className='Font-Yekan  text-right fw-bold'>قیمت:</Col>
                                                    <Col className='Font-Yekan '>
                                                        <strong>${product.price}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col className='Font-Yekan  text-right fw-bold'>وضعیت:</Col>
                                                    <Col className='Font-Yekan ' style={{ color: product.countInStock > 0 ? "green": "red" }}>
                                                        {product.countInStock > 0 ? 'موجود در انبار' :
                                                         'ناموجود'}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            {product.countInStock > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col className='Font-Yekan  fw-bold text-right' style={{ alignSelf: "center" }}>تعداد</Col>
                                                        <Col xs='auto' className='my-1'>
                                                            <Form.Control
                                                                as="select"
                                                                value={qty}
                                                                onChange={(e) => setQty(e.target.value)}
                                                            >
                                                                {

                                                                    [...Array(product.countInStock).keys()].map((x) => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    ))
                                                                }

                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )}


                                            <ListGroup.Item>
                                                <Button
                                                    onClick={addToCartHandler}
                                                    className='btn-block Font-Yekan '
                                                    disabled={product.countInStock === 0}
                                                    type='button'>
                                                    اضافه به سبد خرید
                                                </Button>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <h4 className='Font-Yekan '>نقد و بررسی</h4>
                                    {product.reviews.length === 0 && <Message variant='info'>نظری درباره این محصول داده نشده است</Message>}

                                    <ListGroup variant='flush'>
                                        {product.reviews.map((review) => (
                                            <ListGroup.Item key={review._id}>
                                                <strong>{review.name}</strong>
                                                <Rating value={review.rating} color='#f8e825' />
                                                <p>{momentJalaali(review.createdAt).format('jYYYY-jM-jD')} </p>
                                                <p>{review.comment}</p>
                                            </ListGroup.Item>
                                        ))}

                                        <ListGroup.Item>
                                            <h4 className='Font-Yekan '>نظر خود را بنوسید</h4>

                                            {loadingProductReview && <Loader />}
                                            {successProductReview && <Message variant='success'>نظر شما با موفقیت ثبت شد</Message>}
                                            {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}

                                            {userInfo ? (
                                                <Form onSubmit={submitHandler}>
                                                    <Form.Group controlId='rating'>
                                                        <Form.Label className='Font-Yekan '>امتیازات</Form.Label>
                                                        <Form.Control
                                                            as='select'
                                                            value={rating}
                                                            onChange={(e) => setRating(e.target.value)}
                                                        >
                                                            <option value='' className='Font-Yekan '>انتخاب</option>
                                                            <option value='1' className='Font-Yekan '>1 - ضعیف</option>
                                                            <option value='2' className='Font-Yekan '>2 - متوسط</option>
                                                            <option value='3' className='Font-Yekan '>3 - خوب</option>
                                                            <option value='4' className='Font-Yekan '>4 - خیلی خوب</option>
                                                            <option value='5' className='Font-Yekan '>5 - عالی</option>
                                                        </Form.Control>
                                                    </Form.Group>

                                                    <Form.Group controlId='comment'>
                                                        <Form.Label className='Font-Yekan '>نقد و بررسی</Form.Label>
                                                        <Form.Control
                                                            as='textarea'
                                                            row='5'
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                        ></Form.Control>
                                                    </Form.Group>

                                                    <Button
                                                        disabled={loadingProductReview}
                                                        type='submit'
                                                        variant='primary'
                                                        className='Font-Yekan '
                                                    >
                                                        ثبت
                                                    </Button>

                                                </Form>
                                            ) : (
                                                    <Message variant='info'>لطفا برای نظر دادن <Link to='/login'>وارد</Link> شوید</Message>
                                                )}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </div>
                    )

            }


        </div >
    )
}
 
const mapStateToProps = (state) => {
    return {
        productDetails: state.products.productDetails,
        userLogin: state.user.userLogin,
        productReviewCreate: state.products.productReviewCreate
    }
}

const mapDispatchToProps = dispatch => {
    return {
        listProductDetails: (id) => dispatch(actionCreators.listProductDetails(id)),
        createProductReview: (id, review) => dispatch(actionCreators.createProductReview(id, review)),
        productCreateReviewReset: () => dispatch(actionCreators.productCreateReviewReset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
