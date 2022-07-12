import React, { useState, useEffect, createContext } from 'react'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
  const navigation = useNavigation();
  const [listArr, setlistArr] = useState([])
  const [data, setData] = useState()

  const Login = async (uname, pass) => {

    await fetch(`http://10.0.2.2:5000/api/signIn`, {
      method: "POST",
      body: JSON.stringify({
        "username": uname,
        "password": pass
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status == 1) {
          AsyncStorage.setItem('data', JSON.stringify(response));
          navigation.navigate('Drawer');
        } else {
          alert(response.msg)
        }
      })
    isLoggedIn()
  }

  const logOutUser = async () => {
    try {
      await AsyncStorage.removeItem('data');
      setData()
      navigation.navigate('Signin');
    } catch (error) {
      console.log(error);
    }
    isLoggedIn();
  }

  const isLoggedIn = async () => {
    try {
      let Data = await AsyncStorage.getItem('data');
      Data = JSON.parse(Data);
      if (Data) {
        setData(Data);
      }
    } catch (e) {
      console.log(`is logged in error ${e}`);
    }
  };

  const bookSlot = async (building, room, SubName, sec, corsins, sttime, entime, value) => {
    await fetch(`http://10.0.2.2:5000/api/addSlot`, {
      method: "POST",
      body: JSON.stringify({
        "building_name": building,
        "class_name": room,
        "course": SubName,
        "section": sec,
        "teacher_name": corsins,
        "st_time": sttime,
        "end_time": entime,
        "day": value,
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status == 1) {
          navigation.navigate('Drawer');
          alert(response.msg)
        } else {
          alert(response.msg)

        }
      })
  }

  const viewSlots = async () => {
    fetch(`http://10.0.2.2:5000/api/listOfSlots`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status == 1) {
          setlistArr(response.slots)
        } else {
          alert(response.msg)
        }
      })
  }

  const deleteSlot = async (_id) => {
    await fetch(`http://10.0.2.2:5000/api/deleteSlot`, {
      method: "POST",
      body: JSON.stringify({
        "slot_id": _id,
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status == 1) {
          alert(response.msg)
        } else {
          alert(response.msg)
        }
      })
    viewSlots();
  }

  const updateSlot = async (_id) => {
    await fetch(`http://10.0.2.2:5000/api/updateSlot`, {
      method: "POST",
      body: JSON.stringify({
        "slot_id": _id,
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status == 1) {
          alert(response.msg)
        } else {
          alert(response.msg)
        }
      })
  }

  useEffect(() => {
    let isMount = true
    if (isMount) {
      isLoggedIn();
      viewSlots();
    }
    return () => {
      isMount = false
    };
  }, [])

  return (
    <AuthContext.Provider value=
      {{
        Login,
        bookSlot,
        viewSlots,
        deleteSlot,
        updateSlot,
        logOutUser,
        data,
        listArr
      }}
    >
      {children}
    </AuthContext.Provider >
  )
}

export default AuthProvider