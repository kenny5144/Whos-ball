import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const categories = ["All", "Sports", "Music", "Fashion", "Tech", "Travel"];
const ageRanges = ["18-24", "25-34", "35-44", "45+"];
const locations = ["Nearby", "City", "Country"];
const sortOptions = ["Latest", "Oldest", "Trending"];

export default function FilterBar({ onApplyFilters }: any) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("Nearby");
  const [selectedSort, setSelectedSort] = useState("Latest");

  return (
    <View className="bg-white rounded-2xl p-4 shadow-lg">
      <Text className="text-lg font-bold mb-2">Filters</Text>

      {/* Categories */}
      <Text className="text-gray-700 font-semibold mb-1">Category</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-4"
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            className={`px-4 py-2 mr-2 rounded-full ${
              selectedCategory === cat ? "bg-blue-600" : "bg-gray-200"
            }`}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              className={`${selectedCategory === cat ? "text-white" : "text-gray-700"}`}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Age */}
      <Text className="text-gray-700 font-semibold mb-1">Age Range</Text>
      <View className="flex-row flex-wrap mb-4">
        {ageRanges.map((age) => (
          <TouchableOpacity
            key={age}
            className={`px-4 py-2 mr-2 mb-2 rounded-full ${
              selectedAge === age ? "bg-blue-600" : "bg-gray-200"
            }`}
            onPress={() => setSelectedAge(age)}
          >
            <Text
              className={`${selectedAge === age ? "text-white" : "text-gray-700"}`}
            >
              {age}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Location */}
      <Text className="text-gray-700 font-semibold mb-1">Location</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-4"
      >
        {locations.map((loc) => (
          <TouchableOpacity
            key={loc}
            className={`px-4 py-2 mr-2 rounded-full ${
              selectedLocation === loc ? "bg-blue-600" : "bg-gray-200"
            }`}
            onPress={() => setSelectedLocation(loc)}
          >
            <Text
              className={`${selectedLocation === loc ? "text-white" : "text-gray-700"}`}
            >
              {loc}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Sort By */}
      <Text className="text-gray-700 font-semibold mb-1">Sort By</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-4"
      >
        {sortOptions.map((opt) => (
          <TouchableOpacity
            key={opt}
            className={`px-4 py-2 mr-2 rounded-full ${
              selectedSort === opt ? "bg-blue-600" : "bg-gray-200"
            }`}
            onPress={() => setSelectedSort(opt)}
          >
            <Text
              className={`${selectedSort === opt ? "text-white" : "text-gray-700"}`}
            >
              {opt}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Apply Button */}
      <TouchableOpacity
        className="bg-blue-600 py-3 rounded-xl flex-row justify-center items-center"
        onPress={() =>
          onApplyFilters({
            category: selectedCategory,
            age: selectedAge,
            location: selectedLocation,
            sort: selectedSort,
          })
        }
      >
        <Ionicons name="filter" size={20} color="white" />
        <Text className="text-white text-lg ml-2">Apply Filters</Text>
      </TouchableOpacity>
    </View>
  );
}
