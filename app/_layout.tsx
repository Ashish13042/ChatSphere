import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import { LogtoProvider, LogtoConfig, UserScope } from '@logto/rn';
export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Outfit-ExtraBold': require('./../assets/fonts/Outfit-ExtraBold.ttf'),
  });

  const config: LogtoConfig = {
    endpoint: 'https://mdkbvi.logto.app/',
    appId: 'agaoov977m1z8yqgj3ag5',
    scopes:[
      UserScope.Email
    ]
  };

  return (
    <LogtoProvider config={config}>
    <Stack>
      <Stack.Screen name="Landing"
      options={{
        headerShown: false,
      }}/>
    </Stack>
    </LogtoProvider>
  );
}
