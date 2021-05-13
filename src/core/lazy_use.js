import Vue from 'vue'
import scriptUrl from '@/assets/icon/iconfont.js'

// base library
import {
  ConfigProvider,
  Button,
  Icon,
  Row,
  Col,
  Layout,
  Space,
  Breadcrumb,
  Dropdown,
  Menu,
  PageHeader,
  Steps,
  Checkbox,
  DatePicker,
  Form,
  FormModel,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TimePicker,
  Upload,
  Avatar,
  Badge,
  Card,
  Descriptions,
  List,
  Popover,
  Statistic,
  Table,
  Tabs,
  Tag,
  Tooltip,
  Tree,
  Alert,
  Drawer,
  Modal,
  Popconfirm,
  Progress,
  Result,
  Skeleton,
  Spin,
  Divider,
  message,
  notification
} from 'ant-design-vue'

// ext library

Vue.use(ConfigProvider)
Vue.use(Button)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Layout)
Vue.use(Space)
Vue.use(Breadcrumb)
Vue.use(Dropdown)
Vue.use(Menu)
Vue.use(PageHeader)
Vue.use(Steps)
Vue.use(Checkbox)
Vue.use(DatePicker)
Vue.use(Form)
Vue.use(FormModel)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(Select)
Vue.use(Switch)
Vue.use(TimePicker)
Vue.use(Upload)
Vue.use(Avatar)
Vue.use(Badge)
Vue.use(Card)
Vue.use(Descriptions)
Vue.use(List)
Vue.use(Popover)
Vue.use(Statistic)
Vue.use(Table)
Vue.use(Tabs)
Vue.use(Tag)
Vue.use(Tooltip)
Vue.use(Tree)
Vue.use(Alert)
Vue.use(Drawer)
Vue.use(Modal)
Vue.use(Popconfirm)
Vue.use(Progress)
Vue.use(Result)
Vue.use(Skeleton)
Vue.use(Spin)
Vue.use(Divider)

message.config({
  maxCount: 1
})

Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning

const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: scriptUrl
})

Vue.component('my-icon', MyIcon)
