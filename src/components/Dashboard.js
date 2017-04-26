// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import NewTransaction from './NewTransaction';
import TransactionList from './TransactionList';
import { getAccountDetails, getTransactions } from '../api';

export type Props = {
  token: string,
}

class Dashboard extends React.Component {

  props: Props;

  state: {
    ownAccountAmount: string,
    transactions: Transaction[],
    error: Error
  };

  state = {
    ownAccountAmount: '',
    error: undefined
  };

  refreshTransactions() {
    getTransactions(this.props.token).then(result => {
      this.setState({transactions: result.result});
    })
    .catch(error =>
      this.setState({error})
    );
  }
  componentDidMount() {
    getAccountDetails(this.props.token).then(result => {
      this.setState({ownAccountAmount: result.amount});
      })
    .catch(error =>
      this.setState({error})
    );

    this.refreshTransactions();
  }

  updateOwnAccountAmount(ownAccountAmount) {
    this.setState({ownAccountAmount});
    this.refreshTransactions();
  }

  render() {
    return (
      <div className="container">
        <div className="columns">
          <div className="column is-one-third">
            <NewTransaction user={this.props.user} ownAccountAmount={this.state.ownAccountAmount} token={this.props.token} onAmountChange={this.updateOwnAccountAmount.bind(this)} />
          </div>
          <div className="column is-two-thirds">
            <div className="box no-shadow">
              <h2 className="title is-4">Latest Transactions</h2>
              <TransactionList transactions={this.state.transactions} />
              <Link to="/transactions">
                <button className="button is-info">All Transactions</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard
