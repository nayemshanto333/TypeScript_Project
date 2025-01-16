import { useState } from "react";

function App() {
  const [weight, setWeight] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  const getBMICategory = (bmi: number): string => {
    if (bmi < 18.5) return "Under Weight";
    if (bmi < 25) return "Normal Weight";
    if (bmi < 30) return "Over Weight";
    return "Obese";
  };
  const calculateBmi = ()=>{
    setError('')

    if(weight === '' || height === ''){
      setError('please enter both width & height ')
      return
    }
    if(weight <= 0 || height <= 0){
      setError('weight & height must be positive numbers')
      return
    }
    const heightMeters = height / 100
    const bmiValue = Number((weight / (heightMeters * heightMeters)).toFixed(1))
    setBmi(bmiValue)
  }

  const handleReset = ()=>{
    setWeight('')
    setHeight('')
    setBmi(null)
    setError('')
  }
  return (
    <div className="flex justify-center items-center min-h-screen px-5">
      <div className=" flex flex-col items-center  py-5 md:py-8 w-full max-w-md rounded-xl shadow-xl bg-gradient-to-b from-indigo-500 to-gray-200">
        <h1 className="text-2xl font-bold text-white mb-8 border-b-2 border-white pb-3">
          BMI Calculator
        </h1>
        <div className="space-y-3">
          <div className="space-y-2">
            <label
              htmlFor="weight"
              className="block text-sm font-medium text-white"
            >
              Weight (kg)
            </label>
            <input
              type="text"
              placeholder="Enter Weight"
              id="weight"
              value={weight}
              onChange={(e)=> setWeight(e.target.value ? Number(e.target.value) : '')}
              min={0}
              className="w-full px-4 py-3 rounded-lg  focus:right-2 focus:ring-blue-500 transition-all hover:scale-105 ease-in-out duration-200"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="height"
              className="block text-sm font-medium text-white"
            >
              Height (cm)
            </label>
            <input
              type="text"
              placeholder="Enter Weight"
              id="height"
              value={height}
              onChange={(e)=>setHeight(e.target.value ? Number(e.target.value): '')}
              min={0}
              className="w-full px-4 py-3 rounded-lg   focus:right-2 focus:ring-blue-500 transition-all hover:scale-105 ease-in-out duration-200"
            />
          </div>
          <div className="flex gap-2">
            <button onClick={calculateBmi} className=" px-6 py-2 bg-blue-500 text-center rounded-lg text-white transition-all hover:scale-105 ease-in-out duration-200">
              Calculate BMI
            </button>
            <button onClick={handleReset} className=" px-6 py-2 border border-blue-500 text-center rounded-lg text-gray-800 transition-all hover:scale-105 ease-in-out duration-200">
              Reset
            </button>
          </div>
          {error && (
            <div className="text-red-500 text-sm bg-red-300 rounded-md p-4">{error}</div>
          )}
          {bmi !== null && !error && (
            <div className="text-blue-50 bg-blue-700 rounded-md p-4">
              <p>
                Your BMI is <span className="font-bold">{bmi}</span>
              </p>
              <p>
                Catagory : <span>{getBMICategory(bmi)}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
