import { Slider } from "./components/ui/slider";
import { Switch } from "./components/ui/switch";
import { Button } from "./components/ui/button";
import { useState, useCallback } from "react";
import { Toaster, toast } from "sonner";
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

  const generatePassword = useCallback(() => {
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
  }, [length, upper, number, symbol]);

  const checkStrength = useCallback(() => {
    let strength = "Weak";
    if (length >= 8 && upper && number && symbol) {
      strength = "Very Strong";
    } else if (length >= 8 && (upper || number || symbol)) {
      strength = "Strong";
    } else if (length >= 6 && (upper || number || symbol)) {
      strength = "Moderate";
    }
    setStrength(strength);
  }, [length, upper, number, symbol]);

  const handleLengthChange = useCallback((i) => {
    setLength(i);
  }, []);

  const toggleUpper = useCallback(() => {
    setUpper(!upper);
  }, [upper]);

  const toggleNumber = useCallback(() => {
    setNumber(!number);
  }, [number]);

  const toggleSymbol = useCallback(() => {
    setSymbol(!symbol);
  }, [symbol]);

  const handleGenerateClick = useCallback(() => {
    generatePassword();
    checkStrength();
  }, [generatePassword, checkStrength]);

  const handleCopyClick = useCallback(() => {
    navigator.clipboard.writeText(password);
  }, [password]);

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
                onValueChange={handleLengthChange}
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
              <Switch id="upper" onCheckedChange={toggleUpper} />
            </div>
            <div className="toggle flex justify-between items-center">
              <label htmlFor="number" className="text-lg font-semibold">
                Number
              </label>
              <Switch id="number" onCheckedChange={toggleNumber} />
            </div>
            <div className="toggle flex justify-between items-center">
              <label htmlFor="symbol" className="text-lg font-semibold">
                Symbol
              </label>
              <Switch id="symbol" onCheckedChange={toggleSymbol} />
            </div>
          </div>
          <CardFooter className="grid grid-cols-1 gap-y-2 p-0 mt-2">
            <Button className="text-base" onClick={handleGenerateClick}>
              Generate
            </Button>
            <Button
              className="text-base"
              onClick={() => {
                handleCopyClick();
                toast("Password copied to clipboard", {
                  duration: 2000,
                });
              }}
            >
              Copy
            </Button>
          </CardFooter>
        </CardContent>
      </Card>
      <Toaster
        toastOptions={{
          style: {
            boxShadow: "none",
            border: "1px solid #e4e4e7",
            fontFamily: "Inter semibold",
            fontSize: "16px",
          },
        }}
      />
    </div>
  );
}
