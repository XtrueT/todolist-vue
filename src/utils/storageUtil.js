/**
 * localStorage set() get() remove()
 * key: string
 * value: any
 * return 
 */

const storageUtil = {
    
    set:(key,value)=>localStorage.setItem(key,JSON.stringify(value)),
    get:(key,value)=>JSON.parse(localStorage.getItem(key,value)),
    remove:(key)=>localStorage.removeItem(key)
};

export default storageUtil;