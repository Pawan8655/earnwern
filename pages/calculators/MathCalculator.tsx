import React, { useState } from 'react';
import CalculatorLayout from '../../components/CalculatorLayout';
import { getCalculatorContent } from '../../data/content';
import { Delete, Eraser, History } from 'lucide-react';

const MathCalculator = () => {
    const [expression, setExpression] = useState('');
    const [display, setDisplay] = useState('0');
    const [history, setHistory] = useState<string[]>([]);
    const [isAdvanced, setIsAdvanced] = useState(true);
    const [isRadians, setIsRadians] = useState(false); // Default Degrees

    const addToExpression = (val: string) => {
        if (display === 'Error' || display === 'Infinity') {
            setDisplay(val);
            setExpression(val);
            return;
        }

        // If display is 0 and val is a number, replace it
        if (display === '0' && !isNaN(Number(val)) && val !== '.') {
            setDisplay(val);
            setExpression(val);
        } else {
            setDisplay(prev => prev + val);
            setExpression(prev => prev + val);
        }
    };

    const clear = () => {
        setDisplay('0');
        setExpression('');
    };

    const backspace = () => {
        if (display.length === 1 || display === 'Error' || display === 'Infinity') {
            setDisplay('0');
            setExpression('');
        } else {
            setDisplay(prev => prev.slice(0, -1));
            setExpression(prev => prev.slice(0, -1));
        }
    };

    const calculate = () => {
        try {
            // Sanitize
            let safeExpr = expression
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/π/g, 'Math.PI')
                .replace(/e/g, 'Math.E')
                .replace(/√\(/g, 'Math.sqrt(')
                .replace(/\^/g, '**')
                .replace(/log\(/g, 'Math.log10(')
                .replace(/ln\(/g, 'Math.log(');

            // Handle Trigonometry
            // Replace sin(x) with Math.sin(x) or Math.sin(x * Math.PI / 180) based on mode
            const trigFunctions = ['sin', 'cos', 'tan'];
            trigFunctions.forEach(func => {
                const regex = new RegExp(`${func}\\(`, 'g');
                safeExpr = safeExpr.replace(regex, isRadians ? `Math.${func}(` : `Math.${func}((Math.PI/180)*`);
            });

            // This is a client-side calculator, so Function constructor is acceptable with basic sanitization
            // eslint-disable-next-line no-new-func
            const result = new Function(`return ${safeExpr}`)();

            let formattedResult = Number(result).toFixed(10).replace(/\.?0+$/, ''); // Remove trailing zeros
            if (formattedResult === 'NaN') formattedResult = 'Error';

            setHistory(prev => [`${expression} = ${formattedResult}`, ...prev.slice(0, 9)]);
            setDisplay(formattedResult);
            setExpression(String(result));
        } catch (e) {
            setDisplay('Error');
            setExpression('');
        }
    };

    const addFunction = (func: string) => {
        const funcMap: Record<string, string> = {
            'sin': 'sin(',
            'cos': 'cos(',
            'tan': 'tan(',
            'log': 'log(',
            'ln': 'ln(',
            'sqrt': '√(',
            'pow': '^',
            'pi': 'π',
            'e': 'e'
        };

        const val = funcMap[func] || func;
        if (display === '0') {
            setDisplay(val);
            setExpression(val);
        } else {
            setDisplay(prev => prev + val);
            setExpression(prev => prev + val);
        }
    };

    return (
        <CalculatorLayout
            title="Scientific Math Calculator"
            description="Perform basic arithmetic and advanced scientific calculations online."
            seoContent={getCalculatorContent('math-calculator')}
        >
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6">
                {/* Calculator Body */}
                <div className="bg-slate-900 p-4 rounded-3xl shadow-2xl w-full md:w-2/3 border border-slate-700">
                    {/* Screen */}
                    <div className="bg-slate-800 rounded-xl p-4 mb-4 text-right relative min-h-[80px] flex flex-col justify-end">
                        <div className="text-slate-400 text-xs mb-0.5 h-5 overflow-hidden">{history[0]?.split('=')[0]}</div>
                        <div className="text-white text-3xl font-mono tracking-wider overflow-x-auto scrollbar-hide">{display}</div>

                        {/* Mode Indicators */}
                        <div className="absolute top-2 left-3 flex gap-2">
                            <button
                                onClick={() => setIsRadians(!isRadians)}
                                className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-700 text-slate-300 hover:text-white"
                            >
                                {isRadians ? 'RAD' : 'DEG'}
                            </button>
                            <button
                                onClick={() => setIsAdvanced(!isAdvanced)}
                                className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-600 text-white md:hidden"
                            >
                                {isAdvanced ? 'BASIC' : 'SCI'}
                            </button>
                        </div>
                    </div>

                    {/* Keypad */}
                    <div className="grid gap-3">
                        {isAdvanced && (
                            <div className="grid grid-cols-5 gap-2 mb-2">
                                <CalcButton secondary onClick={() => addFunction('sin')}>sin</CalcButton>
                                <CalcButton secondary onClick={() => addFunction('cos')}>cos</CalcButton>
                                <CalcButton secondary onClick={() => addFunction('tan')}>tan</CalcButton>
                                <CalcButton secondary onClick={() => addFunction('log')}>log</CalcButton>
                                <CalcButton secondary onClick={() => addFunction('ln')}>ln</CalcButton>

                                <CalcButton secondary onClick={() => addFunction('sqrt')}>√</CalcButton>
                                <CalcButton secondary onClick={() => addFunction('pow')}>^</CalcButton>
                                <CalcButton secondary onClick={() => addFunction('pi')}>π</CalcButton>
                                <CalcButton secondary onClick={() => addFunction('e')}>e</CalcButton>
                                <CalcButton secondary onClick={() => addToExpression('(')}>(</CalcButton>
                                <CalcButton secondary onClick={() => addToExpression(')')}>)</CalcButton>
                            </div>
                        )}

                        <div className="grid grid-cols-4 gap-2">
                            <CalcButton action onClick={clear}>AC</CalcButton>
                            <CalcButton action onClick={backspace}><Delete size={20} /></CalcButton>
                            <CalcButton action onClick={() => addToExpression('%')}>%</CalcButton>
                            <CalcButton operator onClick={() => addToExpression('÷')}>÷</CalcButton>

                            <CalcButton onClick={() => addToExpression('7')}>7</CalcButton>
                            <CalcButton onClick={() => addToExpression('8')}>8</CalcButton>
                            <CalcButton onClick={() => addToExpression('9')}>9</CalcButton>
                            <CalcButton operator onClick={() => addToExpression('×')}>×</CalcButton>

                            <CalcButton onClick={() => addToExpression('4')}>4</CalcButton>
                            <CalcButton onClick={() => addToExpression('5')}>5</CalcButton>
                            <CalcButton onClick={() => addToExpression('6')}>6</CalcButton>
                            <CalcButton operator onClick={() => addToExpression('-')}>-</CalcButton>

                            <CalcButton onClick={() => addToExpression('1')}>1</CalcButton>
                            <CalcButton onClick={() => addToExpression('2')}>2</CalcButton>
                            <CalcButton onClick={() => addToExpression('3')}>3</CalcButton>
                            <CalcButton operator onClick={() => addToExpression('+')}>+</CalcButton>

                            <CalcButton onClick={() => addToExpression('0')} className="col-span-2">0</CalcButton>
                            <CalcButton onClick={() => addToExpression('.')}>.</CalcButton>
                            <CalcButton operator onClick={calculate} className="bg-blue-600 hover:bg-blue-500 text-white">=</CalcButton>
                        </div>
                    </div>
                </div>

                {/* History Panel */}
                <div className="w-full md:w-1/3 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-[300px] md:h-auto">
                    <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
                        <h3 className="font-bold text-slate-700 flex items-center gap-2"><History size={18} /> History</h3>
                        <button onClick={() => setHistory([])} className="text-slate-400 hover:text-red-500 transition-colors">
                            <Eraser size={18} />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2">
                        {history.length === 0 ? (
                            <p className="text-slate-400 text-sm text-center mt-10">No calculations yet</p>
                        ) : (
                            history.map((item, idx) => {
                                const [expr, res] = item.split(' = ');
                                return (
                                    <div key={idx} className="bg-slate-50 p-3 rounded-lg text-right hover:bg-blue-50 transition-colors cursor-pointer" onClick={() => { setDisplay(res); setExpression(res); }}>
                                        <div className="text-xs text-slate-500">{expr} =</div>
                                        <div className="font-bold text-slate-800 text-lg">{res}</div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </CalculatorLayout>
    );
};

const CalcButton = ({ children, onClick, className = '', operator = false, action = false, secondary = false }: any) => {
    let baseStyle = "h-11 rounded-xl font-bold text-lg transition-all active:scale-95 flex items-center justify-center shadow-[0_3px_0_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-1";

    if (operator) baseStyle += " bg-amber-500 hover:bg-amber-400 text-white shadow-amber-700";
    else if (action) baseStyle += " bg-slate-600 hover:bg-slate-500 text-white shadow-slate-800";
    else if (secondary) baseStyle = "h-10 rounded-lg font-bold text-sm bg-slate-700 hover:bg-slate-600 text-slate-200 shadow-[0_2px_0_0_rgba(0,0,0,0.3)] active:shadow-none active:translate-y-0.5";
    else baseStyle += " bg-slate-200 hover:bg-white text-slate-800 shadow-slate-300";

    return (
        <button onClick={onClick} className={`${baseStyle} ${className}`}>
            {children}
        </button>
    );
};

export default MathCalculator;