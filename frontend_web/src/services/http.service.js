import axios from "axios";
const user = JSON.parse(localStorage.getItem("user"));
const commonConfig = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};

export default (baseURL,auth=false) => {
    const http = axios.create({
        baseURL,
        ...commonConfig,
    });
    if(auth){
        http.interceptors.request.use((config) => {
			if (user) {
				config.headers.token = `Bearer ${user.accessToken}`;
			}
			return config;
		});
    }
    return http;
};