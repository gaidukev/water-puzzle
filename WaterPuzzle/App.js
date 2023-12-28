import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import WaterFlask from './components/WaterFlask';

export default function App() {
  const possibleColors = ["#EDD382", "#61185e", "#D72638", "#9882AC", "#C17817", "#2E6171", "#BAA898"]

  const colorConfigs = [["#EDD382", "#61185e", "#D72638", "#9882AC"], ["#EDD382", "#61185e", "#D72638", "#9882AC"],
  ["#EDD382", "#61185e", "#D72638", "#9882AC"], ["#EDD382", "#61185e", "#D72638", "#9882AC"],
  ["#EDD382", "#61185e", "#D72638", "#9882AC"], ["#EDD382", "#61185e", "#D72638", "#9882AC"],
  ["#EDD382", "#61185e", "#D72638", "#9882AC"]]
  return (
    <FlatList data={colorConfigs} numColumns={3}
              renderItem={( item ) => {
                return <WaterFlask colors={item}/>
              }}
              keyExtractor={(item, index) => index} />
      // <WaterFlask colors={["#EDD382", "#61185e", "#D72638", "#9882AC"]}/>
      // <WaterFlask colors={["#EDD382", "#61185e", "#D72638", "#9882AC"]}/>
      // <WaterFlask colors={["#EDD382", "#61185e", "#D72638", "#9882AC"]}/>
      // <WaterFlask colors={["#EDD382", "#61185e", "#D72638", "#9882AC"]}/>
      // <WaterFlask colors={["#EDD382", "#61185e", "#D72638", "#9882AC"]}/>
      // <WaterFlask colors={["#EDD382", "#61185e", "#D72638", "#9882AC"]}/>
      // <WaterFlask colors={["#EDD382", "#61185e", "#D72638", "#9882AC"]}/>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
