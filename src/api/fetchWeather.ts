import axios from "axios";

export const fetchWeather = async (city: string): Promise<any> => {
  
      try {
        const response = await axios.get(`${process.env.REACT_APP_OW_API_URL}/forecast/?id=${city}&lang=ja&APPID=${process.env.REACT_APP_OW_API_KEY}`);
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
