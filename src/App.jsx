import { Slider } from "./components/ui/slider";
import { Switch } from "./components/ui/switch";
import { Button } from "./components/ui/button";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
export default function App() {
  const [password, setPassword] = useState("Password");
  const [length, setLength] = useState(8);
  const [upper, setUpper] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbol, setSymbol] = useState(false);
  const [strength, setStrength] = useState("");

  function generatePassword() {
    let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let numberChars = "0123456789";
    let symbolChars = "!@#$%^&*()_+";
    let chars = "abcdefghijklmnopqrstuvwxyz";

    if (upper) chars += upperChars;
    if (number) chars += numberChars;
    if (symbol) chars += symbolChars;

    let password = "";
    for (let i = 0; i < length; i++) {
      let randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
    setPassword(password);
  }

  function checkStrength() {
    let strength = "Weak";
    if (length >= 8 && upper && number && symbol) {
      strength = "Very Strong";
    } else if (length >= 8 && (upper || number || symbol)) {
      strength = "Strong";
    } else if (length >= 6 && (upper || number || symbol)) {
      strength = "Moderate";
    }
    setStrength(strength);
  }

  return (
    <div style={{ fontFamily: "Inter" }}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Passmate</CardTitle>
          <CardDescription className="font-semibold text-base">
            Generate secure passwords
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-y-5">
          <div className="password flex align-middle justify-center w-full bg-secondary py-3 px-4 rounded-md text-[18px] font-semibold">
            {password}
          </div>
          <div className="strengthspec flex justify-between">
            <p className="text-lg font-semibold">Strength</p>
            <CardDescription className="text-lg font-semibold ">
              {strength}
            </CardDescription>
          </div>
          <div className="length">
            <div className="lenghtsepc flex justify-between">
              <p className="text-lg font-semibold">Charecter Length</p>
              <p className="text-lg font-semibold">{length}</p>
            </div>
            <div className="range mt-3.5">
              <Slider
                onValueChange={(i) => {
                  setLength(i);
                }}
                min={4}
                max={20}
                defaultValue={[8]}
              />
            </div>
          </div>

          <div className="toggles grid grid-cols-1 gap-y-3">
            <div className="toggle flex justify-between items-center">
              <label htmlFor="upper" className="text-lg font-semibold">
                Uppercase
              </label>
              <Switch
                id="upper"
                onCheckedChange={() => {
                  setUpper(!upper);
                }}
              />
            </div>
            <div className="toggle flex justify-between items-center">
              <label htmlFor="number" className="text-lg font-semibold">
                Number
              </label>
              <Switch
                id="number"
                onCheckedChange={() => {
                  setNumber(!number);
                }}
              />
            </div>
            <div className="toggle flex justify-between items-center">
              <label htmlFor="symbol" className="text-lg font-semibold">
                Symbol
              </label>
              <Switch
                id="symbol"
                onCheckedChange={() => {
                  setSymbol(!symbol);
                }}
              />
            </div>
          </div>
          <CardFooter className="grid grid-cols-1 gap-y-2 p-0 mt-2">
            <Button
              className="text-base"
              onClick={() => {
                generatePassword();
                checkStrength();
              }}
            >
              Generate
            </Button>
            <Button
              className="text-base"
              onClick={() => {
                navigator.clipboard.writeText(password);
                console.log("Coiped!");
              }}
            >
              Copy
            </Button>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}
