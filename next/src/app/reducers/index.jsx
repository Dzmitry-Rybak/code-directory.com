const initialState = {
    dataFromJson: [],
    questionsLoadingStatus: 'loading',
    filter: 'remaining',
    stack: 'javascript',
    language: 'english',
    username: ''
}

const quesions = (state = initialState, action) => {
    switch (action.type) {
        case 'ADDING_FETCHED':
            return {
                ...state,
                dataFromJson: [...state.dataFromJson, action.payload]
            }
        case 'DATA_FETCHED':
            
            return {
                ...state,
                dataFromJson: [action.payload],
                questionsLoadingStatus: 'idle'
            }
        case 'DATA_FETCHING':
            return {
                ...state,
                questionsLoadingStatus: 'loading'
            }
        case 'DATA_FETCHING_ERROR':
            return {
                ...state,
                questionsLoadingStatus: 'error'
            }
        case 'FILTER_FETCHING':
            return {
                ...state,
                filter: action.payload
            }
        case 'STACK_FETCHED':
            return {
                ...state,
                stack: action.payload
            }
        case 'LANGUAGE_FETCHED':
            return {
                ...state,
                language: action.payload
            }
        case 'USERNAME_FETCHED':
                return {
                    ...state,
                    username: action.payload
                }
        default: return state;
        }
        
}

export default quesions;