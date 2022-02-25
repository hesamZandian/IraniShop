import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import Paginate from '../../components/Paginate'
import * as actionCreators from '../../actions'
import { connect } from 'react-redux'

function ProductList({ history, filterProducts, productCreateReset, deleteProduct, createProduct, productList, productDelete, productCreate, userLogin }) {

    const { loading, error, products, categories, brands, pages, page } = productList

    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate

    const { userInfo } = userLogin

    useEffect(() => {
        productCreateReset()


        
        if (!userInfo.isAdmin) {
            history.push('/login')
        }

        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            filterProducts({ brand: '', category: '', is_available: false })
        }

    }, [history, userInfo, successDelete, successCreate, createdProduct])


    const deleteHandler = (id) => {

        if (window.confirm('آیا از حذف این محصول اطمینان دارید?')) {
            deleteProduct(id)
        }
    }

    const createProductHandler = () => {
        createProduct()
    }
    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1 className='Font-Yekan '>محصولات</h1>
                </Col>

                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> محصول جدید
                    </Button>
                </Col>
            </Row>

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}


            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <div>
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th className='text-right'>نام محصول</th>
                                        <th className='text-right'>قیمت</th>
                                        <th className='text-right'>دسته بندی</th>
                                        <th className='text-right'>برند</th>
                                        <th>عملیات</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {products.map(product => (
                                        <tr key={product._id}>
                                            <td className='text-right' style={{ direction: 'rtl' }}>{product.name}</td>
                                            <td className='text-right'>${product.price}</td>
                                            <td className='text-right'>{categories ? categories.find(l => l._id === product.category)?.name: ''}</td>
                                            <td className='text-right'>{brands ? brands.find(b => b._id === product.brand)?.name: ''}</td>

                                            <td>
                                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        <i className='fas fa-edit'></i>
                                                    </Button>
                                                </LinkContainer>

                                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Paginate pages={pages} page={page} isAdmin={true} />
                        </div>
                    )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        productList: state.products.productList,
        productDelete: state.products.productDelete,
        productCreate: state.products.productCreate,
        userLogin: state.user.userLogin
    }
}

const mapDispatchToProps = dispatch => {
    return {
        filterProducts: (data) => dispatch(actionCreators.filterProducts(data)),
        createProduct: (data) => dispatch(actionCreators.createProduct(data)),
        deleteProduct: (id) => dispatch(actionCreators.deleteProduct(id)),
        productCreateReset: () => dispatch(actionCreators.productCreateReset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)