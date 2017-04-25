// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import NewTransaction from './NewTransaction';
import { getAccountDetails } from '../api';

export type Props = {
  token: string,
}

class Dashboard extends React.Component {

  props: Props;

  state: {
    ownAccountAmount: number,
    error: Error
  };

  state = {
    ownAccountAmount: undefined,
    error: undefined
  };

  componentDidMount() {
    getAccountDetails(this.props.token).then(result => {
      console.log("Accountdetails result ", result);
      this.setState({ownAccountAmount: result.amount});
      })
    .catch(error =>
      this.setState({error})
    );
  }

  updateOwnAccountAmount(ownAccountAmount) {
    this.setState({ownAccountAmount});
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
