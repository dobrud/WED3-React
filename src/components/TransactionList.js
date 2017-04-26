// @flow

import React from 'react';
import TransactionRow from './TransactionRow';

class TransactionList extends React.Component {

  props: Props

  hasTransactions() {
    return this.props.transactions && 0 < this.props.transactions.length;
  };

  render() {
    return (
      <table className="table is-striped">
        <thead>
          <tr>
            { this.props.showDate &&
              <th>
                Date
              </th>
            }
            <th>
              Source
            </th>
            <th>
              Target
            </th>
            <th>
              Amount [CHF]
            </th>
            <th>
              Balance [CHF]
            </th>
          </tr>
        </thead>
        <tbody>
          { this.props.transactions && this.props.transactions.map((transaction, index) => {
            return (
                <TransactionRow key={index} transaction={transaction} showDate={this.props.showDate} />
              )
            }
          )}
          { !this.hasTransactions() &&
            <tr>
              <td colSpan="5">
                <div className="notification is-warning">
                  There are no transactions available to display.
                </div>
              </td>
            </tr>
          }
        </tbody>
      </table>
    )
  }
}

export default TransactionList;
