import React, {useState} from 'react'
import { fetchWeather } from '../api/fetchWeather'

type weather = {
  name: string;
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
};
  wind  : {
    speed: number;
};
};



export const WeatherCard: React.VFC = () => {
  const [data, setData] = useState<weather | null>(null);
  const [city, setCity] = useState<string | "">("");

  // 各都市の座標
  const cityIds = {
    tokyo_id: 'lat=35.6828387&lon=139.7594549',
    osaka_id: 'lat=35.6828387&lon=139.7594549',
    aichi_id: 'lat=35.6828387&lon=139.7594549',
    hiroshima_id: 'lat=35.6828387&lon=139.7594549',
    fukuoka_id: 'lat=35.6828387&lon=139.7594549',
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
            <option value="aichi_id">愛知</option>
            <option value="hiroshima_id">広島</option>
            <option value="fukuoka_id">福岡</option>
        </select></label>
          <button className="px-4 py-2 m-2 text-white bg-green-300 rounded hover:bg-green-200">天気を見る</button>
        </form>
      {data && ( 
      <div className="relative h-56 m-auto bg-blue-500 shadow-2xl w-96 rounded-xl">
        <div className="absolute w-full px-8 top-6">
          <div className="flex justify-between">
            <div>
              <p className="font-light">City Name</p>
              <p className="text-lg font-medium tracking-widest">{data.name}</p>
            </div>
          </div>
          <div className="pt-2">
            <p className="font-light">Weather Condition</p>
            <p className="text-lg font-medium tracking-widest">{data.weather[0].main}</p>
          </div>
          <div className="pt-6 pr-6">
            <div className="flex justify-between">
              <div>
                <p className="text-xs font-light">Date</p>
                <p className="text-sm font-bold tracking-more-wider">
                  today
                </p>
              </div>
              <div>
                <p className="text-xs font-light">Temprature</p>
                <p className="text-sm font-bold tracking-more-wider">{kelvinToCelsius(data.main.temp)}℃</p>
              </div>
              <div>
                <p className="text-xs font-light">Humidity</p>
                <p className="text-sm font-bold tracking-more-wider">{data.main.humidity}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  )
}
