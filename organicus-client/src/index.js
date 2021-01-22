import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ScrollContext } from 'react-router-scroll-4';
import { IntlReducer as Intl, IntlProvider } from 'react-redux-multilingual'
import './index.scss';
import PrivateRoute from "./api/auth/PrivateRoute"
import ProducerRoute from "./api/auth/ProducerRoute"

// Import custom components
import store from './store';
import translations from './constants/translations'
import { getAllProducts } from './actions'


// Layouts
import Vegetables from './components/layouts/vegetables/main';


//Collection Pages
import CollectionLeftSidebar from "./components/collection/collection-left-sidebar";

// Product Pages
import NoSideBar from "./components/products/no-sidebar";

// Features
import App from './components/app'
import Cart from './components/cart'
import wishList from './components/wishlist'
import checkOut from './components/checkout'
import orderSuccess from './components/checkout/success-page'

// Extra Pages
import aboutUs from './components/pages/about-us'
import PageNotFound from './components/pages/404'
import lookbook from './components/pages/lookbook'
import Login from './components/pages/login'
import Register from './components/pages/register'
import Search from './components/pages/search'
import Collection from './components/pages/collection'
import ForgetPassword from './components/pages/forget-password'
import Contact from './components/pages/contact'
import Dashboard from './components/pages/dashboard'
import Faq from './components/pages/faq'
import CustomerOrders from './components/pages/orders'

// Blog Pages
import RightSide from './components/blogs/right-sidebar'
import Details from './components/blogs/details'
import BlogPage from './components/blogs/blog-page'



//Admin Components

// Components
import AdminDashboard from './components/admin/dashboard';

// Products physical
import Category from './components/admin/products/physical/category';
import Product_list from './components/admin/products/physical/product-list';
import Add_product from './components/admin/products/physical/add-product';
import Edit_product from './components/admin/products/physical/edit-product';
import Product_detail from './components/admin/products/physical/product-detail';


//Sales
import Orders from './components/admin/sales/orders';

//Pages
import Profile from './components/admin/settings/profile';


class Root extends React.Component {

    render() {
        store.dispatch(getAllProducts());

        return(
        	<Provider store={store}>
                <IntlProvider translations={translations} locale='en'>
				<BrowserRouter basename={'/'} >
					<ScrollContext>
						<Switch>
                            <App>
                                {/*Routes For Layouts*/}
                                <Route path={`${process.env.PUBLIC_URL}/home`} component={Vegetables}/>
                                
								{/*Routes For Features (Product Collection) */}
								<Route path={`${process.env.PUBLIC_URL}/products`} component={CollectionLeftSidebar}/>

								{/*Routes For Single Product*/}
								<Route path={`${process.env.PUBLIC_URL}/product/:id`} component={NoSideBar}/>
								

								{/*Routes For custom Features*/}
								<Route path={`${process.env.PUBLIC_URL}/cart`} component={Cart}/>
								<Route path={`${process.env.PUBLIC_URL}/favorite`} component={wishList}/>
								<Route path={`${process.env.PUBLIC_URL}/checkout`} component={checkOut}/>
								<Route path={`${process.env.PUBLIC_URL}/order-success`} component={orderSuccess}/>

								{/*Routes For Extra Pages*/}
                                <Route path={`${process.env.PUBLIC_URL}/pages/about-us`} component={aboutUs}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/404`} component={PageNotFound}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/lookbook`} component={lookbook}/>
                                <Route path={`${process.env.PUBLIC_URL}/login`} component={Login}/>
                                <Route path={`${process.env.PUBLIC_URL}/register`} component={Register}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/search`} component={Search}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/collection`} component={Collection}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/forget-password`} component={ForgetPassword}/>
                                <Route path={`${process.env.PUBLIC_URL}/contact`} component={Contact}/>
                                <PrivateRoute path={`${process.env.PUBLIC_URL}/dashboard`} component={Dashboard}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/faq`} component={Faq}/>

                                <Route path={`${process.env.PUBLIC_URL}/orders`} component={CustomerOrders} />

								{/*Features*/}
							

								{/*Blog Pages*/}
                                <Route path={`${process.env.PUBLIC_URL}/blog/right-sidebar`} component={RightSide}/>
                                <Route path={`${process.env.PUBLIC_URL}/blog/details`} component={Details}/>
                                <Route path={`${process.env.PUBLIC_URL}/blog/blog-page`} component={BlogPage}/>


                                {/*Admin Pages*/}
                                <ProducerRoute path={`${process.env.PUBLIC_URL}/admin/dashboard`} component={AdminDashboard} />
                                
                                <ProducerRoute path={`${process.env.PUBLIC_URL}/admin/category`} component={Category} />
                                <ProducerRoute path={`${process.env.PUBLIC_URL}/admin/product-list`} component={Product_list} />
                                <ProducerRoute path={`${process.env.PUBLIC_URL}/admin/product-detail`} component={Product_detail} />
                                <ProducerRoute path={`${process.env.PUBLIC_URL}/admin/add-product`} component={Add_product} />
                                <ProducerRoute path={`${process.env.PUBLIC_URL}/admin/edit-product`} component={Edit_product} />

                                <ProducerRoute path={`${process.env.PUBLIC_URL}/sales/orders`} component={Orders} />

                                <ProducerRoute path={`${process.env.PUBLIC_URL}/settings/profile`} component={Profile} />

                                
                            </App>
                            <Route component={PageNotFound} />
                         </Switch>
					  </ScrollContext>
					</BrowserRouter>
                </IntlProvider>
			</Provider>
    	);
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));


