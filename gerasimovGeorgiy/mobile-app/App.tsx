import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CounterScreen from './src/screens/Counter/CounterScreen';
import HelloWorldScreen from './src/screens/HelloWorld/HelloWorldScreen';
import AboutScreen from './src/screens/About/AboutScreen';
import { colors } from './src/theme/colors';

const Tab = createBottomTabNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.background,
    text: colors.textPrimary,
    border: colors.card,
    primary: colors.accent,
  },
};

export default function App() {
  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.textPrimary,
          tabBarStyle: {
            backgroundColor: colors.background,
            borderTopColor: colors.card,
          },
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.textSecondary,
        }}
      >
        <Tab.Screen name="Counter" component={CounterScreen} options={{ title: 'Counter' }} />
        <Tab.Screen name="Labs" component={HelloWorldScreen} options={{ title: 'Labs' }} />
        <Tab.Screen name="About" component={AboutScreen} options={{ title: 'About' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
