import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text, Input } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtNoticebar, AtTag } from 'taro-ui'
import {
	HdPaging,
	HdBackToTop,
	HdCard,
	HdCountdown,
	HdModal,
	HdNodata,
	HdTabs,
} from 'taro-ui-hd'

import Tabbar from '~/components/Tabbar/Tabbar'
import QQMapWSService from '~/services/qqMap/ws.service'
import LianouService from '~/services/root/drug.service'
import './index.scss'

type PageStateProps = {
	counter: {
		counter: number
		increment: Function
		decrement: Function
		incrementAsync: Function
	}
}

type PageState = {
	testState: string
	mobileText: string // 手机号归属地展示文字
	/**
	 * 弹窗
	 */
	modalVisible: boolean
}

interface Index {
	props: PageStateProps
	state: PageState
}

@inject('counter')
@observer
class Index extends Component {
	state = {
		testState: '1212',
		mobileText: '',
		modalVisible: true,
	}

	/**
	 * 指定config的类型声明为: Taro.Config
	 *
	 * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
	 * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
	 * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
	 */
	config: Config = {
		navigationBarTitleText: '首页',
	}

	componentDidShow() {
		console.error('into componentDidshow at home index', APP_CONF.API_HOST)
	}
	componentDidHide() {
		console.error('into componentDidhide at home index')
	}

	increment = () => {
		this.setState({
			testState: `${this.state.testState}expand`,
		})
		const { counter } = this.props
		counter.increment()
	}

	decrement = () => {
		const { counter } = this.props
		counter.decrement()
	}

	incrementAsync = () => {
		const { counter } = this.props
		counter.incrementAsync()
	}

	// 手机号输入
	handleInput(type, e) {
		console.log('type', type, e)
	}

	async handleJSONPTest() {
		const result = await QQMapWSService.geocoder({
			location: `28.2532,112.87887`,
			get_poi: 0,
		})
		console.log('result', result)
	}

	async handleProxyText() {
		const result = await LianouService.queryDiseaseByDrugName({
			ComName: '阿莫西林胶囊',
		})
		console.log('result', result)
	}

	handleBackToTop() {}

	/**
	 * 弹窗关闭
	 */
	handleModalClose() {
		this.setState({
			modalVisible: false,
		})
	}

	/**
	 * handleTabChange
	 */
	handleTabChange(e) {
		console.log('handleTabChange', e)
	}

	handleOk() {
		this.setState({
			modalVisible: false,
		})
	}

	render() {
		const {
			counter: { counter },
		} = this.props
		const { testState, mobileText, modalVisible } = this.state
		console.log('mobileText', mobileText)
		return (
			<View className='index'>
				<AtNoticebar>这是 NoticeBar 通告栏</AtNoticebar>
				<AtTag size='small'>标签</AtTag>
				<Input
					onInput={this.handleInput.bind(this, 'mobile')}
					type='number'
					placeholder='请输入手机号'
				/>
				{/* <Button onClick={this.queryMobile.bind(this)}>查询手机号归属地</Button> */}
				{/* <View>归属地：{mobileText}</View> */}
				<Button
					onClick={this.handleJSONPTest.bind(this)}
					className='button-jsonp'
				>
					jsonp 测试
				</Button>
				<Button onClick={this.handleProxyText.bind(this)}>本地代理 测试</Button>
				<Button onClick={this.increment}>+</Button>
				<Button onClick={this.decrement}>-</Button>
				<Button onClick={this.incrementAsync}>Add Async</Button>
				<Button onClick={this.incrementAsync}>{testState}</Button>
				<Text>{counter}</Text>
				<HdPaging hasMore />
				<HdBackToTop
					visible
					color='#ff4a4a'
					onClick={this.handleBackToTop.bind(this)}
				/>
				<HdCard>这是卡片内容哦</HdCard>
				<HdCountdown leftTime={50000} />
				<HdModal
					positionType='center'
					title='弹窗标题'
					visible={modalVisible}
					onClose={this.handleModalClose.bind(this)}
					mask
					maskClosable
					showfooter
					onOk={this.handleOk.bind(this)}
				>
					这是弹窗内容
				</HdModal>
				<HdTabs
					currentTab={1}
					list={[
						{
							text: 'tab1',
							id: 1,
						},
						{
							text: 'tab2',
							id: 2,
						},
					]}
					onChange={this.handleTabChange.bind(this)}
				/>
				<HdNodata height={600} text='测试缺省文字' />
				<Tabbar />
			</View>
		)
	}
}

export default Index as ComponentType
