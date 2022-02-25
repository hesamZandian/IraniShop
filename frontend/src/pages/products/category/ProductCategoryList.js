import React, {  useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'
import Paginate from '../../../components/Paginate'
import * as actionCreators from '../../../actions'

function ProductCategoryList({ history, match, getProductCategoryList, deleteProductCategory, createProductCategory, productCategoryCreateReset, productCategoryList, productCategoryDelete, productCategoryCreate, userLogin }) {


    const { loading, error, data, pages, page } = productCategoryList

    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productCategoryDelete

    const { loading: loadingCreate, error: errorCreate, success: successCreate, category: createdCategory } = productCategoryCreate

    const { userInfo } = userLogin

    useEffect(() => {
        productCategoryCreateReset()

        if (!userInfo.isAdmin) {
            history.push('/login')
        }

        if (successCreate) {
            history.push(`/admin/category/${createdCategory._id}/edit`)
        } else {
            getProductCategoryList()
        }

    }, [history, userInfo, successDelete, successCreate, createdCategory])


    const deleteHandler = (id) => {

        if (window.confirm('آیا از حذف این دسته بندی اطمینان دارید?')) {
            deleteProductCategory(id)
        }
    }

    const createProductHandler = () => {
       createProductCategory()
    }
    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1 className='Font-Yekan '>دسته بندی محصولات</h1>
                </Col>

                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> دسته بندی جدید
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
                                        <th className='text-right'>نام</th>
                                        <th>عملیات</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {data.map(product => (
                                        <tr key={product._id}>
                                            <td className='text-right' style={{ direction: 'rtl' }}>{product.name}</td>
                                            <td>
                                                <LinkContainer to={`/admin/category/${product._id}/edit`}>
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
        productCategoryList: state.products.productCategories,
        productCategoryDelete: state.products.productCategoryDelete,
        productCategoryCreate: state.products.productCategoryCreate,
        userLogin: state.user.userLogin
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProductCategoryList: () => dispatch(actionCreators.getProductCategoryList()),
        deleteProductCategory: (id) => dispatch(actionCreators.deleteProductCategory(id)),
        createProductCategory: (data) => dispatch(actionCreators.createProductCategory(data)),
        productCategoryCreateReset: () => dispatch(actionCreators.productCategoryCreateReset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategoryList)