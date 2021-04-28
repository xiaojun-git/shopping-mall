import { createRouter, createWebHistory } from 'vue-router';
import store from '../store'
import { Dialog } from 'vant';

const Home = () =>import('../views/home/Home.vue');
const Category = () =>import('../views/category/Category.vue');
const Personal = () =>import('../views/personal/Personal.vue');
const Shopcar = () =>import('../views/shopcar/Shopcar.vue');
const Detall = () =>import('../components/commom/Detall.vue');
const register = ()=>import('../views/personal/register.vue');
const login = ()=>import('../views/personal/login.vue');
const addrest = ()=>import('../views/personal/addrest.vue');
const newaddrest = ()=>import('../views/personal/newaddrest.vue');
const editaddrest = ()=>import('../views/personal/editaddrest.vue');
const writeorder = ()=>import('../views/orders/writeorder.vue');
const orderpage = ()=>import('../views/orders/orderpage.vue');
const orderdetail = ()=>import('../views/orders/orderdetail.vue');
const orderlist = ()=>import('../views/orders/orderlist.vue');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
	  meta: {
		title: 'Home'
	  }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
	meta: {
		title: 'About'
	}
  },
  {
    path: '/category',
    name: 'category',
    component: Category,
	meta: {
		title: 'Category'
	}
  },
  {
    path: '/personal',
    name: 'personal',
    component: Personal,
	meta: {
		title: 'Personal'
	}
  },
  {
    path: '/shopcar',
    name: 'shopcar',
    component: Shopcar,
	meta: {
		title: 'Shopcar'
	}
  },
  {
    path: '/detall',
    name: 'Detall',
    component: Detall,
  	meta: {
  		title: 'Detall'
  	}
  },
  {
    path: '/register',
    name: 'register',
    component: register,
  	meta: {
  		title: 'Register'
  	}
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  	meta: {
  		title: 'login'
  	}
  },
  {
    path: '/addrest',
    name: 'addrest',
    component: addrest,
  	meta: {
  		title: 'addrest'
  	}
  },
  {
    path: '/newaddrest',
    name: 'newaddrest',
    component: newaddrest,
  	meta: {
  		title: 'newaddrest'
  	}
  },
  {
    path: '/editaddrest',
    name: 'editaddrest',
    component: editaddrest,
  	meta: {
  		title: 'editaddrest'
  	}
  },
  {
    path: '/writeorder',
    name: 'writeorder',
    component: writeorder,
  	meta: {
  		title: 'writeorder'
  	}
  },
  {
    path: '/orderpage',
    name: 'orderpage',
    component: orderpage,
  	meta: {
  		title: 'orderpage'
  	}
  },
  {
    path: '/orderdetail',
    name: 'orderdetail',
    component: orderdetail,
  	meta: {
  		title: 'orderdetail'
  	}
  },
  {
    path: '/orderlist',
    name: 'orderlist',
    component: orderlist,
  	meta: {
  		title: 'orderlist'
  	}
  },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
	// next();
	document.title = to.meta.title;
  if(to.meta.title=='writeorder'||from.meta.title=='writeorder')
  {
    store.commit('buyinfuc');
    // next();
  }

  if(from.meta.title=='orderpage'&&to.meta.title=='orderlist')
  {
    console.log('77777');
    Dialog.confirm({
      title: '确认要离开？',
      message: '您的订单在24小时内未支付将被取消，请尽快支付。',
      confirmButtonText: '确认离开',
      cancelButtonText: '继续支付'
    })
      .then(() => {
        next();
        Dialog.close
        // on confirm
      })
      .catch(() => {
        Dialog.close
        // on cancel
      });
  }else {
    next();
  }
  
  
})

export default router
