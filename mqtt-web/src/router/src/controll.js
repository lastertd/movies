import viewControll from "@/views/controll/view-controll";
import controllAttribute from "@/views/controll/child/controll-attribute";

const item = {
    path:"/controll/:userName",
    component:viewControll,
    children:[
        {
            name:"attributes",
            path: "attributes",
            component: controllAttribute
        }
    ]
    
}

export default item