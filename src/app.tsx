/**
 * 注意：此文件为编译时自动生成，如需修改入口文件请前往 build/template/app.tsx
 */
import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import Index from '~/pages/home/index'
import store from '~/store'
import { checkUpdate } from '~/utils/mp'
import './app.scss'
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
// h5非生产环境添加vconsole
if (process.env.TARO_ENV === 'h5' && process.env.NODE_ENV !== 'pro') {
	const VConsole = require('vconsole')
	new VConsole()
}
class App extends Component {
	/**
	 * 指定config的类型声明为: Taro.Config
	 *
	 * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
	 * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
	 * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
	 */
	config: Config = {
		/**
		 * 主包页面声明开始 注释用于判断开始行 勿动
		 */
		pages: [
			'pages/home/index',
			'pages/common/imgPreview',
			'pages/lab/FormValidate',
			'pages/lab/comp',
			'pages/lab/hooks',
			'pages/lab/index',
			'pages/user/index',
		],
		subPackages: [], // 页面声明结束 注释用于判断结束行 勿动
		window: {
			backgroundTextStyle: 'light',
			navigationBarBackgroundColor: '#fff',
			navigationBarTitleText: 'WeChat',
			navigationBarTextStyle: 'black',
		},
		tabBar: {
			color: '#969BA0',
			selectedColor: '#333333',
			backgroundColor: '#ffffff',
			list: [
				{
					iconPath: 'assets/images/icon/icon_tabbar_goods_default.png',
					selectedIconPath: 'assets/images/icon/icon_tabbar_goods_selected.png',
					pagePath: 'pages/home/index',
					text: '首页',
				},
				{
					iconPath: 'assets/images/icon/icon_tabbar_goods_default.png',
					selectedIconPath: 'assets/images/icon/icon_tabbar_goods_selected.png',
					pagePath: 'pages/lab/index',
					text: '实验室',
				},
				{
					iconPath: 'assets/images/icon/icon_tabbar_goods_default.png',
					selectedIconPath: 'assets/images/icon/icon_tabbar_goods_selected.png',
					pagePath: 'pages/user/index',
					text: '我的',
				},
			],
		},
	}
	componentDidShow() {
		// 检查更新
		checkUpdate()
	}
	componentDidCatchError(err) {
		console.error('catch error', err)
		console.error('catch error', 'catch error', err)
		console.log(123)
	}
	// 在 App 类中的 render() 函数没有实际作用
	// 请勿修改此函数
	render() {
		return (
			<Provider store={store}>
				<Index />
			</Provider>
		)
	}
}
Taro.render(<App />, document.getElementById('app'))
