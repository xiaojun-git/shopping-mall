import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
import {Dialog,AddressEdit,AddressList,Badge,SwipeCell,Stepper,SubmitBar,Checkbox, CheckboxGroup,Cell,Icon,Form,CellGroup,Field,Button,Tag,Card,Collapse, CollapseItem, Swipe, SwipeItem, Lazyload, Sidebar, SidebarItem, Toast ,Tab, Tabs,Image as VanImage} from 'vant';

const Vue = createApp(App);
Vue.use(store);
Vue.use(router);
Vue.use(Dialog);
Vue.use(AddressEdit);
Vue.use(AddressList);
Vue.use(Badge);
Vue.use(SwipeCell);
Vue.use(Stepper);
Vue.use(SubmitBar);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Cell);
Vue.use(Icon);
Vue.use(Form);
Vue.use(VanImage);
Vue.use(Card);
Vue.use(CellGroup);
Vue.use(Field);
Vue.use(Button);
Vue.use(Tag);
Vue.use(CollapseItem);
Vue.use(Collapse);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Sidebar);
Vue.use(Toast);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(SidebarItem);

Vue.mount('#app')


