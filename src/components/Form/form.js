import React, { useState } from "react";
import { Box, TextField, Button, Typography } from '@mui/material';

const Form = () => {
    const [textInput, setTextInput] = useState('')
    const [sortedValue, setSortedValue] = useState([])
    const [maxAbsoluteDifference, setMaxAbsoluteDifference] = useState('')
    const [minuend, setMinuend] = useState('')
    const [subtrahend, setSubtrahend] = useState('')

    const handleTextInputChange = event => {
        const { value } = event.target
        setTextInput(value)

        const valueArr = value.split(',').map(val => val.replace(/\s+/g, '')).filter(Boolean)
        const validValues = valueArr.filter(val => val.match(/^(0|-*\d*\.?\d*)$/g))
        const sortedArr = validValues.sort((a, b) => { return a - b }).filter(v => +v >= -1000 && +v <= 1000);

        setSortedValue(sortedArr)
        if (maxAbsoluteDifference) {
            setMaxAbsoluteDifference('')
        }
    };

    const calculate = () => {
        let difference = 0
        if (sortedValue.length >= 2) {
            for (let i = 0; i < sortedValue.length; i++) {
                const diff = Math.abs(+sortedValue[i] - +sortedValue[i - 1])
                if (diff > difference) {
                    difference = diff
                    setMinuend(sortedValue[i])
                    setSubtrahend(sortedValue[i - 1])
                }
            }
        }
        setMaxAbsoluteDifference(difference.toString())
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Input integers from -1,000 to 1,000.
            </Typography>
            <Box component="form">
                <TextField id="outlined-basic" variant="outlined" onChange={handleTextInputChange} value={textInput} />
                <Typography variant="h6" gutterBottom>
                    Input {textInput}
                </Typography>
                {textInput &&
                    <Typography variant="h6" gutterBottom>
                        Sorted and Valid values : {sortedValue.length ? sortedValue.join('   ') : 'no valid values'}
                    </Typography>
                }
            </Box>
            <Button variant="contained" onClick={calculate}>Calculate</Button>
            {maxAbsoluteDifference && Boolean(sortedValue.length) &&
                <div>
                    {sortedValue.length >= 2 &&
                        <Typography variant="h6" gutterBottom>
                            {`| ${minuend} - ${subtrahend} |`}
                        </Typography>
                    }
                    <Typography variant="h6" gutterBottom>
                        Max Absolute Difference {maxAbsoluteDifference}
                    </Typography>
                </div>
            }
        </div>
    );
};

export default Form;