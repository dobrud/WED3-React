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

const MAX_TRANSACTIONS_PER_PAGE = 5;
class AllTransactions extends React.Component {

	props: Props;

	state: {
		transactions: Transaction[],
		error: Error,
		year: number,
		month: number,
    currentPage:number,
    totalPages:number
	};

	state = {
		error: undefined,
		year:  new Date().getFullYear(),
		month: new Date().getMonth(),
    totalPages: 0,
    currentPage: 0
	};

	constructor(props) {
		super(props);

		this.handleYearSelection  = this.handleYearSelection.bind( this );
		this.handleMonthSelection = this.handleMonthSelection.bind( this );
    this.handlePagination = this.handlePagination.bind(this);
	}

  handlePagination(delta) {
    return () => {
      this.getTransactions(this.state.currentPage + delta);
    };    
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

	getTransactions(page:number) {
		let fromDate: Date = new Date(this.state.year, this.state.month, 1, 0, 0, 0, 0);
		let toDate: Date = new Date(fromDate);
		toDate.setMonth(toDate.getMonth() + 1);

		getTransactions( this.props.token, fromDate.toISOString(), toDate.toISOString(), MAX_TRANSACTIONS_PER_PAGE, page * MAX_TRANSACTIONS_PER_PAGE ).then( result => {
			this.setState( { transactions: result.result, totalPages: Math.ceil(result.query.resultcount / MAX_TRANSACTIONS_PER_PAGE), currentPage: Math.floor(result.query.skip / MAX_TRANSACTIONS_PER_PAGE) } );
		})
		.catch( error =>
			this.setState( { error } )
		);
	}

	componentDidMount() {
		this.getTransactions(0);
	}

	componentDidUpdate(prevProps, prevState) {
		if ( prevState.month !== this.state.month || prevState.year !== this.state.year ) {
			this.getTransactions(this.state.currentPage);
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
                {this.state.totalPages > 0 &&
                <div className="pagination-links">
                  <button disabled={this.state.currentPage <= 0} className="button is-info" onClick={this.handlePagination(-1)}>&lt;&lt;</button>
                  <span>Page {this.state.currentPage + 1} of {this.state.totalPages}</span>
                  <button disabled={this.state.currentPage >= this.state.totalPages-1} className="button is-info" onClick={this.handlePagination(1)} >&gt;&gt;</button>
                </div>
                }
				      </div>
				    </div>
			    </div>
			</div>
		)
	}
}

export default AllTransactions;
