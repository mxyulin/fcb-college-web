import product from '@/mock/product/product';
import param from './param';

/**
 * 模拟数据mock
 *
 * mock是否开启模拟数据拦截
 */

const options = {mock: false};

// user(options);

// menu(options);

// oauth(options);

param(options);

product(options)
