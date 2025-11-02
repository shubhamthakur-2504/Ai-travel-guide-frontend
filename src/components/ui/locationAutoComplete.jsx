import { useState, useEffect } from "react";
import axios from "axios";
import { MapPin, Search, Loader2 } from "lucide-react";

export default function LocationAutocomplete({ onSelect }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selected || query.length < 2) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const fetchSuggestions = async () => {
      try {
        const res = await axios.get(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&limit=5&apiKey=${import.meta.env.VITE_PLACE_API_KEY}`
        );
        setSuggestions(res.data.features);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(fetchSuggestions, 400);
    return () => clearTimeout(timeout);
  }, [query, selected]);

  const handleSelect = (place) => {
    setQuery(place.properties.formatted);
    setSelected(true);
    setSuggestions([]);
    onSelect({
      name: place.properties.formatted,
      lat: place.properties.lat,
      lon: place.properties.lon,
    });
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    setSelected(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          {loading ? (
            <Loader2 className="w-5 h-5 text-purple-300 animate-spin" />
          ) : (
            <Search className="w-5 h-5 text-purple-300" />
          )}
        </div>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search destination..."
          className="w-full bg-white/5 border border-white/20 text-white placeholder:text-white/40 h-12 pl-12 pr-4 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all outline-none"
        />
      </div>

      {suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-gray-900/90 backdrop-blur-2xl border border-white/20 rounded-xl overflow-hidden shadow-2xl">
          <ul className="max-h-64 overflow-y-auto">
            {suggestions.map((place, index) => (
              <li
                key={place.properties.place_id}
                onClick={() => handleSelect(place)}
                className={`px-4 py-3 text-white hover:bg-white/10 cursor-pointer transition-all duration-200 flex items-start gap-3 group ${
                  index !== suggestions.length - 1 ? "border-b border-white/10" : ""
                }`}
              >
                <MapPin className="w-5 h-5 text-purple-300 mt-0.5 shrink-0 group-hover:text-pink-300 transition-colors" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{place.properties.name || place.properties.formatted}</p>
                  <p className="text-xs text-white/60 truncate">{place.properties.formatted}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}