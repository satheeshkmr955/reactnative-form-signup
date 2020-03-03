import * as yup from "yup";
import { Formik } from "formik";

import React, { Component, Fragment } from "react";
import { TextInput, Text, Button, Alert, StyleSheet, View } from "react-native";

export default class App extends Component {
  render() {
    return (
      <View style={styles.screen}>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={values => Alert.alert(JSON.stringify(values))}
          validationSchema={yup.object().shape({
            email: yup
              .string()
              .email()
              .required(),
            password: yup
              .string()
              .min(6)
              .required()
          })}
        >
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit
          }) => (
            <View style={styles.formContainer}>
              <TextInput
                style={styles.textInput}
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={() => setFieldTouched("email")}
                placeholder="E-mail"
              />
              {touched.email && errors.email && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.email}
                </Text>
              )}
              <TextInput
                style={styles.textInput}
                value={values.password}
                onChangeText={handleChange("password")}
                placeholder="Password"
                onBlur={() => setFieldTouched("password")}
                secureTextEntry={true}
              />
              {touched.password && errors.password && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.password}
                </Text>
              )}
              <View style={styles.buttonContainer}>
                <Button
                  title="Sign In"
                  disabled={!isValid}
                  onPress={handleSubmit}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center"
  },
  formContainer: {
    margin: 20,
    padding: 10
  },
  textInput: {
    fontSize: 15,
    paddingVertical: 10,
    marginVertical: 10,
    borderBottomColor: "#333",
    borderBottomWidth: 1
  },
  buttonContainer: {
    alignItems: "center"
  }
});
