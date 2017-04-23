// @flow

import React from 'react';
import { Link } from 'react-router-dom';

/*
  Use the api functions to call the API server. For example, the transactions
  can be retrieved and stored in the state as follows:

  getTransactions(this.props.token)
    .then(({result: transactions}) =>
      this.setState({transactions})
    )

  import { getAccountDetails, getAccount, transfer, getTransactions } from '../api'
*/

export type Props = {
  token: string,
}

class Dashboard extends React.Component {

  props: Props

  render() {

    return (
      <div className="container">
        <div className="columns">
          <div className="column is-one-third">
            <div className="box overlay-container">
              <div className="overlay is-hidden">
                <div className="Spinner">
                  <div className="Spinner-line Spinner-line--1">
                      <div className="Spinner-line-cog">
                          <div className="Spinner-line-cog-inner Spinner-line-cog-inner--left"></div>
                      </div>
                      <div className="Spinner-line-ticker">
                          <div className="Spinner-line-cog-inner Spinner-line-cog-inner--center"></div>
                      </div>
                      <div className="Spinner-line-cog">
                          <div className="Spinner-line-cog-inner Spinner-line-cog-inner--right"></div>
                      </div>
                  </div>
                  <div className="Spinner-line Spinner-line--2">
                      <div className="Spinner-line-cog">
                          <div className="Spinner-line-cog-inner Spinner-line-cog-inner--left"></div>
                      </div>
                      <div className="Spinner-line-ticker">
                          <div className="Spinner-line-cog-inner Spinner-line-cog-inner--center"></div>
                      </div>
                      <div className="Spinner-line-cog">
                          <div className="Spinner-line-cog-inner Spinner-line-cog-inner--right"></div>
                      </div>
                  </div>
                  <div className="Spinner-line Spinner-line--3">
                      <div className="Spinner-line-cog">
                          <div className="Spinner-line-cog-inner Spinner-line-cog-inner--left"></div>
                      </div>
                      <div className="Spinner-line-ticker">
                          <div className="Spinner-line-cog-inner Spinner-line-cog-inner--center"></div>
                      </div>
                      <div className="Spinner-line-cog">
                          <div className="Spinner-line-cog-inner Spinner-line-cog-inner--right"></div>
                      </div>
                  </div>
                  <div className="Spinner-line Spinner-line--4">
                      <div className="Spinner-line-cog">
                          <div className="Spinner-line-cog-inner Spinner-line-cog-inner--left"></div>
                      </div>
                      <div className="Spinner-line-ticker">
                          <div className="Spinner-line-cog-inner Spinner-line-cog-inner--center"></div>
                      </div>
                      <div className="Spinner-line-cog">
                          <div className="Spinner-line-cog-inner Spinner-line-cog-inner--right"></div>
                      </div>
                  </div>
              </div>
            </div>
            <div>
              <h2 className="title is-4">New Transaction</h2>
              <form>
                <div className="field">
                  <label className="label">From</label>
                  <p className="control">
                    <input className="input" value="AccountNr [AccountAmount CHF]" disabled />
                  </p>
                  <p className="help">Sender: ownAccount.owner.firstname ownAccount.owner.lastname</p>
                </div>
                <div className="field">
                  <label className="label">To</label>
                  <p className="control">
                    <input className="input" pattern=".{7,}" min="1000000" max="9999999" step="1" placeholder="Target Account Number" type="number" name="target" required />
                  </p>
                  <p className="help">Please specify the target account number</p>
                  <div>
                    <p className="help">Target Account number must have at least 7 digits</p>
                    <p className="help">You may not transact money to yourself</p>
                    <p className="help">Unknown Account number specified</p>
                    <p className="help">Recipient: owner.firstname owner.lastname</p>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Amount [CHF]</label>
                  <p className="control">
                    <input className="input" min="0.05" step="0.05" placeholder="Amount in CHF" type="number" name="amount" required />
                  </p>
                  <p className="help">Please specify the amount</p>
                  <p className="help">You can not overdraw your account. Please check your amount.</p>
                </div>
                <p><button className="button is-info">Send</button></p>
              </form>
            </div>
            <div>
              <h2 className="title is-4">Transfer successful</h2>
              <div className="notification is-success">
                <button className="delete"></button>
                <div className="content">
                  Successfully transferred latestTransactionAmount CHF to latestTransactionTarget.

                  <p>Your new balance is ownAccount.amount CHF.</p>
                </div>
                <p><button className="button is-white">New Transaction</button></p>
              </div>
            </div>
            <div>
              <h2 className="title is-4">Transfer failed</h2>
              <div className="notification is-danger">
                <button className="delete"></button>
                <div className="content">
                  Something went wrong with your transaction.
                </div>
                <p><button className="button is-white">New Transaction</button></p>
              </div>
            </div>
          </div>
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
