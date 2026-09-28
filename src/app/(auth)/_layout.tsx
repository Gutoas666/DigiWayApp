import { Tabs } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Cores } from '@/constants/Cores'
import { Fontes } from '@/constants/Fontes'

export default function TabsLayout() {
  const insets = useSafeAreaInsets()
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarShowLabel: true,
      tabBarActiveTintColor: Cores.primariaEscura,
      tabBarInactiveTintColor: Cores.primariaClara,
      tabBarLabelStyle: { fontFamily: Fontes.baseMedio, fontSize: 11 },
      tabBarStyle: { backgroundColor: Cores.secundariaEscura, height: 64 + (insets.bottom || 0), paddingBottom: insets.bottom || 8, paddingTop: 7, borderTopWidth: 1, borderTopColor: Cores.secundariaBase },
    }}>
      <Tabs.Screen name="home" options={{ title: 'Inicial', tabBarIcon: ({ color }) => <MaterialIcons name="home" size={23} color={color} /> }} />
      <Tabs.Screen name="cursos" options={{ title: 'Cursos', tabBarIcon: ({ color }) => <MaterialIcons name="menu-book" size={23} color={color} /> }} />
      <Tabs.Screen name="perfil" options={{ title: 'Perfil', tabBarIcon: ({ color }) => <MaterialIcons name="person" size={23} color={color} /> }} />
      <Tabs.Screen name="sobre" options={{ title: 'Sobre', tabBarIcon: ({ color }) => <MaterialIcons name="info-outline" size={23} color={color} /> }} />
    </Tabs>
  )
}
