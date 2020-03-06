import AsynctStorage from '@react-native-community/async-storage';
const TOKEN_KEY = '@token';

export async function setToken(token) {
  return await AsynctStorage.setItem(TOKEN_KEY, token);
}

export async function cleanToken() {
  return await AsynctStorage.removeItem(TOKEN_KEY);
}

export async function getToken() {
  return await AsynctStorage.getItem(TOKEN_KEY);
}
