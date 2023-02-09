import React from 'react';
import PropTypes from 'prop-types';

import CheckInput from '../../Forms/CheckInput';
import FormsField from '../../Forms/FormsField';
import SelectBox from '../../Forms/SelectBox';
import { dateToMonthDDYYYY } from '../../../utils/helpers';
import { SELECT_OPTIONS_PERIOD } from '../../../utils/constants';

const TimePeriod = ({
  isEditable,
  from = '',
  to = '',
  onChange,
  embargoPeriod,
  setEmbargoPeriod,
  formsFieldProps,
  checkInputProps,
  selectBoxProps
}) => {
  let timePeriodClasses = 'time-period-container';
  if (isEditable) {
    timePeriodClasses += ' editable';
  }

  const formattedFrom = dateToMonthDDYYYY(from);
  const formattedTo = dateToMonthDDYYYY(to);

  const embargoCheckboxTemplate = setEmbargoPeriod
    ? (
      <FormsField
        title="30 days embargo period"
        className="embargo-period"
        {...formsFieldProps}
      >
        <CheckInput
          checked={embargoPeriod}
          onChange={setEmbargoPeriod}
          {...checkInputProps}
        />
      </FormsField>
    )
    : null;

  return (
    <div className={timePeriodClasses} data-testid="timePeriod">
      <div className="container">
        <div className="small-heading">Time period</div>
      </div>
      <div className="from">
        {isEditable
          ? (
            <>
              <SelectBox
                primary
                selectedValue={from}
                onChange={event => onChange(event.target.value)}
                options={SELECT_OPTIONS_PERIOD}
                {...selectBoxProps}
              />
              {embargoCheckboxTemplate}
            </>
          ) : (
            <>
              <p>From</p>
              <p className="date">{formattedFrom}</p>
            </>
          )}
      </div>
      {!isEditable && (
        <div className="to">
          <p>To</p>
          <p className="date">{formattedTo}</p>
        </div>
      )}
    </div>
  );
};

TimePeriod.propTypes = {
  isEditable: PropTypes.bool,
  from: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  to: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
  embargoPeriod: CheckInput.propTypes.checked,
  setEmbargoPeriod: CheckInput.propTypes.onChange,
  formsFieldProps: PropTypes.any,
  checkInputProps: PropTypes.any,
  selectBoxProps: PropTypes.any
};

export default TimePeriod;
