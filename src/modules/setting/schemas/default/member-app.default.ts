import { MemberAppSetting } from './..'

export const memberAppDefault: Partial<MemberAppSetting> = {
	memberRank: {
		defaultDisplay: {
			icon: '6368089879ac2a5f1be87689',
			color: '#fff',
			background: '6368092779ac2a5f1be8768b',
		},
	},
	greeting: {
		image: '636aa1004277123fb7e1f32b',
		content: '{{firstName}} ơi, Hi-Tea đi!',
	},
	defaultImages: {
		product: '636aa1004277123fb7e1f32b',
		store: '636aa1004277123fb7e1f32b',
		category: '636aa1004277123fb7e1f32b',
		coupon: '636aa1004277123fb7e1f32b',
		couponNotification: '636aa1004277123fb7e1f32b',
	},
	point: {
		pointName: 'BEAN',
		startMilestone: 5000,
		pointPerUnit: 6,
		unitStep: 10000,
	},
}
