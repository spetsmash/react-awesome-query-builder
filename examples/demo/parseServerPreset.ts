const operators: any = {
  '==': 'equal',
  '!=': 'not_equal',
  '>': 'greater',
  '>=': 'greater_or_equal',
  in: 'in',
  '!in': 'not_in',
  contains: 'contains',
  not_contains: 'not_contains',
  '<': 'less',
  '<=': 'less_or_equal',
  between: 'between',
  not_in: 'not_in',
  is_not_empty: '!!',
  is_empty: '!',
  equal: '==',
  not_equal: '!=',
  greater: '>',
  less: '<',
  less_or_equal: '<=',
  greater_or_equal: '>='
};

const types: any = {
  gender: 'personal',
  personal: 'gender',
  isVerified: 'personal',
  status: 'personal',
  birthdate: 'personal',
  country: 'address',
  city: 'address',
  registrationIp: 'technical',
  lastLoginIp: 'technical',
  nodeId: 'technical',
  socialNetwork: 'personal',
  timezone: 'personal',
  createdAt: 'personal',
  lastVisitCountry: 'personal',
  lastVisitCity: 'personal',
  registeredAt: 'technical',
  lastVisitAt: 'technical',
  defaultLanguage: 'personal',
  confirmationEmailStatus: 'personal',
  confirmationPhoneStatus: 'personal',
  phoneNumberPrefix: 'personal',
  registrationFormName: 'personal',
  countryOfRegistration: 'personal',
  depositsAmount: 'financial',
  depositsCount: 'financial',
  depositsAvg: 'financial',
  withdrawalsAmount: 'financial',
  withdrawalsCount: 'financial',
  withdrawalsAvg: 'financial',
  betsAmount: 'gameStatistics',
  betsCount: 'gameStatistics',
  betsSumSpins: 'gameStatistics',
  betsAvgBySpins: 'gameStatistics',
  betsAvg: 'gameStatistics',
  betsCountGame: 'financial',
  betsCountGameType: 'financial',
  betsCountProvider: 'financial',
  winningsAmount: 'gameStatistics',
  winningsCount: 'financial',
  winningsAvg: 'financial',
  revenue: 'financial',
  hold: 'financial',
  ggr: 'gameStatistics',
  rtp: 'gameStatistics',
  firstDepositAmount: 'financial',
  lastDepositAmount: 'financial',
  firstWithdrawalAmount: 'financial',
  lastWithdrawalAmount: 'financial',
  firstDepositDate: 'financial',
  lastDepositDate: 'financial',
  firstWithdrawalDate: 'financial',
  lastWithdrawalDate: 'financial',
  firstDepositPaymentSystem: 'financial',
  lastDepositPaymentSystem: 'financial',
  firstWithdrawalPaymentSystem: 'financial',
  lastWithdrawalPaymentSystem: 'financial',
  firstDepositPaymentMethod: 'financial',
  lastDepositPaymentMethod: 'financial',
  firstWithdrawalPaymentMethod: 'financial',
  lastWithdrawalPaymentMethod: 'financial',
  accountValue: 'financial',
  accountLifetimeValue: 'financial',
  amount: 'financial',
  count: 'balance',
};

function reverseParseSimpleObject(obj: { [key: string]: any }) {
  let result: { [key: string]: any } = {};
  result[operators[obj.operator]] = [];

  let filter: { [key: string]: any } = {};
  filter.var = types[obj.filterName] + '.' + obj.filterName;
  result[operators[obj.operator]].push(filter);
  if (obj.value !== null) {
    let value = obj.value.toString().split(',');
    if (value.length === 1) {
      if (obj.operator === 'in' || obj.operator === 'between' || obj.operator === 'not_in') {
        result[operators[obj.operator]].push(value);
      } else {
        if (value[0] == 'true' || value[0] == 'false') {
          let bool = value[0] == 'true';
          result[operators[obj.operator]].push(bool);
        } else {
          result[operators[obj.operator]].push(value[0]);
        }
      }

    } else {
      if (obj.operator === 'between') {
        result[operators[obj.operator]].push(...value);
      } else {
        result[operators[obj.operator]].push(value);
      }

    }
  }
  return result;
}

function reverseParseComplexObject(obj: { [key: string]: any }) {
  let result: { [key: string]: any } = {};
  result.and = [];

  let filterName = types[obj.filterName] + '.' + obj.filterName;

  let keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    if (
      keys[i] !== 'type' &&
      keys[i] !== 'filterName' &&
      keys[i] !== 'operator'
    ) {
      if (keys[i] === 'dateFrom' || keys[i] === 'dateTo') continue;
      let filterPart: { [key: string]: any } = {};
      let filterData = [];

      let filter: { [key: string]: any } = {};
      filter.var = filterName + '.' + keys[i];
      filterData.push(filter);

      let value = obj[keys[i]].toString().split(',');
      if (value[0] === 'arbitrary') {
        filter.var = filterName + '.range';
        // let range = obj['dateFrom'].concat(', ', obj['dateTo']);
        // filterData.push(range);
        filterData.push(obj['dateFrom'], obj['dateTo']);
      } else {
        if (value.length === 1) {
          filterData.push(value[0]);
        } else {
          if (obj.operator === 'between') {
            filterData.push(...value);
          } else {
            filterData.push(value);
          }

        }
      }

      if (value[0] === 'arbitrary') {
        filterPart['between'] = filterData;
      } else {
        if (keys[i] === 'value') {
          filterPart[operators[obj.operator]] = filterData;
        } else {
          filterPart['=='] = filterData;
        }
      }


      result.and.push(filterPart);
    }
  }

  return result;
}

function reverseParseSection(obj: { [key: string]: any }) {
  let result: { [key: string]: any } = {};
  result[obj.logic.toLowerCase()] = [];
  for (let i = 0; i < obj.conditions.length; i++) {
    if (
      obj.conditions[i].type === 'preset' ||
      obj.conditions[i].type === 'group'
    ) {
      result[obj.logic.toLowerCase()].push(reverseParseSection(obj.conditions[i]));
    } else {
      let keys = Object.keys(obj.conditions[i]);
      if (keys.length === 4) {
        result[obj.logic.toLowerCase()].push(reverseParseSimpleObject(obj.conditions[i]));
      } else if (keys.length > 4) {
        result[obj.logic.toLowerCase()].push(reverseParseComplexObject(obj.conditions[i]));
      }
    }
  }
  return result;
}

export default reverseParseSection;
