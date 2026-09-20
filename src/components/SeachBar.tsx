import Ionicons from "@react-native-vector-icons/ionicons";
import React, { useState } from "react";
import { TextInput, Text, TouchableOpacity, View } from "react-native";

interface ISearchBar {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  onSearch,
  placeholder = "Es hora de explorar el cosmos... con un solo término",
}: ISearchBar) {
  const [term, setTerm] = useState("");

  const handleSearchSubmit = () => {
    if (onSearch && term.trim()) {
      onSearch(term);
    }
  };

  const handleClear = () => {
    setTerm("");
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        width: "100%",
        marginTop: 15,
        paddingHorizontal: 16,
        paddingVertical: 10,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          borderRadius: 10,
          borderWidth: 0,
          paddingLeft: 12,
          paddingRight: 36,
          height: 46, 
          position: "relative",
          overflow: "hidden", 
        }}
      >
        <Ionicons name={"search"} size={20} />
        <TextInput
          placeholder={placeholder}
          value={term}
          onChangeText={setTerm}
          onSubmitEditing={handleSearchSubmit}
          returnKeyType="search"
          autoCorrect={false}
          multiline={false}
          placeholderTextColor={"#55555595"}
          style={{
            flex: 1,
            // color: "#E0E1DD",
            fontSize: 15,
            height: "100%",
            // --- ESTILOS CLAVE ANTI-TEMBLOR ---
            paddingVertical: 0,
            marginVertical: 0,
            alignSelf: "stretch",
            textAlignVertical: "center", // Alinea el texto en el centro exacto en Android
          }}
        />
      </View>

      <TouchableOpacity onPress={handleClear} activeOpacity={0.8}>
        <Ionicons name="trash-outline" size={18} />
      </TouchableOpacity>
    </View>
  );
}
