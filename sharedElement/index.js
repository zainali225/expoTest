import { createStackNavigator } from '@react-navigation/stack';
import ItemDetail from './ItemDetail';
import List from './List';

const Stack = createStackNavigator();

function SharedElement() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="ItemDetail" component={ItemDetail} /> 
    </Stack.Navigator>
  );
}

export default SharedElement