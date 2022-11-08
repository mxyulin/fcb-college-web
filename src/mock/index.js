import product from '@/mock/product/product';
import param from './user'; 
import param from './menu'; 
import param from './auth'; 
import param from './param'; 

import decorate from "./decorate/decorate"
import commission from './commission/commission';
 

/**
 * 模拟数据mock
 *
 * mock是否开启模拟数据拦截
 */

const options = {mock: false};

// user(options);

// menu(options);

// oauth(options);
 
// param(options);


commission(options)
decorate(options) 
product(options) 
