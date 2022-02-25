import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import * as actionCreators from '../actions'
import { connect } from 'react-redux'

function Header({ userLogin, logout }) {

    const { userInfo } = userLogin


    const logoutHandler = () => {
        logout()
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>IRANISHOP</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" style={{ direction: "ltr" }}>
                        <SearchBox />
                        <Nav className="ml-auto">

                            <LinkContainer to='/cart'>
                                <Nav.Link ><span className='Font-Yekan '>سبد خرید</span> <i className="fas fa-shopping-cart"></i></Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item className='text-right Font-Yekan '>پروفایل</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={logoutHandler} className='text-right Font-Yekan '>خروج</NavDropdown.Item>

                                </NavDropdown>
                            ) : (
                                    <LinkContainer to='/login'>
                                        <Nav.Link><i className="fas fa-user"></i> <span className='Font-Yekan '>ورود</span></Nav.Link>
                                    </LinkContainer>
                                )}


                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='ادمین' id='adminmenue'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item className='text-right'><span className='Font-Yekan '>کاربران</span></NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item className='text-right Font-Yekan '>محصولات</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item className='text-right Font-Yekan '>سفارشات</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/categorylist'>
                                        <NavDropdown.Item className='text-right Font-Yekan '>دسته بندی محصولات</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/brandlist'>
                                        <NavDropdown.Item className='text-right Font-Yekan '>برندها</NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown>
                            )}


                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

const mapStateToProps = (state) => {
    return {
        userLogin: state.user.userLogin
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actionCreators.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
