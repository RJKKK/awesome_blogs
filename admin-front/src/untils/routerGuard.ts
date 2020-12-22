import {get} from 'js-cookie'
export async function checkLogin() {
    return new Promise((resolve,reject) => {
        if(get('token')){
            resolve(1);
        }else{
            reject(new Error('/login'))
        }
    } )
}