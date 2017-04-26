// @flow

import React from 'react';

export type Props = {
  label: string,
  defaultValue:string,
  options: {label:string, value:string},
}

const SelectOptions = (props: Props) => (
  <div className="field">
    <label className="label">{props.label}</label>
    <p className="control">
        <span className="select">
            <select
                defaultValue={props.defaultValue}
                onChange={props.onChange}
            >
                { props.options.map( ( o, index) => {
                        return (
                            <option key={index} value={o.value}>{o.label}</option>
                        )
                    }
                )}
            </select>
        </span>
    </p>
</div>
)

export default SelectOptions