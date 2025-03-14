import GlobalApi from "@/services/GlobalApi";
import { useLogto } from "@logto/rn";
import { Redirect } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const { getIdTokenClaims, isAuthenticated } = useLogto();
  useEffect(() => {
    if (isAuthenticated) {
      getIdTokenClaims().then(async(userData) => {
        console.log("--",userData)
        if(userData?.email){
          const result=await GlobalApi.GetUserByEmail(userData?.email); 
          console.log(result.data.data);//to get starpi data in response
          //Insert new record
          const data={
            email:userData.email,
            name:userData.name,
            picture:userData.picture
          }
          const resp=await GlobalApi.CreateNewUser(data);
          console.log(resp.data);
        }
      });
    } 
  }, [isAuthenticated]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/*<Redirect href={"/Landing"}/>*/}
    </View>
  );
}
