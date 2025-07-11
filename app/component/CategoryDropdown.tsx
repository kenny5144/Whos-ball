import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";

const CATEGORIES = ["Dating Advice", "Breakups", "First Dates", "Profiles"];

const CategoryDropdown = ({ selected, onSelect }: any) => {
  const [open, setOpen] = useState(false);
  const handleSelect = (category: string) => {
    onSelect({ val: category });
    setOpen(false);
  };

  return (
    <View className="mb-4">
      <View className="flex flex-row justify-between">
        <Text className="text-base font-medium flex items-center">
          Category
        </Text>
        <TouchableOpacity
          className=" bg-slate-300 px-6 py-3  rounded-lg flex-row items-center"
          onPress={() => setOpen(true)}
        >
          <Text className="text-base text-black">{selected}</Text>
          <Ionicons name="chevron-down-outline" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <Modal visible={open} transparent animationType="fade">
        <Pressable
          className="flex-1 bg-black/30 justify-center items-center"
          onPress={() => setOpen(false)}
        >
          <View className="bg-white rounded-xl w-72 p-4 shadow-xl">
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                className="py-3 px-4 rounded hover:bg-gray-100"
                onPress={() => handleSelect(cat)}
              >
                <Text className="text-gray-800">{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default CategoryDropdown;
