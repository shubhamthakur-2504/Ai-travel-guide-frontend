import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sun, Cloud, CloudRain, Sunrise, Sunset, Calendar, Coffee, Moon, Info, Thermometer, Droplets } from "lucide-react";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  if (!location.state) navigate("/");
  const data = location.state?.itinerary;

  if (!data) {
    return (
      <div className="min-h-screen bg-linear-to-br from-indigo-950 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <Card className="bg-white/10 backdrop-blur-2xl border-0 p-8 text-center">
          <p className="text-white text-lg mb-4">No itinerary data found</p>
          <Button onClick={() => navigate("/")} className="bg-linear-to-r from-purple-500 to-pink-500">
            Go Back
          </Button>
        </Card>
      </div>
    );
  }

  const getWeatherIcon = (symbol) => {
    if (symbol <= 2) return <Sun className="w-6 h-6 text-yellow-300" />;
    if (symbol <= 5) return <Cloud className="w-6 h-6 text-gray-300" />;
    return <CloudRain className="w-6 h-6 text-blue-300" />;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-950 via-purple-900 to-pink-900 p-4 md:p-8 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            className="text-white hover:bg-white/10 hover:text-[#a735d7] mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Plan
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Your Perfect Itinerary</h1>
          <p className="text-purple-200">Everything you need for an amazing trip</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Itinerary */}
          <div className="lg:col-span-2 space-y-6">
            {data.itinerary.map((day) => (
              <Card key={day.day} className="bg-white/10 backdrop-blur-2xl border-0 overflow-hidden">
                <div className="bg-linear-to-r from-purple-500 to-pink-500 p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Day {day.day}</h2>
                      <p className="text-white/80 text-sm">
                        {data.weather[day.day - 1]?.date}
                      </p>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6 space-y-6">
                  {/* Morning */}
                  <div className="flex gap-4">
                    <div className="shrink-0">
                      <div className="bg-linear-to-br from-yellow-400 to-orange-400 p-3 rounded-xl">
                        <Coffee className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">Morning</h3>
                      <p className="text-white/80 leading-relaxed">{day.morning}</p>
                    </div>
                  </div>

                  {/* Afternoon */}
                  <div className="flex gap-4">
                    <div className="shrink-0">
                      <div className="bg-linear-to-br from-orange-400 to-red-400 p-3 rounded-xl">
                        <Sun className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">Afternoon</h3>
                      <p className="text-white/80 leading-relaxed">{day.afternoon}</p>
                    </div>
                  </div>

                  {/* Evening */}
                  <div className="flex gap-4">
                    <div className="shrink-0">
                      <div className="bg-linear-to-br from-purple-400 to-indigo-400 p-3 rounded-xl">
                        <Moon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">Evening</h3>
                      <p className="text-white/80 leading-relaxed">{day.evening}</p>
                    </div>
                  </div>

                  {/* Notes */}
                  {day.notes && (
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-purple-300 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-semibold text-white mb-1">Important Notes</h4>
                          <p className="text-sm text-white/70 leading-relaxed">{day.notes}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Weather Sidebar */}
          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-2xl border-0 sticky top-4">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Cloud className="w-6 h-6" />
                  Weather Forecast
                </h2>

                <div className="space-y-4">
                  {data.weather.map((weather, index) => (
                    <div key={weather.date} className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-white font-semibold">Day {index + 1}</p>
                          <p className="text-white/60 text-xs">{weather.date}</p>
                        </div>
                        {getWeatherIcon(weather.weather_symbol)}
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="bg-white/5 rounded-lg p-2">
                          <div className="flex items-center gap-2 text-white/60 mb-1">
                            <Thermometer className="w-4 h-4" />
                            <span className="text-xs">Avg Temp</span>
                          </div>
                          <p className="text-white font-semibold">{weather.temp_avg}°C</p>
                        </div>

                        <div className="bg-white/5 rounded-lg p-2">
                          <div className="flex items-center gap-2 text-white/60 mb-1">
                            <Droplets className="w-4 h-4" />
                            <span className="text-xs">Rainfall</span>
                          </div>
                          <p className="text-white font-semibold">{weather.precip_mm}mm</p>
                        </div>

                        <div className="bg-white/5 rounded-lg p-2">
                          <div className="flex items-center gap-2 text-white/60 mb-1">
                            <Sunrise className="w-4 h-4" />
                            <span className="text-xs">Sunrise</span>
                          </div>
                          <p className="text-white font-semibold text-xs">
                            {new Date(weather.sunrise).toLocaleTimeString('en-US', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>

                        <div className="bg-white/5 rounded-lg p-2">
                          <div className="flex items-center gap-2 text-white/60 mb-1">
                            <Sunset className="w-4 h-4" />
                            <span className="text-xs">Sunset</span>
                          </div>
                          <p className="text-white font-semibold text-xs">
                            {new Date(weather.sunset).toLocaleTimeString('en-US', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs">
                        <span className="text-white/60">Max: {weather.temp_max}°C</span>
                        <span className="text-white/60">Min: {weather.temp_min}°C</span>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => window.print()}
                  className="w-full mt-6 bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  Save Itinerary
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}