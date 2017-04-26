// @flow

import React from 'react';
import {formatDate, formatAmount} from '../helpers';

class TransactionRow extends React.Component {
	render() {
		return (
			<tr key={this.props.transaction.date}>
				{ this.props.showDate &&
				<td><strong>{formatDate( this.props.transaction.date )}</strong></td>
				}
				<td>{this.props.transaction.from}</td>
				<td>{this.props.transaction.target}</td>
				<td style={{ textAlign: 'right' }}>{formatAmount( this.props.transaction.amount )}</td>
				<td style={{ textAlign: 'right' }}>{formatAmount( this.props.transaction.total )}</td>
			</tr>
		)
	}
}

export default TransactionRow;
