const intialState  = {
    data:[],
    Te_data:[]
}

const Reducer = (state=intialState,action)=>{
    console.log(state,"yyyy",action.payload);
    switch(action.type){
        case 'STUDENTS_RECORDS':
            return{
                ...state,
                data:action.payload
        }
        case "TEACHER_RECORDS":
                return{
                    ...state,
                    Te_data:action.payload
                }
        
        default:
            return state
    }
}

export default Reducer;