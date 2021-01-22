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
import Landing from './components/landing'


// Layouts
import Fashion from './components/layouts/fashion/main';
import Vegetables from './components/layouts/vegetables/main';
import Kids from './components/layouts/kids/main';
import Pets from './components/layouts/pets/main';
import Furniture from './components/layouts/furniture/main';
import Watch from './components/layouts/watch/main';
import Beauty from './components/layouts/beauty/main';
import Electronic from './components/layouts/electronic/main';


//Collection Pages
import CollectionLeftSidebar from "./components/collection/collection-left-sidebar";
import CollectionNoSidebar from "./components/collection/collection-no-sidebar";
import CollectionRightSidebar from "./components/collection/collection-right-sidebar";
import CollectionFullWidth from "./components/collection/collection-full-width";
import CollectionMetro from "./components/collection/collection-metro";

// Product Pages
import LeftSideBar from "./components/products/left-sidebar";
import RightSideBar from "./components/products/right-sidebar";
import NoSideBar from "./components/products/no-sidebar";
import LeftImage from "./components/products/left-image";
import RightImage from "./components/products/right-image";
import Accordian from "./components/products/accordian";
import ColumnLeft from "./components/products/column-left";
import ColumnRight from "./components/products/column-right";
import Column from "./components/products/column";
import Vertical from "./components/products/vertical";

// Features
import App from './components/app'
import Cart from './components/cart'
import Compare from './components/compare/index'
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

// Theme Element
import ElementTitle from "./components/features/theme/element-title"
import ElementBanner from "./components/features/theme/element-banner";
import ElementSlider from "./components/features/theme/element-slider";
import ElementCategory from "./components/features/theme/element-category";
import ElementService from "./components/features/theme/element-service";
import ElementRatio from "./components/features/theme/element-ratio";

// Product Elements
import ElementProductBox from "./components/features/product/element-product-box"
import ElementProductSlider from "./components/features/product/element-product-slider"
import ElementProductNoSlider from "./components/features/product/element-product-no-slider"
import ElementMultipleSlider from "./components/features/product/element-multiple-slider"
import ElementProductTab from "./components/features/product/element-product-tab"

// Portfolio Features
import GridCols from "./components/features/portfolio/grid-cols"
import MasonaryGridCols from "./components/features/portfolio/masonary-grid-cols"


//Admin Components

// Components
import AdminDashboard from './components/admin/dashboard';

// Products physical
import Category from './components/admin/products/physical/category';
import Sub_category from './components/admin/products/physical/sub-category';
import Product_list from './components/admin/products/physical/product-list';
import Add_product from './components/admin/products/physical/add-product';
import Edit_product from './components/admin/products/physical/edit-product';
import Product_detail from './components/admin/products/physical/product-detail';

//Product Digital
import Digital_category from './components/admin/products/digital/digital-category';
import Digital_sub_category from './components/admin/products/digital/digital-sub-category';
import Digital_pro_list from './components/admin/products/digital/digital-pro-list';
import Digital_add_pro from './components/admin/products/digital/digital-add-pro';

//Sales
import Orders from './components/admin/sales/orders';
import Transactions_sales from './components/admin/sales/transactions-sales';
//Coupons
import ListCoupons from './components/admin/coupons/list-coupons';
import Create_coupons from './components/admin/coupons/create-coupons';

//Pages
import ListPages from './components/admin/pages/list-page';
import Create_page from './components/admin/pages/create-page';
import Media from './components/admin/media/media';
import List_menu from './components/admin/menus/list-menu';
import Create_menu from './components/admin/menus/create-menu';
import List_user from './components/admin/users/list-user';
import Create_user from './components/admin/users/create-user';
import List_vendors from './components/admin/vendors/list-vendors';
import Create_vendors from './components/admin/vendors/create.vendors';
import Translations from './components/admin/localization/translations';
import Rates from './components/admin/localization/rates';
import Taxes from './components/admin/localization/taxes';
import Profile from './components/admin/settings/profile';
import Reports from './components/admin/reports/report';
import Invoice from './components/admin/invoice';
import Datatable from './components/admin/common/datatable'


class Root extends React.Component {

    render() {
        store.dispatch(getAllProducts());

        return(
        	<Provider store={store}>
                <IntlProvider translations={translations} locale='en'>
				<BrowserRouter basename={'/'} >
					<ScrollContext>
						<Switch>
                            <Route exact path={`${process.env.PUBLIC_URL}/template`} component={Landing}/>
							<Route path={`${process.env.PUBLIC_URL}/electronic`} component={Electronic}/>
                            <Route path={`${process.env.PUBLIC_URL}/furniture`} component={Furniture}/>
							<Route path={`${process.env.PUBLIC_URL}/pets`} component={Pets}/>
							<Route path={`${process.env.PUBLIC_URL}/watch`} component={Watch}/>
                            <Route path={`${process.env.PUBLIC_URL}/kids`} component={Kids}/>
                            <Route path={`${process.env.PUBLIC_URL}/beauty`} component={Beauty}/>
                            <Route path={`${process.env.PUBLIC_URL}/fashion`} component={Fashion}/>
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
								{/*Theme Elements*/}
                                <Route path={`${process.env.PUBLIC_URL}/features/element-title`} component={ElementTitle}/>
                                <Route path={`${process.env.PUBLIC_URL}/features/element-banner`} component={ElementBanner}/>
                                <Route path={`${process.env.PUBLIC_URL}/features/element-slider`} component={ElementSlider}/>
                                <Route path={`${process.env.PUBLIC_URL}/features/element-category`} component={ElementCategory}/>
                                <Route path={`${process.env.PUBLIC_URL}/features/element-service`} component={ElementService}/>
                                <Route path={`${process.env.PUBLIC_URL}/features/element-ratio`} component={ElementRatio}/>

								{/*Product Elements*/}
                                <Route path={`${process.env.PUBLIC_URL}/features/element-product-box`} component={ElementProductBox}/>
                                <Route path={`${process.env.PUBLIC_URL}/features/element-product-slider`} component={ElementProductSlider}/>
                                <Route path={`${process.env.PUBLIC_URL}/features/element-product-no-slider`} component={ElementProductNoSlider}/>
                                <Route path={`${process.env.PUBLIC_URL}/features/element-product-multiple-slider`} component={ElementMultipleSlider}/>
                                <Route path={`${process.env.PUBLIC_URL}/features/element-product-tab`} component={ElementProductTab}/>

								{/*Portfolios*/}
                                <Route path={`${process.env.PUBLIC_URL}/features/portfolio-grid/:columns`} component={GridCols}/>
                                <Route path={`${process.env.PUBLIC_URL}/features/portfolio-masonary/:columns`} component={MasonaryGridCols}/>

								{/*Blog Pages*/}
                                <Route path={`${process.env.PUBLIC_URL}/blog/right-sidebar`} component={RightSide}/>
                                <Route path={`${process.env.PUBLIC_URL}/blog/details`} component={Details}/>
                                <Route path={`${process.env.PUBLIC_URL}/blog/blog-page`} component={BlogPage}/>

                                {/* <Route exact path="*" component={PageNotFound} /> */}

                                {/*Admin Pages*/}
                                <ProducerRoute path={`${process.env.PUBLIC_URL}/admin/dashboard`} component={AdminDashboard} />
                                
                                <ProducerRoute path={`${process.env.PUBLIC_URL}/admin/category`} component={Category} />
                                <ProducerRoute path={`${process.env.PUBLIC_URL}/admin/product-list`} component={Product_list} />
                                <ProducerRoute path={`${process.env.PUBLIC_URL}/admin/product-detail`} component={Product_detail} />
                                <ProducerRoute path={`${process.env.PUBLIC_URL}/admin/add-product`} component={Add_product} />
                                <ProducerRoute path={`${process.env.PUBLIC_URL}/admin/edit-product`} component={Edit_product} />

                                <ProducerRoute path={`${process.env.PUBLIC_URL}/products/digital/digital-category`} component={Digital_category} />
                                <ProducerRoute path={`${process.env.PUBLIC_URL}/products/digital/digital-sub-category`} component={Digital_sub_category} />
                                <ProducerRoute path={`${process.env.PUBLIC_URL}/products/digital/digital-product-list`} component={Digital_pro_list} />
                                <ProducerRoute path={`${process.env.PUBLIC_URL}/products/digital/digital-add-product`} component={Digital_add_pro} />

                                <ProducerRoute path={`${process.env.PUBLIC_URL}/sales/orders`} component={Orders} />
                                <ProducerRoute path={`${process.env.PUBLIC_URL}/sales/transactions`} component={Transactions_sales} />

                                <ProducerRoute path={`${process.env.PUBLIC_URL}/coupons/list-coupons`} component={ListCoupons} />
                                <ProducerRoute path={`${process.env.PUBLIC_URL}/coupons/create-coupons`} component={Create_coupons} />

                                <ProducerRoute path={`${process.env.PUBLIC_URL}/pages/list-page`} component={ListPages} />
                                <ProducerRoute path={`${process.env.PUBLIC_URL}/pages/create-page`} component={Create_page} />

                                <ProducerRoute path={`${process.env.PUBLIC_URL}/media`} component={Media} />

                                <ProducerRoute path={`${process.env.PUBLIC_URL}/menus/list-menu`} component={List_menu} />
                                <ProducerRoute path={`${process.env.PUBLIC_URL}/menus/create-menu`} component={Create_menu} />

                                <ProducerRoute path={`${process.env.PUBLIC_URL}/users/list-user`} component={List_user} />
                                <ProducerRoute path={`${process.env.PUBLIC_URL}/users/create-user`} component={Create_user} />

                                <ProducerRoute path={`${process.env.PUBLIC_URL}/vendors/list_vendors`} component={List_vendors} />
                                <ProducerRoute path={`${process.env.PUBLIC_URL}/vendors/create-vendors`} component={Create_vendors} />

                                <ProducerRoute path={`${process.env.PUBLIC_URL}/localization/transactions`} component={Translations} />
                                <ProducerRoute path={`${process.env.PUBLIC_URL}/localization/currency-rates`} component={Rates} />
                                <ProducerRoute path={`${process.env.PUBLIC_URL}/localization/taxes`} component={Taxes} />

                                <ProducerRoute path={`${process.env.PUBLIC_URL}/reports/report`} component={Reports} />

                                <ProducerRoute path={`${process.env.PUBLIC_URL}/settings/profile`} component={Profile} />

                                <ProducerRoute path={`${process.env.PUBLIC_URL}/invoice`} component={Invoice} />

                                <ProducerRoute path={`${process.env.PUBLIC_URL}/data-table`} component={Datatable} />
                            </App>
                         </Switch>
					  </ScrollContext>
					</BrowserRouter>
                </IntlProvider>
			</Provider>
    	);
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));


