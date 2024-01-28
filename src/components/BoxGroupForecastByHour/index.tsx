import React from 'react';
import { LoadingStates } from '../../@types/appTypes';
import useWeather from '../../hooks/useWeather';
import { CityContext } from '../../providers/CityContext';
import GroupForecastByHour from '../GroupForecastByHour';

export default function BoxGroupForecastByHour() {
  const { nameCity } = React.useContext(CityContext);
  const { weather, loading, error } = useWeather(nameCity);

  if (loading === LoadingStates.PENDING) {
    return (
      <div className="box-group-forecasts">
        <p className="box-group-forecasts__message">Loading forecasts...</p>
      </div>
    );
  }

  if (loading === LoadingStates.ERROR) {
    return (
      <div className="box-group-forecasts">
        <p className="box-group-forecasts__message">{error?.message}</p>
      </div>
    );
  }

  return (
    <div className="box-group-forecasts">
      <GroupForecastByHour weather={weather} />
    </div>
  );
}
