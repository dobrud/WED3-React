// @flow

import React from 'react'
import SelectOptions from './SelectOptions'

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
				<SelectOptions label="Year" defaultValue={this.getCurrentYear()} onChange={this.handleYearChange} 
				options={this.getYears( this.getCurrentYear() - 2 ).map( ( year ) => {return {label:year, value:year};})} />
				<SelectOptions label="Month" defaultValue={this.getCurrentMonth()} onChange={this.handleMonthChange} 
				options={this.getMonths().map( ( month ) => {return {label: month.emoji+'  '+month.name, value:month.key};})} />
			</form>
		);
	}
}

export default DateFilter;
