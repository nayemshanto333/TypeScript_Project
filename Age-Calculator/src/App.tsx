import { useState } from "react";

function App() {
  const [dob, setDob] = useState<string>("");
  const [age, setAge] = useState<{
    years: number;
    months: number;
    days: number;
  } | null>(null);
  const [error, setError] = useState<string>("");

  const calculateAge = () => {
    if (!dob) {
      setError("Please select a date");
      return;
    }
    const birthDate = new Date(dob);
    const today = new Date();

    if (birthDate > today) {
      setError(`Birthdate can't be in the future`);
      return;
    }
    setError("");

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDay() - birthDate.getDay();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    setAge({ years, months, days });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-5">
      <div className="bg-gradient-to-b w-full max-w-md rounded-xl shadow-xl py-6 md:py-8  from-indigo-500 to-blue-400 flex justify-center items-center">
        <div>
          <h1 className="text-3xl font-bold text-white text-center mb-8 border-b border-gray-400 pb-4">
            Age Calculator
          </h1>
          <div className="space-y-3">
            <div>
              <label
                htmlFor="dob"
                className="block text-sm font-medium text-white mb-1"
              >
                Date of Birth
              </label>
              <input
                id="dob"
                value={dob}
                onChange={(e) => {
                  setDob(e.target.value);
                  setError("");
                }}
                defaultValue="mm/dd/yyyy"
                type="date"
                className="w-full px-4 py-3 rounded-xl border hover:border-yellow-500  outline-none  hover:scale-105  duration-200 ease-in transition-all"
                max={new Date().toISOString().split("T")[0]}
              />
              {error && <p className="mt-1 text-red-600 text-sm">{error}</p>}
            </div>
            <button
              onClick={calculateAge}
              className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white rounded-lg font-semibold  hover:scale-105  duration-200 ease-in transition-all "
            >
              Calculate Age
            </button>

            {age && (
              <div className="mt-8">
                <p className="text-2xl font-bold text-center text-white">
                  {age.years} years {age.months} months {age.days} days
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
