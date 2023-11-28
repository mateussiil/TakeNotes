export const APP_ENV = "development";
export const HOST =
  APP_ENV === "development"
    ? "http://192.168.192.1:3001/api/v1"
    : "https://ts-dev-api.glootie.ml";