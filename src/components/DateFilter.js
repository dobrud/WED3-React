// @flow

import React from 'react'

class DateFilter extends React.Component {
	props: Props;

	constructor( props ) {
		super( props );

		this.handleYearChange  = this.handleYearChange.bind( this );
		this.handleMonthChange = this.handleMonthChange.bind( this );
	}

	handleYearChange( e ) {
		this.props.onYearInput( e.target.value );
	}

	handleMonthChange( e ) {
		this.props.onMonthInput( e.target.value );
	}

	getCurrentYear() {
		return new Date().getFullYear();
	}

	getYears( beginYear ) {
		let years = [];

		while ( beginYear <= this.getCurrentYear() ) {
			years.push( beginYear++ );
		}

		return years;
	}

	getCurrentMonth() {
		return new Date().getMonth();
	}

	getMonths() {
		return [
			{
				key: 0,
				name:  'January',
				emoji: '❄️'
			},
			{
				key: 1,
				name:  'February',
				emoji: '❄️'
			},
			{
				key: 2,
				name:  'March',
				emoji: '🌱'
			},
			{
				key: 3,
				name:  'April',
				emoji: '🌱'
			},
			{
				key: 4,
				name:  'May',
				emoji: '🌱'
			},
			{
				key: 5,
				name:  'June',
				emoji: '☀️'
			},
			{
				key: 6,
				name:  'July',
				emoji: '☀️'
			},
			{
				key: 7,
				name:  'August',
				emoji: '☀️'
			},
			{
				key: 8,
				name:  'September',
				emoji: '🍂'
			},
			{
				key: 9,
				name:  'October',
				emoji: '🍂'
			},
			{
				key: 10,
				name:  'November',
				emoji: '🍂'
			},
			{
				key: 11,
				name:  'December',
				emoji: '❄️'
			}
		]
	}

	render() {
		return (
			<form>
				<h2 className="title is-5">Filter</h2>
				<div className="field">
					<label className="label">Year</label>
					<p className="control">
						<span className="select">
							<select
								defaultValue={this.getCurrentYear()}
								onChange={this.handleYearChange}
							>
								{ this.getYears( this.getCurrentYear() - 2 ).map( ( year ) => {
										return (
											<option value={year}>{year}</option>
										)
									}
								)}
							</select>
						</span>
					</p>
				</div>
				<div className="field">
					<label className="label">Month</label>
					<p className="control">
						<span className="select">
							<select
								defaultValue={this.getCurrentMonth()}
								onChange={this.handleMonthChange}
							>
								{ this.getMonths().map( ( month ) => {
										return (
											<option value={month.key}>{month.emoji}&nbsp;&nbsp;{month.name}</option>
										)
									}
								)}
							</select>
						</span>
					</p>
				</div>
			</form>
		);
	}
}

export default DateFilter;
