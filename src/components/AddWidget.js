import {React} from 'react';

export const AddWidget = (props) => {
    const {setShowWidgetOne} = props
    return <div id="add-widget" onClick={setShowWidgetOne(true)}>

    </div>
}