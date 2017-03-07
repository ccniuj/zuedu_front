import React, {
	Component
} from 'react';

export default class OrderStep extends Component {
	render() {
		return (

			<img  src = {
				`/images/bar${this.props.progress}.png`
			}
			style = {
				{
					border:'0px',
					padding:'0px',
					margin:'0px',
					width: '100%'
				}
			}/>

		);
	}
}