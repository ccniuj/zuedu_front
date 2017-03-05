import React, {
	Component
} from 'react';

export default class OrderStep extends Component {
	constructor() {
		super();
		this.state = {
			step: 1
		}
	}
	render() {
		return (
			<div className = "center">
			<button 
			onClick = {
				e => {
					let step = this.state.step + 1;
					if (step == 4){
						step = 1;
					}
					this.setState({
						step: step
					});
				}

			} 
			style={
			{
				border: '0px',
				margin:'0px',
				padding:'0px',
			}
			}
			>
			< img src = {
				`/images/bar${this.state.step}.png`
			}
			style = {
				{
					border:'0px',
					padding:'0px',
					margin:'0px',
					width: '100%'
				}
			}
			on />
			</button>
			</div>
		);
	}
}