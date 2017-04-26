// @flow

import React from 'react';

import { getAccount, transfer } from '../api';
import { formatAmount } from '../helpers';
import { Spinner } from './Spinner';

class NewTransaction extends React.Component {

  props: Props

  state: {
    targetAccountNr?: AccountNr,
    targetAccount?: Account,
    targetAccountHelp?: string,
    targetAccountState?: string,
    amount?: Number,
    amountHelp?: string,
    amountState?: string,
    isProcessing: boolean,
    transferSuccessful: boolean,
    transferFailed: boolean,
  }

  state = {
    targetAccountNr: '',
    targetAccountOwner: null,
    targetAccountHelp: <p className="help">Please specify the target account number</p>,
    targetAccountState: '',
    amount: '',
    amountHelp: <p className="help">Please specify the amount</p>,
    amountState: '',
    isProcessing: false,
    transferSuccessful: false,
    transferFailed: false,
  }

  hasMinimumLength(value) {
    return 1000000 <= Number.parseInt(value, 10);
  }

  isOtherAccount(value) {
    return this.props.user.accountNr !== value;
  }

  handleTargetAccountChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      const value = event.target.value;
      this.setState({targetAccountNr: value});
      if(!this.hasMinimumLength(value)) {
        this.setState({targetAccountState: 'is-danger', targetAccountHelp: <p className="help is-danger">Target Account number must have at least 7 digits</p>});
        return;
      }

      if(!this.isOtherAccount(value)) {
        this.setState({targetAccountState: 'is-danger', targetAccountHelp: <p className="help is-danger">You may not transact money to yourself</p>});
        return;
      }

      getAccount(value, this.props.token).then(({accountNr, owner}) => {
        this.setState({targetAccountOwner: owner, targetAccountState: 'is-success', targetAccountHelp: <p className="help is-success">Recipient: {owner.firstname} {owner.lastname}</p>});
      })
      .catch((error) => {
        this.setState({targetAccountState: 'is-danger', targetAccountHelp: <p className="help is-danger">Unknown Account number specified</p>});
      });

    }
  };

  handleAmountChanged = (event: Event) => {
    const value = event.target.value;
    this.setState({amount: value});

    if (value <= 0 || value === '') {
      this.setState({amountState: 'is-danger', amountHelp: <p className="help is-danger">Please specify the amount</p>});
    } else if (parseInt(this.props.ownAccountAmount, 10) < value) {
      this.setState({amountState: 'is-danger', amountHelp: <p className="help is-danger">You can not overdraw your account. Please check your amount.</p>});
    } else if ( 0 < value ){
      this.setState({amountState: 'is-success', amountHelp: ''});
    } else {
      this.setState({amountState: '',  amountHelp: ''});
    }
  }

  handleSubmit = (event: Event) => {
    event.preventDefault();
    this.setState({isProcessing: true});
    const { targetAccountNr, amount } = this.state;
    transfer(targetAccountNr, amount, this.props.token).then(result => {
      console.log("Transfer result ", result)
      this.props.onAmountChange(result.total);
      this.setState({isProcessing: false, transferFailed: false, transferSuccessful: true});
    })
    .catch(error => {
      this.setState({error, transferFailed: true})
    });
  }

  newTransaction = (event: Event) => {
    this.setState({
      targetAccountNr: '',
      targetAccountOwner: null,
      targetAccountHelp: <p className="help">Please specify the target account number</p>,
      targetAccountState: '',
      amount: '',
      amountHelp: <p className="help">Please specify the amount</p>,
      amountState: '',
      isProcessing: false,
      transferSuccessful: false,
      transferFailed: false,
    });
  }

  render() {
    return (
      <div className="box overlay-container">
        { this.state.isProcessing &&
          <Spinner />
      }
      { !this.state.transferSuccessful && !this.state.transferFailed &&
        <div>
          <h2 className="title is-4">New Transaction</h2>
          <form>
            <div className="field">
              <label className="label">From</label>
              <p className="control">
                <input className="input" value={this.props.user.accountNr + " [" + formatAmount(this.props.ownAccountAmount) + " CHF]"} disabled />
              </p>
              <p className="help">Sender: {this.props.user.firstname} {this.props.user.lastname}</p>
            </div>
            <div className="field">
              <label className="label">To</label>
              <p className="control">
                <input className={`input + ${this.state.targetAccountState}`} pattern=".{7,}" min="1000000" max="9999999" step="1" placeholder="Target Account Number" type="number" name="target" value={this.state.targetAccountNr} onChange={this.handleTargetAccountChanged} required />
              </p>
              { this.state.targetAccountHelp }
            </div>
            <div className="field">
              <label className="label">Amount [CHF]</label>
              <p className="control">
                <input className={`input + ${this.state.amountState}`} min="0.05" step="0.05" placeholder="Amount in CHF" type="number" name="amount" value={this.state.amount} onChange={this.handleAmountChanged} required />
              </p>
              { this.state.amountHelp }
            </div>
            <p><button className="button is-info" onClick={this.handleSubmit} disabled={!(this.state.targetAccountState === 'is-success' && this.state.amountState === 'is-success')}>Send</button></p>
          </form>
        </div>
      }
      { this.state.transferSuccessful &&
        <div>
          <h2 className="title is-4">Transfer successful</h2>
          <div className="notification is-success">
            <button className="delete" onClick={this.newTransaction}></button>
            <div className="content">
              Successfully transferred {this.state.amount} CHF to {this.state.targetAccountNr}.

              <p>Your new balance is {this.props.ownAccountAmount} CHF.</p>
            </div>
            <p><button className="button is-white" onClick={this.newTransaction}>New Transaction</button></p>
          </div>
        </div>
      }
      { this.state.transferFailed &&
        <div>
          <h2 className="title is-4">Transfer failed</h2>
          <div className="notification is-danger">
            <button className="delete" onClick={this.newTransaction}></button>
            <div className="content">
              Something went wrong with your transaction.
            </div>
            <p><button className="button is-white" onClick={this.newTransaction}>New Transaction</button></p>
          </div>
        </div>
      }
    </div>
    )
  }
}

export default NewTransaction;
