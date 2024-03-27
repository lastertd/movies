import asyncLogin from "./src/asyncLogin.js";
import asyncAuthorize from "./src/asyncAuthorize.js";
import asyncGetAttributeList from "./src/asyncGetAttributeList.js";
import asyncGetAttribute from "./src/asyncGetAttribute.js";
import asyncGetAttributes from "./src/asyncGetAttributes.js";
import asyncRegister from "./src/asyncRegister.js";
import asyncCheckEmail from "./src/asyncCheckEmail.js";
import asyncCheckUserName from "./src/asyncCheckUserName.js";
import asyncGetUserName from "./src/asyncGetUserName.js";


const database = {
    asyncLogin,
    asyncAuthorize,
    asyncGetAttributeList,
    asyncGetAttribute,
    asyncGetAttributes,
    asyncRegister,
    asyncCheckEmail,
    asyncCheckUserName,
    asyncGetUserName

}


export default database