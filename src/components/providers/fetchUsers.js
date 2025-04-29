import axios from "axios";

export const fetchUsers = async (search) => {
    let url = "https://v1.rocketapi.io/instagram/user/search";
    const requestConfig = {
        url: url,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token G39ABAF63GQulxjanaRw_A',
        },

        data: {
            query: search
        }

    };
    try {
        let response = await axios(requestConfig);
        return response?.data;
    } catch (err) {
        console.log("error:" + err);
        throw new Error(err);

    }
};


