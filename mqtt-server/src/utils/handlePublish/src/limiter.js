/*
这个对象将会对每一个设备的每一个上报属性设置一个最小间隔时间
 */


const limiter = {
    limitList: new Set(),
    add(username, clientID, attribute, timeout = 15000){
        const tmp = username.concat('-', clientID, '-', attribute);
        this.limitList.add(tmp);
        setTimeout( () => {
            this.limitList.delete(tmp);
        },timeout);

    },
    allow(username, clientID, attribute){
        const tmp = username.concat('-', clientID, '-', attribute);
        return !this.limitList.has(tmp)
    }
}



export default limiter