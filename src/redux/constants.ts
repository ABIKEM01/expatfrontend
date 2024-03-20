// const API_BASEURL =
//   process.env.NODE_ENV === "production"
//     ? process.env.NEXT_PUBLIC_API_URL_PROD
//     : process.env.NEXT_PUBLIC_API_URL_DEV;

const API_BASEURL = 'https://expatbackend.onrender.com/api/v1'

export let BASE_URL= ''

const env = process.env.NODE_ENV
if(env == "development"){
    BASE_URL = 'http://localhost:3000'
}
else if (env == "production"){
    BASE_URL = 'https://expatswap.vercel.app/'
}


export default API_BASEURL;