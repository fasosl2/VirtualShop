import { Card } from "../../components/Card/Card";
import { useAppContext } from "../../storage/AppContext";
import { deleteProductAction, deleteProductsFromChartAction, saveProductsInChartAction } from "../../storage/actions";
export const CardContainer = (props) => {
    const {dispatch} = useAppContext();
    
    const handleClick = {
        delete: async (product,setItemLoading) => {
            setItemLoading(true);
            await deleteProductAction(dispatch, product);
            setItemLoading(false);
        },
        chart: async (product,negativeValue,setItemLoading) => {
        setItemLoading(true);
        dispatch(negativeValue ? await deleteProductsFromChartAction(dispatch,product,negativeValue) : await saveProductsInChartAction(dispatch,product))
        setItemLoading(false);
    }
}
    return (
        <Card {...props} onClick={handleClick}/>
    );
}