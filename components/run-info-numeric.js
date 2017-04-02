import { RunInfo } from './run-info';
import { connect } from 'react-redux';

export class RunInfoNumeric extends RunInfo {
  formatValue() {
    return [this.props.value.toFixed(2), this.props.unit].join(' ');
  }
}

export default connect((state, own) => {
  return { value: state[own.type] };
})(RunInfoNumeric);
