import axios from "axios";
const config = { headers: { "Content-type": "application/json" } };

export const UtilityResp = async (url,endpoint) => {
  let data;
  try {
    console.log(url);
    await axios
      .post(
        `http://localhost:4000/api/${endpoint}`,
        {
          url,
        },
        config
      )
      .then((res) => {
        data = res;
      });
  } catch (error) {
    console.log(error);
  }

  return data;
};