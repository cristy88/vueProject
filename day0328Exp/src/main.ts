import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Button,
  Tabbar,
  TabbarItem,
  Tab,
  Tabs,
  Cell,
  AddressList,
  AddressEdit,
  NavBar,
  Notify,
  Dialog,
  ContactCard,
  Empty,
  Grid,
  GridItem,
  Image,
  Col,
  Row,
  ActionBar,
  ActionBarIcon,
  ActionBarButton,
  SubmitBar,
  Checkbox,
  CheckboxGroup,
  Swipe,
  SwipeItem,
  Field,
  CellGroup,
  Form 
} from 'vant'
import 'vant/lib/index.css'
// 引入mock模拟接口
import './mock'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())

app.use(router)
app.use(Button)
app.use(Tabbar)
app.use(TabbarItem)
app.use(Tab)
app.use(Tabs)
app.use(Cell)
app.use(AddressList)
app.use(AddressEdit)
app.use(NavBar)
app.use(Notify)
app.use(Dialog)
app.use(ContactCard)
app.use(Empty)
app.use(Grid)
app.use(GridItem)
app.use(Image)
app.use(Col)
app.use(Row)
app.use(ActionBar)
app.use(ActionBarIcon)
app.use(ActionBarButton)
app.use(SubmitBar)
app.use(Checkbox)
app.use(CheckboxGroup)
app.use(Swipe)
app.use(SwipeItem)
app.use(Field)
app.use(CellGroup)
app.use(Form)

app.mount('#app')
