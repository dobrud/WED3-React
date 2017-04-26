// @flow

import React from 'react';
import { formatDate, formatAmount } from '../helpers';

class TransactionList extends React.Component {

  props: Props

  state: {
    isProcessing: boolean
  }

  state = {
    isProcessing: true
  }

  hasTransactions() {
    return this.props.transactions && 0 < this.props.transactions.length;
  };

  componentDidRecieveProps() {
    this.setState({isProcessing: false});
  }

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
          { this.props.transactions && this.props.transactions.map((transaction) => {
            return (
                <tr key={transaction.date}>
                  { this.props.showDate &&
                    <td><strong>{formatDate(transaction.date)}</strong></td>
                  }
                  <td>{transaction.from}</td>
                  <td>{transaction.target}</td>
                  <td style={{textAlign:'right'}}>{formatAmount(transaction.amount)}</td>
                  <td style={{textAlign:'right'}}>{formatAmount(transaction.total)}</td>
                </tr>
              )
            }
          )}
          { !this.state.isProcessing && !this.hasTransactions() &&
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
