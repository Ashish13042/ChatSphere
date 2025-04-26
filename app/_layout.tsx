import { router, Stack } from "expo-router";
import { useFonts } from 'expo-font';
export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Outfit-ExtraBold': require('./../assets/fonts/Outfit-ExtraBold.ttf'),
  });

  return (
    
    <Stack screenOptions={{headerShown:false}}> 
     
    </Stack>
  );
}
