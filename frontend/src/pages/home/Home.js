import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Form } from 'react-bootstrap'
import Product from '../../components/Product'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import Paginate from '../../components/Paginate'
import ProductCarousel from '../../components/ProductCarousel'
import * as actionCreators from '../../actions'


function HomeScreen({ history, filterProducts, productList }) {
    // const productList = useSelector(state => state.products.productList)
    const { error, loading, products,categories, brands, page, pages } = productList
    const [is_available, set_is_available] = useState(false);
    const [selected_category, set_selected_category] = useState('');
    const [selected_brand, set_selected_brand] = useState('');
    
    let keyword = history.location.search

    useEffect(() => {
        const params = { category: selected_category || '', is_available: is_available, brand: selected_brand }
            filterProducts(params)
    }, [selected_category, is_available, selected_brand])

    return (
        <div>
            {!keyword && <ProductCarousel />}
            <div className='homescreen-head'>
            <h1 className='text-right Font-Yekan '>محصولات</h1>
            <div className='homescreen-dropdowns'>
                <Form.Group controlId='isavailable' style={{ direction: "rtl" }}>
                    <Form.Check
                    type='checkbox'
                    label='فقط کالاهای موجود'
                    checked={is_available}
                    onChange={(e) => set_is_available(e.target.checked)}/>
                </Form.Group>
                <Form.Group controlId='category'>
                  <Form.Control
                    as='select'
                    value={selected_category}
                    onChange={(e) => set_selected_category(e.target.value)}>
                    <option value='' className='Font-Yekan '>انتخاب دسته بندی</option>
                    {categories.map((ckey) => {
                        return <option value={ckey._id} className='Font-Yekan '>{ckey.name}</option>
                    })}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId='selected_brand'>
                  <Form.Control
                    as='select'
                    value={selected_brand}
                    onChange={(e) => set_selected_brand(e.target.value)}>
                    <option value='' className='Font-Yekan '>انتخاب برند</option>
                    {brands.map((ckey) => {
                        return <option value={ckey._id} className='Font-Yekan '>{ckey.name}</option>
                    })}
                  </Form.Control>
                </Form.Group>
            </div>
            </div>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <div>
                        <Row>
                            {products.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3} style={{ minHeight: "524px" }}>
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
                        <Paginate page={page} pages={pages} keyword={keyword} />
                    </div>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        productList: state.products.productList,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        filterProducts: (data) => dispatch(actionCreators.filterProducts(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
