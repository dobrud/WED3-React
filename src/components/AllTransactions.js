// @flow

import React from 'react';
import TransactionList from './TransactionList';
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
    error: Error
  };

  state = {
    error: undefined
  };

  componentDidMount() {
    getTransactions(this.props.token).then(result => {
        this.setState({transactions: result.result});
    })
    .catch(error =>
        this.setState({error})
    );
  }

	render() {
      return (
        <div className="container">
          <div className="columns">
            <div className="column is-full">
              <div className="box no-shadow">
                <h2 className="title is-4">All Transactions</h2>
                <TransactionList transactions={this.state.transactions} showDate="true" />
              </div>
            </div>
          </div>
        </div>
      )
  }
}

export default AllTransactions;
