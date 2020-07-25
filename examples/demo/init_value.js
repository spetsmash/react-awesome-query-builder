export default
{
    "id": "ab888888-0123-4456-b89a-b1734c7539c4",
    "type": "group",
    "children1": {
        "8b8899ab-0123-4456-b89a-b1734c75e18d": {
            "type": "rule",
            "properties": {
                "operator": "select_equals",
                "valueType": [
                    "select"
                ],
                "value": [
                    "1"
                ],
                "validity": true,
                "valueSrc": [
                    "value"
                ],
                "field": "personal.gender",
                "touched": true
            }
        },
        "8898aba8-cdef-4012-b456-71734c75f2a5": {
            "type": "rule",
            "properties": {
                "operator": "select_equals",
                "valueType": [
                    "select"
                ],
                "value": [
                    "0"
                ],
                "validity": true,
                "valueSrc": [
                    "value"
                ],
                "field": "personal.gender",
                "touched": true
            }
        }
    },
    "properties": {
        "numberOfRules": 2,
        "conjunction": "AND"
    }
}
// {
//     "type": "group",
//     "id": "98bb8bba-cdef-4012-b456-71720942bcad",
//     "children1": {
//         "89bbaa8b-cdef-4012-b456-7172dc5c1329": {
//             "type": "rule_group",
//             "properties": {
//                 "conjunction": "AND",
//                 "field": "financial.depositsAmount",
//                 "validity": true
//             },
//             "children1": {
//                 "8bba8ba9-89ab-4cde-b012-3172dc5c26c1": {
//                     "type": "rule",
//                     "properties": {
//                         "field": "financial.depositsAmount.currency",
//                         "operator": "select_equals",
//                         "value": [
//                             "0"
//                         ],
//                         "valueSrc": [
//                             "value"
//                         ],
//                         "valueType": [
//                             "select"
//                         ],
//                         "validity": true
//                     }
//                 },
//                 "99b98b89-4567-489a-bcde-f172dc5c2f01": {
//                     "type": "rule",
//                     "properties": {
//                         "field": "financial.depositsAmount.period",
//                         "operator": "select_equals",
//                         "value": [
//                             "last_month"
//                         ],
//                         "valueSrc": [
//                             "value"
//                         ],
//                         "valueType": [
//                             "select"
//                         ],
//                         "validity": true
//                     }
//                 },
//                 "bb9899a9-0123-4456-b89a-b172dc5c3981": {
//                     "type": "rule",
//                     "properties": {
//                         "field": "financial.depositsAmount.value",
//                         "operator": "equal",
//                         "value": [
//                             123
//                         ],
//                         "valueSrc": [
//                             "value"
//                         ],
//                         "valueType": [
//                             "number"
//                         ],
//                         "validity": true,
//                         "errorMessage": false
//                     }
//                 }
//             }
//         },
//         "8b8aba9a-cdef-4012-b456-71734c64a551": {
//             "type": "rule",
//             "properties": {
//                 "operator": "select_equals",
//                 "valueType": [
//                     "select"
//                 ],
//                 "value": [
//                     "1"
//                 ],
//                 "validity": true,
//                 "valueSrc": [
//                     "value"
//                 ],
//                 "field": "personal.gender",
//                 "touched": true
//             }
//         }
//     },
//     "properties": {
//         "conjunction": "AND",
//         "numberOfRules": 2
//     }
// }
