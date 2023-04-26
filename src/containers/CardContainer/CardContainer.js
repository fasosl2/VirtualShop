import { Card } from "../../components/Card/Card";
import { useAppContext } from "../../storage/AppContext";
import { deleteProductFromChartAction, saveProductInChartAction } from "../../storage/actions";
export const CardContainer = (props) => {
    const {dispatch} = useAppContext()
    
    const handleClick = async (product,negativeValue,setItemLoading) => {
        setItemLoading(true);
        dispatch(negativeValue ? await deleteProductFromChartAction(dispatch,product,negativeValue) : await saveProductInChartAction(dispatch,product))
        setItemLoading(false);
    }
    return (
        <Card {...props} onClick={handleClick}/>
    );
}