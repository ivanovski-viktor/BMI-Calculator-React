import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    name: "Guest",
    weight: 90,
    height: 180,
    bmi: 27,
    message: "",
    optimalweight: "",
    recommendedCalories: 0,
    submitted: false,
  };

  heightchange = (e) => {
    this.setState({ height: e.target.value });
  };

  weightchange = (e) => {
    this.setState({ weight: e.target.value });
  };

  calculateBMI = () => {
    const heightSquared = ((this.state.height / 100) * this.state.height) / 100;
    const bmi = this.state.weight / heightSquared;
    const low = Math.round(18.5 * heightSquared);
    const high = Math.round(24.99 * heightSquared);
    let message = "";
    if (bmi >= 18.5 && bmi <= 24.99) {
      message = "You are in a healthy weight range";
    } else if (bmi >= 25 && bmi <= 29.9) {
      message = "You are overweight";
    } else if (bmi >= 30) {
      message = "You are obese";
    } else if (bmi < 18.5) {
      message = "You are underweight";
    }
    this.setState({ message });
    this.setState({
      optimalweight: `Your suggested weight range is between ${low} - ${high}kg`,
    });
    this.setState({ bmi: Math.round(bmi * 100) / 100 });

    // Calculate recommended calories
    this.calculateRecommendedCalories(bmi);

    // Mark the form as submitted
    this.setState({ submitted: true });
  };

  calculateRecommendedCalories = (bmi) => {
    let recommendedCalories = 0;
    const normalBMIRange = { min: 18.5, max: 24.99 };
    const calorieMultiplier = 25;

    if (bmi >= normalBMIRange.min && bmi <= normalBMIRange.max) {
      recommendedCalories = Math.round(calorieMultiplier * this.state.weight);
    } else {
      recommendedCalories = Math.round(
        calorieMultiplier * this.state.weight * 0.8
      );
    }

    this.setState({ recommendedCalories });
  };

  submitMe = (e) => {
    e.preventDefault();
    this.calculateBMI();
  };

  change = (e) => {
    this.setState({ name: e.target.value });
  };

  render() {
    const { submitted } = this.state;

    return (
      <div className="App">
        <div className="mainBanner">
          <div className="bannerInfo">
            <h1>
              Check your <strong>BMI</strong>
            </h1>
            <h2>
              <strong>How healthy</strong> are <span>YOU?</span>
            </h2>
            <button>
              <a href="#App-header">
                Go to <strong>BMI Calculator</strong>{" "}
                <i className="bi bi-chevron-right"></i>
              </a>
            </button>
          </div>
          <div className="bannerImg"></div>
        </div>
        <div id="App-header" className="App-header">
          <h2>BMI Calculator</h2>
        </div>
        <form onSubmit={this.submitMe}>
          <div className="dataContainer">
            <div className="inputData">
              <label>Please enter your name</label>
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.change}
              />
              <label>Enter your height in cm:</label>
              <input
                type="text"
                name="height"
                value={this.state.height}
                onChange={this.heightchange}
              />

              <label>Enter your weight in kg :</label>
              <input
                type="text"
                name="weight"
                value={this.state.weight}
                onChange={this.weightchange}
              />
              <input type="submit" value="Submit" />
            </div>
            <div className="outputData">
              <label className={submitted ? "rendered" : "hidden"}>
                {this.state.checked} Hello {this.state.name}, Your BMI is{" "}
                {this.state.bmi}{" "}
              </label>
              <label className={submitted ? "rendered" : "hidden"}>
                {this.state.message}
              </label>
              <label className={submitted ? "rendered" : "hidden"}>
                {this.state.optimalweight}
              </label>
              <label
                className={submitted ? "recomendedCalories rendered" : "hidden"}
              >
                Recommended Calorie Intake:
              </label>
              <label className={submitted ? "rendered" : "hidden"}>
                <i className="bi bi-fire"></i>
                {this.state.recommendedCalories} kcal
              </label>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
