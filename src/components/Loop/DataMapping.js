export default function DataMapping(props) {
  let result = [];
  let unit = [];
  const title = props.id;

  //console.log(props);
  function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
  }

  unit = title.includes('TE')
    ? '°C'
    : title.includes('F1_FE') || title.includes('AK_P_FE') || title.includes('F2_FE')
        ? 'l/s'
      : title.includes('FE')
        ? 'l/m'
          : title.includes('PE')
            ? 'bar'
            : title.includes('PWM') || title.includes('O2')
              ? '%'
              : title.includes('RPM')
                ? 'rpm'
                : title.includes('QQ')
                  ? 'kWh'
                  : '';

  result = props.message ? props.message[props.id] : result;

  switch (props.id) {
    case 'AK_P_FE':
      result = result / 3600;
      break;
    case 'HV-001':
    case 'HV-002':
    case 'HV-003':
    case 'HV-004':    
    case 'HV-005':
    case 'HV-006':
    case 'HV-007':
    case 'HV-008':
    case 'HV-009':
    case 'HV-010':    
    case 'HV-011':
    case 'FI1_B':
    case 'FI1_H':
      result = result === 1 ? 'ON' : 'OFF';
      break;
    case 'P1_FE':
    case 'P2_FE':
    case 'P3_FE':
      result = (result * 1000) / 60;
      break;
    case 'P1_TE':
    case 'P2_TE':
    case 'P3_TE':  
      result = result - 273.15;
      break;
    default:
      break;
  }

  // result = props.points.find(element => element.id === props.id);

  var output;
  if (result || result === 0) {
    //console.log(result);
    output = isNaN(result) ? result : round(result, 2) + ' ' + unit;
  } else {
    //console.log('null');
    output = 'loading';
  }
  return output;
}