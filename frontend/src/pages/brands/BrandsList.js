import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import Paginate from '../../components/Paginate'
import * as actionCreators from '../../actions'

function BrandList({ history, match, getBrandsList, deleteBrand, createBrand, createBrandReset, brandList, brandDelete, brandCreate, userLogin }) {


    const { loading, error, data, categories, pages, page } = brandList

    const { loading: loadingDelete, error: errorDelete, success: successDelete } = brandDelete

    const { loading: loadingCreate, error: errorCreate, success: successCreate, brand: createdBrand } = brandCreate

    const { userInfo } = userLogin

    useEffect(() => {
        createBrandReset()

        if (!userInfo.isAdmin) {
            history.push('/login')
        }

        if (successCreate) {
            history.push(`/admin/brand/${createdBrand._id}/edit`)
        } else {
            getBrandsList()
        }

    }, [history, userInfo, successDelete, successCreate, createdBrand])


    const deleteHandler = (id) => {

        if (window.confirm('آیا از حذف این محصول اطمینان دارید?')) {
            deleteBrand(id)
        }
    }

    const createBrandHandler = () => {
        createBrand()
    }
    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1 className='Font-Yekan '>برندها</h1>
                </Col>

                <Col className='text-right'>
                    <Button className='my-3' onClick={createBrandHandler}>
                        <i className='fas fa-plus'></i> برند جدید
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
                                        <th className='text-right'>نام برند</th>
                                        <th className='text-right'>دسته بندی</th>
                                        <th>عملیات</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {data.map(brand => (
                                        <tr key={brand._id}>
                                            <td className='text-right' style={{ direction: 'rtl' }}>{brand.name}</td>
                                            <td className='text-right'>{categories ? categories.find(l => l._id === brand.category)?.name: ''}</td>
                                            <td>
                                                <LinkContainer to={`/admin/brand/${brand._id}/edit`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        <i className='fas fa-edit'></i>
                                                    </Button>
                                                </LinkContainer>

                                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(brand._id)}>
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
        brandList: state.brands.brandList,
        brandDelete: state.brands.brandDelete,
        brandCreate: state.brands.brandCreate,
        userLogin: state.user.userLogin
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getBrandsList: () => dispatch(actionCreators.getBrandsList()),
        deleteBrand: (id) => dispatch(actionCreators.deleteBrand(id)),
        createBrand: (data) => dispatch(actionCreators.createBrand(data)),
        createBrandReset: () => dispatch(actionCreators.createBrandReset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandList)