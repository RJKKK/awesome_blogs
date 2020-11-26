// import { resolve } from "path";
//
// function pathResolve(dir: string) {
//     return resolve(__dirname, ".", dir);
// }
// import {ResolvedConfig} from 'vite'
module.exports  =  {
    // alias: {
    //     "/@/": pathResolve("src"),
    // },
    optimizeDeps: {
        include: ["@ant-design/icons-vue","js-cookie","platform"],
    },
    proxy:{
        "/api":{
            target:'http://localhost:3001',
            changeOrigin:true,
            rewrite:path => path.replace(/^\/api/, '')
        }
    }

}
