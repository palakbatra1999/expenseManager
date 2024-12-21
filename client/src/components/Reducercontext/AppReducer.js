export default (state, action) => {
    switch (action.type) {
        case "DELETE_TRANSACTION":
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction.id !==
                    action.payload
                )
            }
        case "ADD_TRANSACTION":
            return {
                ...state,
                transactions: [action.payload, ...state.transactions]
            }
        case "ADD_USER":
            return {
                ...state,
                users: [action.payload, ...state.users]
            }
        default:
            return state;
    }
}