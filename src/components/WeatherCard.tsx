import React, {useState} from 'react'
import { fetchWeather } from '../api/fetchWeather'

type weather = {
  city: {
    name: string;
  }
  list: {
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
    }
    weather: {
      main: string;
      description: string;
      icon: string;
    }[]
    dt_txt: string;
}[];
};



export const WeatherCard: React.VFC = () => {
  const [data, setData] = useState<weather | null>(null);
  const [city, setCity] = useState<string | "">("");

  // 各都市のID
  const cityIds = {
    tokyo_id: '1850147',
    osaka_id: '1853909',
    nagoya_id: '1856057',
    hiroshima_id: '1862415',
    fukuoka_id: '1863967',
    sapporo_id: '2128295',
};

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = event.target.value;
      setCity(cityIds[selectedCity as keyof typeof cityIds]);
  };

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
      try {
        const result = await fetchWeather(city);
        console.log(result);
        setData(result);
      } catch (error) {
        console.error(error);
      }
  };

  const kelvinToCelsius = (kelvin: number) => {
    const celsius = kelvin - 273.15;
    const temp = Math.floor(celsius * 10) / 10;
    return temp
  };


  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
          <label>どこの予報を見る？：
        <select className="m-2" id="city" value={city} onChange={handleChange}>
            <option value="">都市を選んで</option>
            <option value="tokyo_id">東京</option>
            <option value="osaka_id">大阪</option>
            <option value="nagoya_id">名古屋</option>
            <option value="hiroshima_id">広島</option>
            <option value="fukuoka_id">福岡</option>
            <option value="sapporo_id">札幌</option>
        </select></label>
          <button className="px-4 py-2 m-2 text-white bg-green-300 rounded hover:bg-green-200">天気を見る</button>
        </form>
      {data && ( 
      <div className="relative h-56 m-auto bg-blue-500 shadow-2xl w-96 rounded-xl">
        <div className="absolute w-full px-8 top-6">
          <div className="flex justify-between">
            <div>
              <p className="font-light">City Name</p>
              <p className="text-lg font-medium tracking-widest">{data.city.name}</p>
            </div>
          </div>
          <div className="pt-2">
            <p className="font-light">Weather Condition</p>
            <p className="text-lg font-medium tracking-widest">{data.list[0].weather[0].description}</p>
          </div>
          <div className="pt-6 pr-6">
            <div className="flex justify-between">
              <div>
                <p className="text-xs font-light">Date</p>
                <p className="text-sm font-bold tracking-more-wider">
                  {data.list[0].dt_txt}
                </p>
              </div>
              <div>
                <p className="text-xs font-light">Temprature</p>
                <p className="text-sm font-bold tracking-more-wider">{kelvinToCelsius(data.list[0].main.temp)}℃</p>
              </div>
              <div>
                <p className="text-xs font-light">Humidity</p>
                <p className="text-sm font-bold tracking-more-wider">{data.list[0].main.humidity}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  )
}
