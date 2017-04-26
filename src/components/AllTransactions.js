// @flow

import React from 'react'
import TransactionList from './TransactionList';
import DateFilter from './DateFilter';
import { getTransactions } from '../api';
import type { User } from '../api';

export type Props = {
  token: string,
  user: User,
}

class AllTransactions extends React.Component {

	props: Props;

	state: {
		transactions: Transaction[],
		error: Error,
		year: number,
		month: number
	};

	state = {
		error: undefined,
		year:  new Date().getFullYear(),
		month: new Date().getMonth(),
	};

	constructor(props) {
		super(props);

		this.handleYearSelection  = this.handleYearSelection.bind( this );
		this.handleMonthSelection = this.handleMonthSelection.bind( this );
	}

	handleYearSelection( year ) {
		this.setState( {
			year: parseInt(year,10)
		} );
	}

	handleMonthSelection( month ) {
		this.setState( {
			month: parseInt(month,10)
		} )
	}

	getTransactions() {
		let fromDate: Date = new Date(this.state.year, this.state.month, 1, 0, 0, 0, 0);
		let toDate: Date = new Date(fromDate);
		toDate.setMonth(toDate.getMonth() + 1);

		getTransactions( this.props.token, fromDate.toISOString(), toDate.toISOString() ).then( result => {
			this.setState( { transactions: result.result } );
		} )
		.catch( error =>
			this.setState( { error } )
		);
	}

	componentDidMount() {
		this.getTransactions();
	}

	componentDidUpdate(prevProps, prevState) {
		if ( prevState.month !== this.state.month || prevState.year !== this.state.year ) {
			this.getTransactions();
		}
	}

	render() {
		return (
			<div className="container">
				<div className="columns">
					<div className="column is-3">
						<div className="box">
							<DateFilter
								year={this.state.filterText}
								month={this.state.inStockOnly}
								onYearInput={this.handleYearSelection}
								onMonthInput={this.handleMonthSelection}
							/>
						</div>
			        </div>
				    <div className="column is-9">
				      <div className="box no-shadow">
				        <h2 className="title is-4">All Transactions</h2>
						<TransactionList transactions={this.state.transactions} showDate="true"/>
				      </div>
				    </div>
			    </div>
			</div>
		)
	}
}

export default AllTransactions;
